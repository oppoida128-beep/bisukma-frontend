'use server';
/**
 * @fileOverview Flow untuk mengambil berita nyata dari Google News RSS dan memperkayanya dengan metadata asli menggunakan link-preview-js.
 * - Menggunakan resolusi redirect untuk mendapatkan URL asli dari Google News.
 * - Menggunakan User-Agent untuk menghindari pemblokiran bot oleh portal berita.
 * - Menggunakan caching 24 jam untuk performa maksimal.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { unstable_cache, revalidateTag } from 'next/cache';
import { getLinkPreview } from 'link-preview-js';

const NewsItemSchema = z.object({
  title: z.string().describe('Judul berita asli dari media'),
  source: z.string().describe('Nama media sumber'),
  url: z.string().describe('URL asli berita (bisa berupa redirect Google News)'),
  date: z.string().describe('Tanggal terbit berita'),
  summary: z.string().describe('Ringkasan berita dalam Bahasa Indonesia yang profesional'),
  category: z.string().describe('Kategori (Pendidikan, Pertanian, Gizi, Sosial, Ekonomi)'),
  thumbnailUrl: z.string().describe('URL gambar pratinjau default atau fallback.'),
});

const ExternalNewsOutputSchema = z.object({
  news: z.array(NewsItemSchema),
});

export type ExternalNewsOutput = z.infer<typeof ExternalNewsOutputSchema>;

/**
 * Fungsi untuk mengikuti redirect URL Google News guna mendapatkan URL asli portal berita.
 */
async function resolveFinalUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    return response.url;
  } catch (error) {
    console.warn(`Gagal resolve URL: ${url}`);
    return url;
  }
}

const prompt = ai.definePrompt({
  name: 'externalNewsPrompt',
  input: { 
    schema: z.object({ 
      rssData: z.string().describe('Data mentah XML dari Google News RSS') 
    }) 
  },
  output: { schema: ExternalNewsOutputSchema },
  prompt: `Anda adalah asisten riset berita untuk Bisukma Digital.
  
  Tugas Anda adalah menganalisis data RSS Google News berikut dan mengekstrak 6 berita TERBARU dan PALING RELEVAN yang berkaitan dengan:
  - Bisukma Group
  - Bisukma Bangun Bangsa
  - Yayasan Bisukma
  - Erickson Sianipar (dalam konteks Bisukma)

  Data RSS:
  {{{rssData}}}

  Untuk thumbnailUrl, berikan URL Unsplash yang SANGAT spesifik sebagai cadangan jika sistem gagal mengambil pratinjau asli.
  Contoh: jika tentang gizi, berikan https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80`,
});

const externalNewsFlow = ai.defineFlow(
  {
    name: 'externalNewsFlow',
    inputSchema: z.object({}),
    outputSchema: ExternalNewsOutputSchema,
  },
  async () => {
    try {
      const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
      
      const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); 
      const xmlData = await response.text();

      const { output } = await prompt({ rssData: xmlData });
      
      if (!output || !output.news) return { news: [] };

      // Memperkaya berita dengan thumbnail asli secara paralel dengan limitasi redirect
      const enrichedNews = await Promise.all(output.news.map(async (item) => {
        try {
          // 1. Resolve redirect dari Google News ke URL asli portal berita
          const finalUrl = await resolveFinalUrl(item.url);

          // 2. Ambil metadata dari URL asli dengan User-Agent untuk hindari blokir
          const preview = await getLinkPreview(finalUrl, {
            followRedirects: true,
            handleRedirectsAsync: true,
            timeout: 8000,
            headers: {
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          });

          const metadataImage = preview && 'images' in preview && preview.images.length > 0 
            ? preview.images[0] 
            : item.thumbnailUrl;

          return {
            ...item,
            url: finalUrl, // Gunakan URL asli yang sudah di-resolve
            thumbnailUrl: metadataImage,
            summary: item.summary || (preview as any).description || item.summary
          };
        } catch (previewError) {
          console.warn(`Gagal mengambil pratinjau untuk: ${item.url}`);
        }
        return item;
      }));

      return { news: enrichedNews };
    } catch (error) {
      console.error("News Flow Error:", error);
      return { news: [] };
    }
  }
);

/**
 * Fungsi pembungkus dengan cache harian (86400 detik).
 */
export const fetchExternalNews = unstable_cache(
  async (): Promise<ExternalNewsOutput> => {
    return externalNewsFlow({});
  },
  ['bisukma-external-news-v3'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

/**
 * Server Action untuk memaksa penyegaran data dengan menghapus cache.
 */
export async function triggerRefreshNews() {
  revalidateTag('external-news');
}
