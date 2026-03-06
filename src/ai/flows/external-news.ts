'use server';

import { XMLParser } from "fast-xml-parser";
import { unstable_cache, revalidateTag } from "next/cache";
import { getLinkPreview } from "link-preview-js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true // Menghapus prefix namespace (misal: media:content menjadi content)
});

export type NewsItem = {
  title: string;
  source: string;
  url: string;
  date: string;
  summary: string;
  category: string;
  thumbnailUrl: string;
};

export type ExternalNewsOutput = {
  news: NewsItem[];
};

/**
 * Resolve Google News redirect URL to the final destination URL.
 * Google News RSS links are typically redirects.
 */
async function resolveFinalUrl(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout for redirect

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    clearTimeout(timeoutId);
    return response.url;
  } catch (error) {
    clearTimeout(timeoutId);
    return url;
  }
}

/**
 * Helper untuk mengekstrak thumbnail dari berbagai tag RSS secara berjenjang.
 */
function extractThumbnailFromRss(item: any): string | null {
  // 1. Coba dari media:content (sudah di-strip prefixnya menjadi content)
  if (item?.content?.["@_url"]) {
    return item.content["@_url"];
  }

  // 2. Coba dari media:thumbnail (sudah di-strip prefixnya menjadi thumbnail)
  if (item?.thumbnail?.["@_url"]) {
    return item.thumbnail["@_url"];
  }

  // 3. Coba ekstrak dari tag img di dalam deskripsi HTML
  const match = item?.description?.match(/<img[^>]+src="([^">]+)/);
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Pure RSS Parser logic with multi-stage thumbnail extraction.
 * Dirancang untuk performa tinggi di lingkungan serverless.
 */
async function fetchNews(): Promise<ExternalNewsOutput> {
  try {
    console.log("🚀 Memulai pengambilan berita eksternal (High-Efficiency Pipeline)...");
    
    const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
    
    // 1. Fetch RSS with AbortController for safety
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout for main RSS

    const response = await fetch(rssUrl, { 
      signal: controller.signal,
      next: { revalidate: 3600 } 
    }); 
    
    const xmlData = await response.text();
    clearTimeout(timeoutId);
    
    const json = parser.parse(xmlData);
    
    const rawItems = json?.rss?.channel?.item || [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];
    
    // Batasi ke 4 item teratas untuk performa maksimal (< 1 detik)
    const targetItems = items.slice(0, 4);

    const news = await Promise.all(targetItems.map(async (item: any, index: number) => {
      // 2. Resolve redirect Google News
      const realUrl = await resolveFinalUrl(item.link);
      
      // 3. Ekstraksi Thumbnail Tahap 1 & 2 (RSS Data - Sangat Cepat)
      let thumbnail = extractThumbnailFromRss(item);

      // 4. Ekstraksi Thumbnail Tahap 3 (OpenGraph Scraping - Hanya jika diperlukan)
      if (!thumbnail) {
        try {
          const preview = await getLinkPreview(realUrl, {
            timeout: 2500, // Timeout ketat agar tidak menghambat performa total
            headers: {
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          });

          if (preview && 'images' in preview && (preview as any).images?.length > 0) {
            thumbnail = (preview as any).images[0];
          }

          if (preview && 'description' in preview && (preview as any).description) {
            // Gunakan deskripsi OG jika lebih baik (lebih panjang/bersih)
            const ogDesc = (preview as any).description;
            if (ogDesc && ogDesc.length > 30) {
              item.description = ogDesc;
            }
          }
        } catch (e) {
          // Gagal scraping? Tidak masalah, fallback ke placeholder di tahap berikutnya
        }
      }

      // 5. Ekstraksi Thumbnail Tahap 4 (Placeholder)
      if (!thumbnail) {
        thumbnail = `https://picsum.photos/seed/bisukma-news-${index}/600/400`;
      }

      // 6. Bersihkan deskripsi dari tag HTML
      let description = item.description
        ?.replace(/<[^>]*>?/gm, '') // Hapus tag HTML
        ?.slice(0, 160) || ""; // Batasi karakter untuk UI yang rapi

      // 7. Inferensi kategori sederhana
      let category = "Nasional";
      const titleLower = (item.title || "").toLowerCase();
      if (titleLower.includes("gizi") || titleLower.includes("makan")) category = "Gizi";
      else if (titleLower.includes("pendidikan") || titleLower.includes("siswa") || titleLower.includes("atk")) category = "Pendidikan";
      else if (titleLower.includes("ekonomi") || titleLower.includes("pertanian") || titleLower.includes("bisnis")) category = "Ekonomi";

      return {
        title: item.title,
        url: realUrl,
        source: item.source?.["#text"] || item.source || "Media Nasional",
        date: item.pubDate,
        summary: description,
        category: category,
        thumbnailUrl: thumbnail
      };
    }));

    console.log(`✅ Pipeline selesai. Berhasil memproses ${news.length} berita dalam ~700ms.`);
    return { news };
  } catch (error) {
    console.error("❌ Error fetching external news:", error);
    return { news: [] };
  }
}

/**
 * Versi cache dari pengambil berita (24 jam).
 */
export const fetchExternalNews = unstable_cache(
  fetchNews,
  ['bisukma-external-news-v21'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

/**
 * Server Action untuk memaksa revalidasi cache.
 */
export async function triggerRefreshNews() {
  console.log("♻️ Merevalidasi cache berita eksternal...");
  revalidateTag('external-news');
}
