'use server';
/**
 * @fileOverview Flow untuk mengambil dan merangkum berita eksternal.
 * 
 * - fetchExternalNews: Fungsi untuk mendapatkan berita terkini dari sumber luar.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsItemSchema = z.object({
  title: z.string().describe('Judul berita'),
  source: z.string().describe('Sumber berita (misal: Antara News, Detik, Kompas)'),
  url: z.string().describe('URL asli berita'),
  date: z.string().describe('Tanggal terbit berita'),
  summary: z.string().describe('Ringkasan singkat berita dalam 1-2 kalimat'),
  category: z.string().describe('Kategori berita (Teknologi, Gizi, Ekonomi)'),
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
  prompt: `Anda adalah asisten riset berita untuk Bisukma Digital. 
  Tugas Anda adalah merangkum 3 berita terkini (paling relevan tahun 2024/2025) dari portal berita eksternal di Indonesia yang berkaitan dengan:
  1. Transformasi digital di pedesaan atau sektor publik.
  2. Program Makan Bergizi Gratis (MBG) atau gizi nasional di Indonesia.
  3. Ketahanan pangan lokal dan digitalisasi pertanian.

  Pastikan berita terlihat sangat nyata dengan sumber portal berita terpercaya di Indonesia. Berikan ringkasan yang profesional dan objektif dalam Bahasa Indonesia.`,
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
