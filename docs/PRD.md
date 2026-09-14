# PRD — Rebuild Website P3RI

## 1. Latar belakang

P3RI (Perkumpulan Profesi Pengelola Rekod Indonesia) adalah organisasi profesi resmi (disahkan Kemenkumham, AHU-0014361.AH.01.07 Tahun 2017) yang mewadahi profesi pengelola rekod/arsip di Indonesia. Situs saat ini berjalan di WordPress dan berisi profil organisasi, kegiatan (Coffee Talk, Klinik, Workshop, Seminar), informasi keanggotaan, dan blog artikel.

Kepala divisi meminta rebuild situs dengan stack modern, dengan kebutuhan utama: **pengelola website (staf non-developer) bisa membuat, mengedit, dan mempublikasikan artikel blog sendiri** tanpa bergantung ke developer.

## 2. Tujuan

1. Menyediakan situs profil organisasi yang modern, cepat, dan profesional.
2. Menyediakan CMS blog yang mudah dipakai staf non-teknis untuk publikasi rutin (rekap kegiatan, artikel, berita).
3. Menjaga kontinuitas SEO & link dari situs lama (jangan kehilangan trafik/ranking karena migrasi).
4. Membangun fondasi yang bisa berkembang (form keanggotaan digital, newsletter, dsb) tanpa rebuild ulang.

## 3. Target pengguna & role

| Role | Deskripsi | Kebutuhan utama |
|---|---|---|
| Pengunjung publik | Calon anggota, akademisi, praktisi, umum | Baca info organisasi, baca artikel, hubungi/daftar |
| Author (staf konten) | Staf yang menulis artikel kegiatan | Bikin & edit draft artikel, upload gambar, tidak bisa publish langsung |
| Editor | Pengurus yang mengelola konten | Publish/unpublish artikel, kelola kategori, moderasi semua draft |
| Admin | Pengurus inti / IT | Full akses termasuk kelola user, settings, halaman statis |

## 4. Ruang lingkup (in scope)

### 4.1 Halaman publik (mengacu struktur situs lama, harus tetap ada)

- **Beranda** — hero, ringkasan tentang P3RI, status hukum, ringkasan program (Coffee Talk, Klinik, Workshop, Seminar), highlight artikel terbaru, testimoni, galeri kegiatan, CTA kontak/gabung.
- **Artikel & Blog** (`/blog`) — daftar artikel (dengan filter kategori), halaman detail artikel.
- **Tentang P3RI** (`/about`) — sejarah, visi misi, legalitas, struktur pengurus.
- **Keanggotaan** (`/membership`, redirect dari `/services`) — jenis anggota (Praktisi, Akademisi, Pemerhati, Anggota Kehormatan), periode keanggotaan (2 tahun), cara daftar, form inquiry.
- **Kontak** (`/contact`) — alamat, email, telepon, form kontak.

### 4.2 CMS Blog (fitur inti requirement)

- Admin/Editor/Author login ke `/admin`.
- CRUD artikel: judul, slug (auto-generate, bisa diedit), excerpt, konten rich text, gambar cover, kategori, tag, status (draft/published), tanggal publish, penulis.
- Upload & kelola media (galeri gambar kegiatan).
- Kategori artikel (misal: Kegiatan, Regulasi, Wawasan Profesi, Pengumuman).
- Workflow status: Author hanya bisa simpan draft → Editor/Admin yang publish.
- Preview artikel sebelum publish.

### 4.3 Form & inquiry

- Form kontak → tersimpan di CMS + notifikasi email ke pengurus.
- Form inquiry keanggotaan → tersimpan di CMS + notifikasi email.

### 4.4 Non-fungsional

- **Performa**: skor Lighthouse ≥ 90 (performance & SEO) di halaman utama.
- **SEO**: meta title/description per halaman & artikel bisa diedit dari admin, sitemap.xml & robots.txt otomatis, OG image.
- **Aksesibilitas**: target WCAG 2.1 AA.
- **Responsif**: mobile-first, karena banyak pengunjung dari media sosial (Instagram/YouTube P3RI).
- **Keamanan**: mengikuti `docs/SECURITY.md`.
- **Bahasa**: Bahasa Indonesia (default). Multi-bahasa masuk backlog (lihat `docs/ROADMAP.md`).

## 5. Di luar scope (untuk fase ini)

- Member portal berbayar/login anggota.
- Sistem pembayaran/iuran online.
- Multi-bahasa (EN).
- Live chat.
- Migrasi data historis 1:1 otomatis dari WordPress (konten lama akan dikurasi ulang, bukan di-dump mentah).

## 6. Metrik keberhasilan

- Staf konten bisa publish artikel baru **tanpa bantuan developer** dalam waktu < 10 menit dari login.
- Tidak ada broken link dari URL lama yang sudah terindeks Google (lihat mapping redirect di `docs/ARCHITECTURE.md`).
- Waktu load halaman < 2.5s (LCP) di koneksi 4G.

## 7. Open questions (perlu konfirmasi ke kepala divisi)

- Apakah data anggota existing (kalau ada) perlu diimpor, atau form inquiry cukup untuk fase ini?
- Siapa saja yang akan jadi Editor vs Author di struktur pengurus?
- Apakah perlu integrasi newsletter (Mailchimp/dsb) di fase awal atau backlog?
