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
 * Dioptimalkan dengan timeout dan metode HEAD untuk kecepatan.
 */
async function resolveFinalUrl(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 detik max per URL

  try {
    // Coba HEAD dahulu untuk efisiensi
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    clearTimeout(timeoutId);
    return response.url;
  } catch (error) {
    // Fallback ke GET jika HEAD gagal atau tidak didukung
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
      });
      clearTimeout(timeoutId);
      return response.url;
    } catch (e) {
      clearTimeout(timeoutId);
      console.warn(`⚠️ Gagal resolve URL: ${url}`);
      return url;
    }
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

  PENTING: Pastikan kategori yang dipilih sesuai dengan isi berita.
  Untuk thumbnailUrl, berikan URL Unsplash yang SANGAT spesifik sebagai cadangan.`,
});

const externalNewsFlow = ai.defineFlow(
  {
    name: 'externalNewsFlow',
    inputSchema: z.object({}),
    outputSchema: ExternalNewsOutputSchema,
  },
  async () => {
    try {
      console.log("🚀 Memulai pengambilan berita eksternal...");
      
      const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
      
      const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); 
      const xmlData = await response.text();

      console.log("✅ Data RSS berhasil diambil, mengirim ke AI untuk ekstraksi...");

      const { output } = await prompt({ rssData: xmlData });
      
      if (!output || !output.news || output.news.length === 0) {
        console.log("⚠️ AI tidak menemukan berita yang relevan.");
        return { news: [] };
      }

      console.log("🔍 Berita yang berhasil diekstrak oleh AI:");
      output.news.forEach((n) => console.log(`- ${n.title}`));

      // Memperkaya berita dengan thumbnail asli secara paralel
      console.log("🖼️ Memulai pengayaan metadata (thumbnail asli)...");
      const enrichedNews = await Promise.all(output.news.map(async (item) => {
        try {
          // 1. Resolve redirect dari Google News ke URL asli portal berita
          const finalUrl = await resolveFinalUrl(item.url);
          
          // 2. Ambil metadata dari URL asli
          const preview = await getLinkPreview(finalUrl, {
            followRedirects: true,
            handleRedirectsAsync: true,
            timeout: 7000,
            headers: {
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          });

          const metadataImage = (preview && 'images' in preview && (preview as any).images?.length > 0)
            ? (preview as any).images[0] 
            : item.thumbnailUrl;

          return {
            ...item,
            url: finalUrl,
            thumbnailUrl: metadataImage,
            summary: item.summary || (preview && 'description' in preview ? (preview as any).description : item.summary)
          };
        } catch (previewError) {
          console.warn(`⚠️ Gagal mengambil pratinjau untuk: ${item.url}`);
          return item;
        }
      }));

      console.log("🎉 Pengayaan selesai. Mengirim berita ke frontend.");
      return { news: enrichedNews };
    } catch (error) {
      console.error("❌ News Flow Error:", error);
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
  ['bisukma-external-news-v7'],
  { 
    revalidate: 86400, 
    tags: ['external-news']
  }
);

/**
 * Server Action untuk memaksa penyegaran data dengan menghapus cache.
 */
export async function triggerRefreshNews() {
  console.log("♻️ Memaksa revalidasi cache berita eksternal...");
  revalidateTag('external-news');
}
