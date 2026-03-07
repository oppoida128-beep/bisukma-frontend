
# Skema Basis Data Berita (News CMS)

Dokumen ini menjelaskan struktur data yang digunakan dalam aplikasi Bisukma Digital untuk memudahkan integrasi dengan CMS.

## 1. Tabel: `articles`
Menyimpan konten utama artikel berita. Konten disimpan dalam satu kolom HTML untuk fleksibilitas tata letak.

| Kolom | Tipe Data | Deskripsi |
|-------|-----------|-----------|
| `id` | `string` (UUID/Slug) | Identifier unik untuk artikel (digunakan di URL). |
| `title` | `string` | Judul artikel (Title Case). |
| `excerpt` | `text` | Ringkasan singkat artikel untuk kartu berita. |
| `content` | `text` (HTML) | Seluruh isi artikel dalam format HTML (termasuk tag paragraf, gambar, dll). |
| `date` | `string` / `date` | Tanggal publikasi (Format: "12 Mei 2024"). |
| `author` | `string` | Nama penulis artikel. |
| `category_id` | `uuid` (FK) | Relasi ke tabel kategori. |
| `main_img_id` | `string` | ID referensi gambar utama (PlaceHolder ID). |
| `main_img_caption` | `string` | Keterangan untuk gambar utama. |

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
- Web Utama merender kolom `content` sebagai **Raw HTML**.
- Pastikan editor CMS menyisipkan tag `<img>` dengan `src` URL gambar yang valid dan responsif.
- Gunakan tag `<p>` untuk setiap paragraf guna menjaga konsistensi jarak baris.
