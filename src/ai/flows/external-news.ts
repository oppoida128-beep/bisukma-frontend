'use server';
/**
 * @fileOverview Flow untuk mengambil berita nyata dari Google News RSS dan memprosesnya dengan AI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsItemSchema = z.object({
  title: z.string().describe('Judul berita asli dari media'),
  source: z.string().describe('Nama media sumber (misal: Kompas, Detik, Antara)'),
  url: z.string().describe('URL asli berita'),
  date: z.string().describe('Tanggal terbit berita'),
  summary: z.string().describe('Ringkasan berita dalam Bahasa Indonesia yang profesional'),
  category: z.string().describe('Kategori (Pendidikan, Pertanian, Gizi, Sosial, Ekonomi)'),
  thumbnailUrl: z.string().describe('URL gambar pratinjau yang paling relevan. Gunakan URL dari metadata jika tersedia, atau URL Unsplash yang SANGAT spesifik mewakili topik berita tersebut.'),
});

const ExternalNewsOutputSchema = z.object({
  news: z.array(NewsItemSchema),
});

export type ExternalNewsOutput = z.infer<typeof ExternalNewsOutputSchema>;

export async function fetchExternalNews(): Promise<ExternalNewsOutput> {
  return externalNewsFlow({});
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

  INSTRUKSI:
  1. Ekstrak Judul, URL, dan Sumber media asli.
  2. Buat ringkasan yang informatif dalam Bahasa Indonesia.
  3. Tentukan kategori yang paling tepat.
  4. Untuk 'thumbnailUrl', jika dalam data RSS tidak ada URL gambar yang jelas, berikan URL Unsplash (https://images.unsplash.com/photo-...) yang secara visual SANGAT AKURAT menggambarkan isi berita tersebut (misal: jika tentang pertanian, cari foto sawah modern; jika tentang gizi, cari foto makanan sehat).
  5. Jika data RSS kosong atau tidak relevan, Anda boleh menggunakan pengetahuan internal Anda untuk memberikan berita nyata terbaru (2024-2025) yang Anda ketahui tentang Bisukma sebagai fallback.`,
});

const externalNewsFlow = ai.defineFlow(
  {
    name: 'externalNewsFlow',
    inputSchema: z.object({}),
    outputSchema: ExternalNewsOutputSchema,
  },
  async () => {
    try {
      // Fetch data nyata dari Google News RSS
      const query = encodeURIComponent('Bisukma Group OR "Bisukma Bangun Bangsa" OR "Yayasan Bisukma" OR "Erickson Sianipar Bisukma"');
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=id-ID&gl=ID&ceid=ID:id`;
      
      const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); // Cache selama 1 jam
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
