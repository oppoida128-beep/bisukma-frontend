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
 * Menggunakan /external-news.svg sebagai fallback jika terdeteksi tidak valid.
 */
function getPublisherLogo(url: string): string {
  try {
    if (!url) return "/external-news.svg";
    
    const hostname = new URL(url).hostname;
    // Hapus 'www.' jika ada untuk konsistensi domain
    const domain = hostname.startsWith("www.") 
      ? hostname.substring(4) 
      : hostname;
    
    // Jika domain tidak valid atau localhost, gunakan fallback lokal
    if (!domain || domain.includes('localhost')) {
      return "/external-news.svg";
    }
    
    // Menggunakan Google Favicon API dengan ukuran 128px untuk kualitas HD
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    // Fallback terakhir jika parsing URL gagal
    return "/external-news.svg";
  }
}

/**
 * Resolve Google News redirect URL to the final destination URL.
 * Menggunakan metode GET untuk memastikan kita mendapatkan URL asli sebelum pengolahan domain.
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
 * Pengambil berita eksternal versi ultra-cepat (Logo HD & Fallback System).
 * Estima performa: ~500ms (uncached), ~10ms (cached).
 */
async function fetchNews(): Promise<ExternalNewsOutput> {
  try {
    console.log("🚀 Memulai pengambilan berita eksternal (Pipeline v25 - Fallback Logo)...");
    
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
    
    // Batasi ke 6 item teratas untuk performa optimal
    const targetItems = items.slice(0, 6);

    const news = await Promise.all(targetItems.map(async (item: any) => {
      // 1. Dapatkan URL asli portal berita (Resolve Redirect)
      const realUrl = await resolveFinalUrl(item.link);
      
      // 2. Gunakan Logo Publisher HD sebagai thumbnail
      const thumbnailUrl = getPublisherLogo(realUrl);

      // 3. Bersihkan deskripsi dari boilerplate Google News
      let finalSummary = (item.description || "")
        ?.replace(/<[^>]*>?/gm, '') // Hapus tag HTML
        ?.replace(/&nbsp;/g, ' ')
        ?.trim() || "";

      // Deteksi dan ganti boilerplate Google News yang tidak informatif
      if (finalSummary.includes("Comprehensive up-to-date news coverage") || finalSummary.length < 10) {
        const mediaSource = item.source?.["#text"] || item.source || "media nasional";
        finalSummary = `Ikuti laporan terbaru mengenai aktivitas Bisukma Group melalui portal ${mediaSource}. Klik tautan di bawah untuk melihat artikel lengkapnya.`;
      } else {
        finalSummary = finalSummary.slice(0, 160) + (finalSummary.length > 160 ? "..." : "");
      }

      // 4. Inferensi kategori sederhana berdasarkan kata kunci
      let category = "Nasional";
      const titleLower = (item.title || "").toLowerCase();
      if (titleLower.includes("gizi") || titleLower.includes("makan") || titleLower.includes("sppg")) category = "Gizi";
      else if (titleLower.includes("pendidikan") || titleLower.includes("siswa") || titleLower.includes("atk") || titleLower.includes("vokasi")) category = "Pendidikan";
      else if (titleLower.includes("ekonomi") || titleLower.includes("pertanian") || titleLower.includes("bisnis") || titleLower.includes("petani")) category = "Ekonomi";

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

    console.log(`✅ Pipeline v25 selesai. Berhasil memproses ${news.length} berita dengan sistem fallback.`);
    return { news };
  } catch (error) {
    console.error("❌ Error fetching external news:", error);
    return { news: [] };
  }
}

export const fetchExternalNews = unstable_cache(
  fetchNews,
  ['bisukma-external-news-v25'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

export async function triggerRefreshNews() {
  console.log("♻️ Merevalidasi cache berita eksternal (v25)...");
  revalidateTag('external-news');
}