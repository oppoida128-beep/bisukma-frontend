'use server';
/**
 * @fileOverview Flow untuk mengambil berita nyata dari Google News RSS dan memprosesnya dengan AI.
 * Menggunakan Next.js unstable_cache untuk penyimpanan data selama 24 jam agar performa loading maksimal.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { unstable_cache, revalidateTag } from 'next/cache';

const NewsItemSchema = z.object({
  title: z.string().describe('Judul berita asli dari media'),
  source: z.string().describe('Nama media sumber (misal: Kompas, Detik, Antara)'),
  url: z.string().describe('URL asli berita'),
  date: z.string().describe('Tanggal terbit berita'),
  summary: z.string().describe('Ringkasan berita dalam Bahasa Indonesia yang profesional'),
  category: z.string().describe('Kategori (Pendidikan, Pertanian, Gizi, Sosial, Ekonomi)'),
  thumbnailUrl: z.string().describe('URL gambar pratinjau. Prioritaskan mengekstrak URL gambar asli dari data RSS jika ada. Jika tidak ada, berikan URL Unsplash yang SANGAT spesifik dan relevan dengan judul berita.'),
});

const ExternalNewsOutputSchema = z.object({
  news: z.array(NewsItemSchema),
});

export type ExternalNewsOutput = z.infer<typeof ExternalNewsOutputSchema>;

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

  INSTRUKSI UNTUK GAMBAR (thumbnailUrl):
  1. Periksa apakah ada tag <media:content> atau <img> di dalam deskripsi item RSS. Jika ada URL gambar yang valid dan berakhir dengan .jpg, .png, atau .webp, gunakan itu.
  2. Jika tidak ditemukan gambar asli, berikan URL Unsplash menggunakan format: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=800&q=80
  3. Pastikan gambar Unsplash yang Anda pilih secara visual SANGAT AKURAT menggambarkan isi berita. Misal: jika berita tentang pembagian ATK sekolah, cari foto "school supplies"; jika tentang dapur gizi, cari "clean industrial kitchen".
  4. Jangan gunakan gambar placeholder generic jika memungkinkan.`,
});

const externalNewsFlow = ai.defineFlow(
  {
    name: 'externalNewsFlow',
    inputSchema: z.object({}),
    outputSchema: ExternalNewsOutputSchema,
  },
  async () => {
    try {
      // Fetch data nyata dari Google News RSS dengan cache harian
      const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
      
      const response = await fetch(rssUrl, { next: { revalidate: 86400 } }); 
      const xmlData = await response.text();

      const { output } = await prompt({ rssData: xmlData });
      return output!;
    } catch (error) {
      console.error("RSS Fetch Error:", error);
      // Fallback ke prompt kosong jika fetch gagal agar AI tetap bisa memberikan data dari pengetahuannya
      const { output } = await prompt({ rssData: "No RSS data available" });
      return output!;
    }
  }
);

/**
 * Fungsi pembungkus dengan cache harian (86400 detik).
 * Menjalankan pengambilan berita dan AI hanya sekali sehari untuk menghemat token dan performa.
 */
export const fetchExternalNews = unstable_cache(
  async (): Promise<ExternalNewsOutput> => {
    return externalNewsFlow({});
  },
  ['bisukma-external-news-daily'],
  { 
    revalidate: 86400, // 24 Jam
    tags: ['external-news']
  }
);

/**
 * Server Action untuk membersihkan cache berita eksternal secara manual.
 */
export async function revalidateExternalNews() {
  revalidateTag('external-news');
}
