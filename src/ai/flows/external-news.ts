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
    console.log("🚀 Memulai pengambilan berita eksternal (Metadata-Enriched Pipeline)...");
    
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
    
    // Batasi ke 6 item teratas
    const targetItems = items.slice(0, 6);

    const news = await Promise.all(targetItems.map(async (item: any, index: number) => {
      // 2. Resolve redirect Google News
      const realUrl = await resolveFinalUrl(item.link);
      
      // 3. Ekstraksi Thumbnail Tahap 1 & 2 (RSS Data)
      let thumbnail = extractThumbnailFromRss(item);
      let rawDescription = item.description || "";

      // Deteksi jika deskripsi adalah boilerplate Google News yang tidak berguna
      const isGeneric = rawDescription.includes("Comprehensive up-to-date news coverage");

      // 4. Ekstraksi Metadata via Link Preview (Penting untuk deskripsi asli)
      try {
        const preview = await getLinkPreview(realUrl, {
          timeout: 3000, // Timeout ketat agar tidak menghambat performa total
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        if (preview && 'images' in preview && (preview as any).images?.length > 0 && !thumbnail) {
          thumbnail = (preview as any).images[0];
        }

        if (preview && 'description' in preview && (preview as any).description) {
          const ogDesc = (preview as any).description;
          // Gunakan deskripsi OG jika deskripsi RSS generic atau OG lebih deskriptif
          if (isGeneric || (ogDesc && ogDesc.length > rawDescription.replace(/<[^>]*>?/gm, '').length)) {
            rawDescription = ogDesc;
          }
        }
      } catch (e) {
        // Gagal scraping? Tidak masalah, fallback ke data RSS yang sudah ada
      }

      // 5. Fallback Thumbnail (Placeholder)
      if (!thumbnail) {
        thumbnail = `https://picsum.photos/seed/bisukma-news-${index}/600/400`;
      }

      // 6. Bersihkan deskripsi akhir dari tag HTML dan karakter aneh
      let finalSummary = rawDescription
        ?.replace(/<[^>]*>?/gm, '') // Hapus tag HTML
        ?.replace(/&nbsp;/g, ' ')
        ?.trim() || "";

      // Jika masih generic atau kosong setelah dibersihkan, berikan pesan default yang informatif
      if (finalSummary.includes("Comprehensive up-to-date news coverage") || finalSummary.length < 10) {
        const mediaSource = item.source?.["#text"] || item.source || "media nasional";
        finalSummary = `Baca laporan lengkap mengenai aktivitas Bisukma Group melalui portal ${mediaSource}. Klik tautan di bawah untuk melihat sumber asli artikel.`;
      } else {
        // Batasi karakter untuk UI yang rapi
        finalSummary = finalSummary.slice(0, 160) + (finalSummary.length > 160 ? "..." : "");
      }

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
        summary: finalSummary,
        category: category,
        thumbnailUrl: thumbnail
      };
    }));

    console.log(`✅ Pipeline selesai. Berhasil memproses ${news.length} berita.`);
    return { news };
  } catch (error) {
    console.error("❌ Error fetching external news:", error);
    return { news: [] };
  }
}

/**
 * Versi cache dari pengambil berita (24 jam).
 * Versi ditingkatkan (v22) untuk memicu pembersihan data boilerplate lama.
 */
export const fetchExternalNews = unstable_cache(
  fetchNews,
  ['bisukma-external-news-v22'],
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
