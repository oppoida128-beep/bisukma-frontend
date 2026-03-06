'use server';

import { XMLParser } from "fast-xml-parser";
import { unstable_cache, revalidateTag } from "next/cache";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true
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
 * Mendapatkan Logo Publisher (Favicon HD) dari domain berita.
 */
function getPublisherLogo(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    // Menggunakan Google Favicon API dengan ukuran 128px untuk kualitas terbaik
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return "https://www.google.com/s2/favicons?domain=news.google.com&sz=128";
  }
}

/**
 * Resolve Google News redirect URL to the final destination URL.
 */
async function resolveFinalUrl(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

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
 * Pengambil berita eksternal versi ultra-cepat tanpa scraping berat.
 */
async function fetchNews(): Promise<ExternalNewsOutput> {
  try {
    console.log("🚀 Memulai pengambilan berita eksternal (Publisher-Logo Pipeline)...");
    
    const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

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

    const news = await Promise.all(targetItems.map(async (item: any) => {
      // 1. Dapatkan URL asli portal berita
      const realUrl = await resolveFinalUrl(item.link);
      
      // 2. Gunakan Logo Publisher sebagai thumbnail (Sangat Cepat & Stabil)
      const thumbnailUrl = getPublisherLogo(realUrl);

      // 3. Bersihkan deskripsi dari boilerplate Google News
      let finalSummary = (item.description || "")
        ?.replace(/<[^>]*>?/gm, '') // Hapus tag HTML
        ?.replace(/&nbsp;/g, ' ')
        ?.trim() || "";

      if (finalSummary.includes("Comprehensive up-to-date news coverage") || finalSummary.length < 10) {
        const mediaSource = item.source?.["#text"] || item.source || "media nasional";
        finalSummary = `Ikuti laporan terbaru mengenai aktivitas Bisukma Group melalui portal ${mediaSource}. Klik tautan di bawah untuk melihat artikel lengkapnya.`;
      } else {
        finalSummary = finalSummary.slice(0, 160) + (finalSummary.length > 160 ? "..." : "");
      }

      // 4. Inferensi kategori sederhana
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
        thumbnailUrl: thumbnailUrl
      };
    }));

    console.log(`✅ Pipeline selesai. Berhasil memproses ${news.length} berita publisher.`);
    return { news };
  } catch (error) {
    console.error("❌ Error fetching external news:", error);
    return { news: [] };
  }
}

export const fetchExternalNews = unstable_cache(
  fetchNews,
  ['bisukma-external-news-v23'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

export async function triggerRefreshNews() {
  console.log("♻️ Merevalidasi cache berita eksternal...");
  revalidateTag('external-news');
}
