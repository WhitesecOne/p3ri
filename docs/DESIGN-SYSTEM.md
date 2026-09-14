# DESIGN SYSTEM — UI/UX Guideline

Arah visual (keputusan owner, 6 Sep 2026): **editorial modern** — tipografi sans tegas (Plus Jakarta Sans), layout asimetris/bento, nomor editorial `01–05`, motif tri-warna logo. Bukan replika situs lama.

Tujuan: situs terasa **modern, profesional, dan kredibel** — bukan situs organisasi non-profit yang terkesan seadanya, tapi juga bukan landing page startup yang terlalu playful. Target rasa: institusi yang serius mengurus informasi, tapi enak dipakai.

## 1. Prinsip desain

1. **Trust first.** P3RI adalah organisasi profesi resmi — hierarki visual harus jelas, konten legalitas (status hukum, AHU) harus mudah ditemukan, tipografi harus terbaca nyaman untuk konten panjang (artikel).
2. **Tenang, bukan ramai.** Whitespace generous, satu accent color, hindari terlalu banyak warna/gradient/efek dekoratif.
3. **Cepat & ringan.** Motion untuk memperjelas, bukan pamer — semua animasi harus punya alasan fungsional (menunjukkan hierarki, memberi feedback, memandu perhatian).
4. **Light theme only** untuk fase ini (lihat `CLAUDE.md`), tapi token warna disusun supaya dark mode bisa ditambah nanti tanpa refactor besar.

## 2. Referensi desain

### Referensi langsung (sesama organisasi/industri arsip & information management)

| Situs | Kenapa relevan |
|---|---|
| [aiim.org](https://www.aiim.org/) — AIIM (Association for Intelligent Information Management) | Padanan internasional P3RI (asosiasi profesi information/records management). Layout bersih, hierarki konten (membership, certification, resources) tertata rapi, cocok jadi acuan struktur navigasi. |
| [preservica.com](https://preservica.com/) | Software digital preservation/arsip — light theme, banyak whitespace, card-based section, tone visual "institusional tapi modern" persis yang kita incar. |
| [arma.org](https://www.arma.org/) — ARMA International | Asosiasi records management global, referensi tambahan untuk struktur halaman keanggotaan & event. |

### Referensi pola komponen & motion (bukan archive-specific, tapi kualitas eksekusi shadcn/ui + motion terbaik di kelasnya)

| Situs | Ambil apa dari sini |
|---|---|
| [vercel.com](https://vercel.com/) | Tipografi & spacing scale yang rapi, penggunaan card & section rhythm. |
| [linear.app](https://linear.app/) | Micro-interaction halus (hover, transition state), contoh disiplin penggunaan satu accent color. |

> Jangan tiru layout 1:1 — pakai sebagai kalibrasi "rasa" modern-profesional-terang, bukan template untuk di-copy.

## 3. Warna — diturunkan dari logo resmi P3RI

Keputusan owner (6 Sep 2026): palet mengikuti **logo resmi** (`public/logo-p3ri.png`), bukan biru institusional generik. Tiga cincin logo menjadi tiga warna brand; warna utama = cincin merah.

```
--brand-red:     #B80016   /* cincin merah — primary: CTA, link aktif, fokus (6.9:1 di putih) */
--brand-green:   #0B6B28   /* cincin hijau — penanda sukses/positif, aksen kedua (6.7:1) */
--brand-silver:  #9A9AA0   /* cincin perak — netral dekoratif (titik, garis) */
--brand-amber:   #F5A524   /* gradasi kuning logo — dekoratif saja, jangan untuk teks di putih */

--background:        #FFFFFF
--muted / surface:   #F5F5F6   /* section alternate, abu dingin senada perak */
--foreground:        #141416   /* teks utama */
--muted-foreground:  #5F5F66   /* teks sekunder (6.3:1) */
--border:            #E4E4E7
--ink:               #141416   /* latar gelap: footer, CTA band */
```

Motif brand: **garis tri-warna** (`.brand-stripe`, merah|hijau|perak) di atas header, footer, dan bawah page header; **tiga titik** (`<BrandDots/>`) di depan eyebrow. Aturan pakai merah: CTA utama, link aktif, nomor editorial, state fokus — tidak untuk blok besar selain tombol (biar tetap tenang). Token diimplementasikan di `src/app/globals.css` mengikuti konvensi shadcn.

## 4. Tipografi

| Peran | Font | Catatan |
|---|---|---|
| Heading & angka editorial | **Plus Jakarta Sans** SemiBold (`next/font`) | Keputusan owner 14 Sep 2026: serif Newsreader diganti sans agar lebih clean. Weight 600, `letter-spacing: -0.025em`, tanpa italic; angka editorial `font-medium tabular-nums`. |
| UI & body text | **Plus Jakarta Sans** (`next/font`) | Sans geometris karya desainer Indonesia; body 16px, `leading-relaxed`. |
| Monospace | system mono | hanya untuk nomor AHU |

Skala: hero `text-4xl→6xl` leading 1.08; H1 page header `text-4xl→6xl`; H2 section `text-3xl→5xl`; eyebrow `text-xs uppercase tracking-[0.18em]`. Tetap pakai skala Tailwind bawaan.

## 5. Komponen (shadcn/ui)

Sudah terinstall — pakai lewat CLI (`pnpx shadcn@latest add <nama>`), **jangan hand-roll ulang** komponen yang sudah tersedia. Komponen yang akan dipakai di project ini:

| Kebutuhan | Komponen shadcn |
|---|---|
| Navigasi utama | `navigation-menu`, `sheet` (mobile nav) |
| CTA & aksi | `button` |
| Card kegiatan/artikel | `card`, `badge` (kategori/tag) |
| Form (kontak, inquiry, admin) | `form`, `input`, `textarea`, `select`, `checkbox` |
| Notifikasi hasil submit | `sonner` (toast) |
| Modal konfirmasi | `dialog` |
| Loading state | `skeleton` |
| Navigasi artikel panjang / arsip | `tabs`, `pagination`, `breadcrumb` |
| Avatar penulis artikel | `avatar` |
| Pemisah section | `separator` |

Ikon: **lucide-react** (satu paket dengan shadcn) — konsisten, jangan campur dengan icon set lain.

## 6. Motion (Framer Motion)

Prinsip: **subtle & purposeful**. Semua animasi 150–300ms, easing `ease-out` untuk masuk, `ease-in` untuk keluar. Hormati `prefers-reduced-motion`.

| Elemen | Animasi |
|---|---|
| Section saat scroll | Fade + slide-up 16px, trigger `whileInView`, `viewport={{ once: true }}` — jangan animasikan ulang tiap kali di-scroll bolak-balik |
| Grid kartu artikel/kegiatan | `staggerChildren` ringan (~0.05s antar item) saat pertama muncul |
| Hover card/button | Scale `1.0 → 1.02` atau shadow naik tipis, durasi 150ms |
| Navbar mobile (sheet) | Slide-in dari kanan, bawaan shadcn `sheet` sudah cukup, tidak perlu custom |
| Perpindahan halaman | **Tidak perlu** full page transition — App Router + SSR bikin ini rumit dan riskan janky; fokus animasi di level komponen saja |
| Form submit | Skeleton/spinner di tombol saat loading, toast sukses/error setelah selesai |

Hindari: parallax berat, animasi looping tanpa tujuan, efek "reveal" yang bikin user harus menunggu buat baca konten (animasi harus mempercepat pemahaman, bukan memperlambat akses ke konten).

## 7. Layout & spacing

- Container max-width `1280px` (`max-w-screen-xl`), padding horizontal responsif `px-4 md:px-8`.
- Section vertical rhythm konsisten: `py-16 md:py-24` antar section di landing page.
- Grid kartu: 1 kolom mobile → 2 kolom tablet → 3 kolom desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- Border-radius konsisten pakai token shadcn (`--radius`), jangan campur radius custom di komponen berbeda.

## 8. Aksesibilitas (WCAG 2.1 AA)

- Kontras warna teks minimal 4.5:1 — sudah dicek untuk `--foreground` di atas `--background`/`--surface`.
- Semua gambar (termasuk field `alt` di Media collection — lihat `DATABASE.md`) wajib diisi, tidak boleh kosong.
- Focus state terlihat jelas (shadcn default sudah bagus — jangan di-`outline-none` tanpa pengganti).
- Navigasi bisa full keyboard (tab order logis, form punya label eksplisit bukan cuma placeholder).
- Kontras jangan hanya andalkan warna untuk status (mis. badge kategori) — sertakan teks/label, bukan warna saja.

## 9. Konten & imagery

- Foto dokumentasi arsip (gudang arsip, buku arsip, arsip fisik & digital) ada di `src/assets/images/` — impor lewat `PHOTOS` (`src/assets/images/index.ts`), sumber & lisensi di `CREDITS.md`. Tambah foto baru ke file yang sama, wajib isi `alt`.
- Foto kegiatan (galeri) ditampilkan natural, tidak perlu filter berat — kesan otentik lebih penting daripada stok foto generik.
- Hindari ilustrasi generik/AI-generated yang terasa template — kalau butuh elemen visual dekoratif, pakai bentuk geometris sederhana yang selaras warna brand, bukan clip-art.
