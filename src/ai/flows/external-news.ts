'use server';
/**
 * @fileOverview Flow untuk mengambil dan merangkum berita eksternal khusus Bisukma.
 * 
 * - fetchExternalNews: Fungsi untuk mendapatkan berita terkini mengenai Bisukma dari sumber luar.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsItemSchema = z.object({
  title: z.string().describe('Judul berita'),
  source: z.string().describe('Sumber berita (misal: Antara News, Detik, Kompas, atau media lokal)'),
  url: z.string().describe('URL asli berita'),
  date: z.string().describe('Tanggal terbit berita'),
  summary: z.string().describe('Ringkasan singkat berita dalam 1-2 kalimat'),
  category: z.string().describe('Kategori berita (Pendidikan, Pertanian, Gizi, Sosial)'),
  thumbnailUrl: z.string().describe('URL gambar thumbnail yang relevan dari Unsplash (misal: https://images.unsplash.com/photo-...)'),
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
  input: { schema: z.object({}) },
  output: { schema: ExternalNewsOutputSchema },
  prompt: `Anda adalah asisten riset berita khusus untuk Bisukma Digital. 
  Tugas Anda adalah mengumpulkan dan merangkum 6 berita TERBARU (paling relevan tahun 2024/2025) dari portal berita eksternal di Indonesia yang secara spesifik menyebutkan atau berkaitan dengan:
  1. Bisukma Group.
  2. Bisukma Bangun Bangsa.
  3. Yayasan Bisukma.
  4. Kegiatan Erickson Sianipar yang membawa nama Bisukma.

  Berita harus mencakup inisiatif seperti:
  - Program Makan Bergizi Gratis (MBG) di Tapanuli Utara/Toba.
  - Pelatihan vokasi bersama Kemnaker/BBPVP.
  - Sinergi ketahanan pangan dengan TNI/Polri.
  - Aksi kemanusiaan atau pemberdayaan ekonomi masyarakat.

  Pastikan berita terlihat sangat nyata dengan sumber portal berita terpercaya (seperti Antara, Kompas, Tribun, atau media regional Sumatera Utara). Berikan ringkasan yang profesional dan objektif dalam Bahasa Indonesia.
  Untuk setiap berita, sertakan thumbnailUrl yang benar-benar relevan menggunakan Unsplash URL (misal bertema: agriculture, kitchen, education, community help).`,
});

const externalNewsFlow = ai.defineFlow(
  {
    name: 'externalNewsFlow',
    inputSchema: z.object({}),
    outputSchema: ExternalNewsOutputSchema,
  },
  async () => {
    const { output } = await prompt({});
    return output!;
  }
);
