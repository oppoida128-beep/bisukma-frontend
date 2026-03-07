
# Skema Basis Data Berita (News CMS)

Dokumen ini menjelaskan struktur data yang digunakan dalam aplikasi Bisukma Digital untuk integrasi dengan CMS/Supabase. Skema ini selaras dengan entitas `Post` yang didefinisikan di backend.

## 1. Tabel: `posts`
Menyimpan konten utama artikel berita.

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | `string` (UUID) | Identifier unik artikel. |
| `title` | `string` | Judul artikel (Title Case). |
| `slug` | `string` | URL-friendly title. |
| `excerpt` | `text` | Ringkasan singkat artikel untuk kartu berita. |
| `content` | `text` (HTML) | Seluruh isi artikel dalam format HTML tunggal. |
| `publishDate` | `string` / `date` | Tanggal publikasi (Format: "12 Mei 2024"). |
| `author` | `string` | Nama penulis artikel. |
| `categoryId` | `string` | ID referensi ke kategori. |
| `tags` | `array` (string[]) | Daftar label/tag. |
| `featuredImage` | `string` | ID referensi gambar utama (PlaceHolder ID). |
| `featuredImageCaption`| `string` | Keterangan untuk gambar utama. |
| `status` | `enum` | ["Draft", "Published", "Scheduled"]. |
| `visibility` | `enum` | ["Public", "Private"]. |

---
**Catatan Implementasi:**
- Web Utama merender kolom `content` menggunakan `dangerouslySetInnerHTML`.
- CMS harus menyisipkan tag `<img>` langsung di dalam kolom `content` untuk tata letak yang fleksibel.
- Gunakan styling global di `globals.css` untuk memastikan gambar di dalam `content` responsif.
