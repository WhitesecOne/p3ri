# ARCHITECTURE — Arsitektur Sistem

## 1. Ringkasan

Satu aplikasi Next.js (App Router) dengan Payload CMS 3.x ter-embed langsung di dalamnya (bukan service terpisah). Payload menyediakan admin panel, REST/GraphQL API, dan koneksi database — semuanya jalan dalam satu deployment.

```
Pengunjung publik ─┐                Pengelola web (admin/author) ─┐
                    ▼                                              ▼
            ┌───────────────────────── Next.js app ─────────────────────────┐
            │  Frontend publik (SSR/SSG)      │   Payload admin (/admin)     │
            │  route group (frontend)         │   route group (payload)     │
            └────────────────────┬───────────────────────┬───────────────────┘
                                  ▼                       ▼
                          PostgreSQL (konten, user)   Object storage (media)
```

## 2. Tech stack detail

| Komponen | Pilihan | Versi target |
|---|---|---|
| Runtime | Node.js | ≥ 20 LTS |
| Framework | Next.js | 15.x (App Router) |
| CMS | Payload CMS | 3.x |
| ORM (dipakai Payload) | Drizzle | bundled dengan Payload |
| Database | PostgreSQL | ≥ 15 |
| Storage media | Vercel Blob (default) / Cloudflare R2 / S3-compatible | — |
| Styling | Tailwind CSS | v3/v4 |
| UI components | shadcn/ui | sudah terinstall |
| Animasi | Framer Motion | latest |
| Email transaksional | Resend / Nodemailer + SMTP | untuk notifikasi form kontak & inquiry |
| Package manager | pnpm | ≥ 9 |

## 3. Struktur folder

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Beranda
│   │   ├── about/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx             # daftar artikel
│   │   │   └── [slug]/page.tsx      # detail artikel
│   │   └── sitemap.ts
│   └── (payload)/
│       ├── admin/[[...segments]]/page.tsx
│       └── api/[...slug]/route.ts
├── collections/
│   ├── Users.ts
│   ├── Posts.ts
│   ├── Categories.ts
│   ├── Media.ts
│   ├── Pages.ts
│   └── ContactSubmissions.ts
├── globals/
│   └── Settings.ts
├── components/
│   ├── ui/                          # komponen shadcn (auto-generated, jangan edit manual)
│   ├── blocks/                      # Hero, ActivityCards, Testimonials, ArticleCard, dst
│   └── layout/                      # Navbar, Footer
├── lib/
│   ├── payload.ts                   # helper local API
│   └── utils.ts
├── access/                          # fungsi access control per collection (lihat SECURITY.md)
└── payload.config.ts
```

## 4. Alur render & data

- Halaman publik pakai **SSG + ISR** (`revalidate`) untuk performa, bukan full CSR.
- Saat artikel di-publish/update di admin, Payload `afterChange` hook memanggil `revalidatePath('/blog')` dan `revalidatePath('/blog/[slug]')` supaya cache langsung update (tidak perlu re-deploy).
- Frontend mengambil data lewat **Payload Local API** (`getPayload()` dalam server component) — bukan lewat HTTP fetch ke API sendiri — supaya lebih cepat dan type-safe.
- Form kontak & inquiry submit lewat server action / route handler → simpan ke collection terkait → trigger email notifikasi.

## 5. Deployment — KEPUTUSAN FINAL: full-managed, tanpa VPS

Konfirmasi eksplisit dari owner project: **tidak mau mengurus server/VPS/Docker sama sekali**, tapi tetap butuh admin panel CMS yang sudah jadi (bukan build custom). Payload memenuhi keduanya selama di-host di platform serverless — bukan berarti harus pindah ke BaaS lain seperti Supabase (yang justru tidak menyediakan admin panel konten siap pakai).

**Stack hosting yang dipakai:**

| Komponen | Layanan | Kenapa |
|---|---|---|
| App (Next.js + Payload) | **Vercel** | Deploy serverless, `git push` langsung live, tidak ada server yang dikelola tim |
| Database | **Neon Postgres** | Postgres serverless, satu klik integrasi dari Vercel, auto-scaling, backup bawaan |
| Storage media | **Vercel Blob** | Terintegrasi langsung, tidak perlu setup bucket/IAM manual seperti S3 mentah |

**Platform final: Vercel** (bukan self-host/VPS). Detail plan & biaya dijelaskan di bagian "Catatan biaya" di bawah — jangan anggap paragraf ini menyiratkan plan berbayar tertentu, rujuk ke bagian itu untuk keputusan biaya yang berlaku.

Tidak ada Docker, tidak ada SSH, tidak ada patch OS — sesuai requirement. (Di laptop developer, PostgreSQL dipasang lewat Homebrew, bukan Docker — keputusan owner 7 Sep 2026.) **Satu-satunya "maintenance"** yang tetap jadi tanggung jawab tim (bukan server ops, murni software): update dependency Payload/Next.js sesekali (`pnpm update` + redeploy) untuk patch keamanan. Ini dilakukan Whitesec sebagai bagian dukungan pasca-launch, bukan sesuatu yang perlu dikerjakan tim P3RI — tim P3RI hanya login ke `/admin` untuk kelola konten, tidak menyentuh infra sama sekali.

> Opsi VPS self-hosted (Docker Compose + Postgres lokal) **tidak dipakai** untuk project ini — didokumentasikan di sini hanya sebagai catatan bahwa opsi itu sempat dipertimbangkan dan sengaja tidak dipilih, supaya keputusan ini tidak ditanya ulang di kemudian hari.

### Catatan biaya (keputusan final project)

**Keputusan**: pakai free tier di semua layanan. Domain (`p3ri.or.id` — registrasi/perpanjangan) di luar cakupan dokumen ini, diinfokan terpisah oleh project owner ke pihak P3RI.

| Layanan | Plan | Biaya |
|---|---|---|
| Payload CMS | MIT open source | $0 (selamanya, tidak ada tier berbayar yang diperlukan) |
| Vercel | Hobby (Free) | $0 |
| Neon Postgres | Free | $0 (commercial use diizinkan eksplisit oleh Neon) |
| Vercel Blob | masuk allowance Hobby | $0 |

**Risiko yang disadari & diterima** (bukan diabaikan, tapi keputusan sadar):

- Vercel Hobby ToS membatasi untuk personal/non-commercial project — proyek client berbayar seperti ini secara teknis di luar cakupan itu. Risiko diterima karena skala trafik P3RI kecil dan biaya operasional ingin ditekan seminimal mungkin di fase awal.
- **Risiko operasional konkret**: kalau usage (bandwidth/function invocation) melewati limit Hobby, project **di-pause otomatis** (situs down) sampai periode 30 hari berikutnya — bukan ditagih. Mitigasi: cek Vercel usage dashboard secara berkala (minimal bulanan), dan siap upgrade ke Pro ($20/bulan) kalau usage mulai mendekati limit atau kalau ada event dengan lonjakan trafik terjadwal (mis. seminar/workshop besar yang di-promote lewat medsos).
- Neon free tier storage terbatas 0.5GB — cukup untuk volume konten P3RI di fase awal, tapi perlu dipantau seiring artikel & media bertambah.

## 6. Migrasi URL (wajib — jangan sampai broken link)

Situs lama pakai struktur berikut, harus di-redirect (HTTP 301) ke struktur baru:

| URL lama | URL baru | Catatan |
|---|---|---|
| `/` | `/` | sama |
| `/blog/` | `/blog` | sama, tanpa trailing slash |
| `/about/` | `/about` | sama |
| `/services/` | `/membership` | **beda slug** — wajib redirect 301 |
| `/contact/` | `/contact` | sama |
| `/wp-content/uploads/...` | (media di-migrasi ke storage baru) | jika artikel lama ikut dipindah, gambar ikut diunggah ulang ke Media collection dan URL lama di-301 ke URL media baru, atau setidaknya jangan 404 |

Implementasi redirect: `next.config.js` → `redirects()`, atau middleware kalau butuh logic dinamis.

## 7. Environment & config

- Semua secret lewat environment variables (lihat `README.md` untuk daftar minimal).
- Konfigurasi lingkungan berbeda untuk `development`, `preview` (opsional), `production`.
- Payload config (`payload.config.ts`) membaca `DATABASE_URI` dan `PAYLOAD_SECRET` dari env — tidak boleh hardcode.

## 8. Skalabilitas & batasan yang disadari

- Trafik situs organisasi profesi relatif kecil–menengah — arsitektur ini sudah lebih dari cukup, tidak perlu microservices/queue di awal.
- Kalau nanti ada kebutuhan member portal atau volume artikel besar, database & storage sudah siap discale tanpa ganti arsitektur inti.
