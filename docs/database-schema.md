# Skema Basis Data Berita (News CMS)

Dokumen ini menjelaskan struktur data yang digunakan dalam aplikasi Bisukma Digital untuk memudahkan integrasi dengan CMS.

## 1. Tabel: `articles`
Menyimpan konten utama artikel berita.

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | `string` (UUID/Slug) | Identifier unik untuk artikel (digunakan di URL). |
| `title` | `string` | Judul artikel (Title Case). |
| `excerpt` | `text` | Ringkasan singkat artikel untuk kartu berita. |
| `content_part_1` | `text` | Paragraf awal artikel (sebelum foto tambahan). |
| `content_part_2` | `text` | Paragraf lanjutan artikel (setelah foto tambahan). |
| `date` | `string` / `date` | Tanggal publikasi (Format: "12 Mei 2024"). |
| `author` | `string` | Nama penulis artikel. |
| `category_id` | `uuid` (FK) | Relasi ke tabel kategori. |
| `main_img_id` | `string` | ID referensi gambar utama (PlaceHolder ID). |
| `main_img_caption` | `string` | Keterangan untuk gambar utama. |
| `additional_img_id` | `string` | ID referensi gambar tambahan di body artikel. |
| `additional_img_caption`| `string` | Keterangan untuk gambar tambahan. |

## 2. Tabel: `categories`
Daftar kategori berita yang tersedia.

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | `uuid` | Primary Key. |
| `name` | `string` | Nama kategori (Teknologi, Infrastruktur, dll). |

## 3. Tabel: `tags`
Daftar label/tag untuk klasifikasi mendalam.

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | `uuid` | Primary Key. |
| `name` | `string` | Nama tag (AI, Cloud, UI/UX, dll). |

## 4. Tabel Relasi: `article_tags`
Menghubungkan artikel dengan banyak tag (Many-to-Many).

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `article_id` | `uuid` | Foreign Key ke `articles`. |
| `tag_id` | `uuid` | Foreign Key ke `tags`. |

---
**Catatan Implementasi:**
- Pastikan CMS mengirimkan data gambar dalam bentuk `id` yang terdaftar di `PlaceHolderImages` atau URL langsung jika sudah menggunakan storage.
- Semua teks judul dan label harus disimpan dalam format **Title Case** untuk menjaga konsistensi UI.