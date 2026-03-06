
'use server';

import { XMLParser } from "fast-xml-parser";
import { unstable_cache, revalidateTag } from "next/cache";
import { getLinkPreview } from "link-preview-js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
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
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    // We use a real User-Agent to avoid being blocked during resolution
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
    // If resolution fails, return original URL as fallback
    return url;
  }
}

/**
 * Pure RSS Parser logic without AI dependency.
 * Faster (~1s vs ~40s) and more stable for production.
 */
async function fetchNews(): Promise<ExternalNewsOutput> {
  try {
    console.log("🚀 Memulai pengambilan berita (Pure RSS Parser)...");
    
    const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
    
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); 
    const xmlData = await response.text();
    const json = parser.parse(xmlData);
    
    const rawItems = json?.rss?.channel?.item || [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];
    
    // Limit to top 6 items for performance balance
    const targetItems = items.slice(0, 6);

    const news = await Promise.all(targetItems.map(async (item: any, index: number) => {
      // 1. Resolve redirect from Google News to actual source URL
      const realUrl = await resolveFinalUrl(item.link);
      
      let thumbnail = `https://picsum.photos/seed/bisukma-news-${index}/600/400`;
      let description = item.description || "";

      try {
        // 2. Fetch OpenGraph metadata from the actual source
        const preview = await getLinkPreview(realUrl, {
          timeout: 6000,
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        if (preview && 'images' in preview && (preview as any).images?.length > 0) {
          thumbnail = (preview as any).images[0];
        }

        if (preview && 'description' in preview && (preview as any).description) {
          description = (preview as any).description;
        }
      } catch (e) {
        // Fallback description from RSS (cleaning HTML tags)
        description = item.description?.replace(/<[^>]*>?/gm, '') || "";
      }

      // 3. Simple category inference based on keywords
      let category = "Nasional";
      const titleLower = item.title.toLowerCase();
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

    console.log(`✅ Berhasil memproses ${news.length} berita.`);
    return { news };
  } catch (error) {
    console.error("❌ Error fetching external news:", error);
    return { news: [] };
  }
}

/**
 * Cached version of the news fetcher (24 hours).
 */
export const fetchExternalNews = unstable_cache(
  fetchNews,
  ['bisukma-external-news-v16'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

/**
 * Server Action to force revalidation.
 */
export async function triggerRefreshNews() {
  console.log("♻️ Merevalidasi cache berita eksternal...");
  revalidateTag('external-news');
}
