# P3RI Website Rebuild

Situs resmi **P3RI — Perkumpulan Profesi Pengelola Rekod Indonesia** (p3ri.or.id).
Rebuild dari WordPress ke Next.js + Payload CMS, dengan panel admin supaya pengelola website non-teknis bisa menulis dan mempublikasikan artikel sendiri.

> Baca `CLAUDE.md` dulu sebelum mulai kerja di repo ini — itu adalah instruksi kerja untuk Claude Code.

## Tech stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS / Backend | Payload CMS 3.88 (embedded, admin di `/admin`) |
| Database | PostgreSQL 16 (Homebrew di lokal → Neon di production) |
| Storage media | Disk lokal `./media` di dev → Vercel Blob di production (aktif otomatis kalau `BLOB_READ_WRITE_TOKEN` diisi) |
| Styling | Tailwind CSS v4 + shadcn/ui (radix, preset nova) |
| Animasi | Motion (`motion/react`) — scroll reveal & stagger, hormat `prefers-reduced-motion` |
| Email | Resend (`RESEND_API_KEY`); tanpa key, email hanya dicetak ke console |
| Package manager | pnpm 11 |

Detail lengkap ada di folder `docs/`:

- [`docs/PRD.md`](docs/PRD.md) — requirement produk & scope
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — arsitektur, deployment, redirect URL lama
- [`docs/DATABASE.md`](docs/DATABASE.md) — skema koleksi/data
- [`docs/API.md`](docs/API.md) — endpoint & kontrak API
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — UI/UX guideline
- [`docs/SECURITY.md`](docs/SECURITY.md) — requirement keamanan (wajib dipatuhi)
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — fase pengerjaan

## Prasyarat

- Node.js ≥ 20 (dites di 24)
- pnpm ≥ 9
- PostgreSQL 16 lokal via Homebrew (`brew install postgresql@16`) — atau connection string Neon

## Menjalankan lokal

```bash
pnpm install
cp .env.example .env          # isi PAYLOAD_SECRET (openssl rand -hex 32); DATABASE_URI default sudah cocok dengan PostgreSQL lokal (user/pass/db: p3ri)
pnpm db:up                    # brew services start postgresql@16 (localhost:5432, user/pass/db: p3ri)
# sekali saja setelah instal: createuser -P p3ri (password: p3ri) && createdb -O p3ri p3ri
pnpm seed                     # admin awal, pengaturan situs + medsos + logo, kategori, halaman Tentang & Keanggotaan (tanpa artikel)
pnpm dev
```

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin — login awal `admin@p3ri.or.id` / `AdminP3RI-2026!` (atau `SEED_ADMIN_PASSWORD`). **Ganti password setelah login pertama.**

Kalau tidak menjalankan seed, buka `/admin` dan buat user admin pertama dari form yang muncul.

## Scripts

| Command | Fungsi |
|---|---|
| `pnpm dev` | Dev server (schema DB disinkronkan otomatis) |
| `pnpm build` / `pnpm start` | Build & jalankan production |
| `pnpm ci` | `payload migrate` lalu build — dipakai sebagai Build Command di Vercel |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | Regenerasi `src/payload-types.ts` setelah ubah collection |
| `pnpm payload migrate:create` | Buat file migration setelah ubah schema (wajib sebelum deploy) |
| `pnpm seed` | Isi konten awal (idempoten) |
| `pnpm check:rbac` | Uji end-to-end matrix RBAC lewat REST (dev server harus jalan) |
| `pnpm db:up` / `pnpm db:down` | Nyalakan / matikan PostgreSQL lokal (Homebrew service) |

## Environment variables

Lihat `.env.example`. Minimal di production:

```
DATABASE_URI=postgresql://...          # Neon
PAYLOAD_SECRET=<random ≥32 karakter>
NEXT_PUBLIC_SITE_URL=https://www.p3ri.or.id
BLOB_READ_WRITE_TOKEN=<Vercel Blob>
RESEND_API_KEY=<Resend>
EMAIL_FROM=noreply@p3ri.or.id           # domain harus diverifikasi di Resend
NOTIFY_EMAIL=p3ri.indonesia@gmail.com   # penerima notifikasi form
```

Jangan commit file `.env` — lihat `docs/SECURITY.md`.

## Deploy dari GitHub ke Vercel

Repository: [WhitesecOne/p3ri](https://github.com/WhitesecOne/p3ri), branch production: `main`.

1. Di Vercel, pilih **Add New → Project**, hubungkan GitHub **WhitesecOne**, lalu import repository **p3ri**. Jika belum muncul, berikan akses aplikasi Vercel ke repository tersebut di GitHub.
2. Pilih framework **Next.js**, Root Directory **`./`**, dan Node.js **24.x**. Biarkan Output Directory default. Build Command sudah diatur dalam `vercel.json` menjadi `pnpm run ci` (migrasi database, lalu build).
3. Siapkan **Neon PostgreSQL** dan **Vercel Blob** untuk project ini. Gunakan Blob store **public** sesuai URL gambar yang diizinkan aplikasi. Integrasi Neon mungkin membuat `DATABASE_URL`; aplikasi ini membaca **`DATABASE_URI`**, jadi salin connection string Neon ke nama tersebut (termasuk pengaturan SSL dari Neon).
4. Isi Environment Variables untuk **Production** sebelum build berhasil:

   | Variable | Nilai |
   |---|---|
   | `DATABASE_URI` | Connection string Neon PostgreSQL |
   | `PAYLOAD_SECRET` | Secret baru dari `openssl rand -hex 32`; simpan tetap untuk deployment berikutnya |
   | `NEXT_PUBLIC_SITE_URL` | URL situs lengkap, misalnya `https://p3ri.vercel.app` jika URL tersebut diberikan Vercel, atau domain custom yang sudah tersambung |
   | `BLOB_READ_WRITE_TOKEN` | Token dari Blob store yang dihubungkan ke project |
   | `RESEND_API_KEY` | API key Resend untuk notifikasi formulir |
   | `EMAIL_FROM` | Alamat pengirim pada domain yang sudah diverifikasi di Resend |
   | `NOTIFY_EMAIL` | Email penerima notifikasi formulir |

   Tambahkan juga `ENABLE_EXPERIMENTAL_COREPACK=1` di Vercel agar instalasi mengikuti versi pnpm pada `packageManager`. Jangan salin nilai placeholder dari `.env.example` sebagai credential.

5. Klik **Deploy**, atau **Redeploy** jika deployment awal berjalan sebelum database/environment siap. Pastikan Production Branch adalah **`main`**. Untuk Preview deployments, gunakan database dan secret terpisah karena Build Command juga menjalankan migrasi.
6. Setelah deploy berhasil, buka **`/admin`** dan segera buat akun admin pertama dengan password sendiri. Isi Settings, kategori, halaman, dan konten melalui CMS. Database dan file upload lokal tidak ikut dikirim lewat GitHub; pemindahan data lokal perlu dilakukan terpisah. `pnpm seed` bukan bagian dari proses deploy otomatis.
7. Jika memakai domain `p3ri.or.id`, tambahkan di **Settings → Domains**, ikuti petunjuk DNS Vercel, sesuaikan `NEXT_PUBLIC_SITE_URL`, lalu redeploy.

Setelah terhubung, setiap push atau merge ke `main` otomatis memicu deployment production; GitHub Actions tambahan tidak diperlukan. Perubahan artikel melalui CMS disimpan di database.

Rujukan: [integrasi GitHub Vercel](https://vercel.com/docs/git/vercel-for-github), [konfigurasi build](https://vercel.com/docs/builds/configure-a-build), dan [deployment Payload](https://payloadcms.com/docs/production/deployment).

## Struktur singkat

```
src/
├── app/(frontend)/     # halaman publik: /, /about, /program, /membership, /blog, /blog/[slug], /sumber-daya, /contact, /preview, /[slug] (redirect URL lama)
├── app/(payload)/      # admin panel & REST API Payload
├── collections/        # Posts, Events, Categories, Media, Pages, BoardMembers, ContactSubmissions, MembershipInquiries, Users
├── globals/Settings.ts # nama situs, kontak, medsos, footer
├── access/             # fungsi RBAC (docs/SECURITY.md §1)
├── hooks/              # revalidate ISR, anti-spam, notifikasi email
├── components/         # ui/ (shadcn), blocks/, layout/, forms/, motion/
├── lib/                # queries (Local API), content statis (copy, FAQ, regulasi, glosarium), helper
├── migrations/         # migration Drizzle
├── seed.ts             # konten awal
└── rbac-check.ts       # uji RBAC
```

## SEO, AEO/GEO, dan berkas standar

- Metadata kanonik + Open Graph + Twitter per halaman (`src/lib/seo.ts`), OG image ber-desain per rute (`opengraph-image.tsx`, renderer di `src/lib/og.tsx`, font di `src/assets/fonts/`).
- JSON-LD schema.org: `Organization`, `WebSite` (layout), `BreadcrumbList`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `FAQPage` (beranda, keanggotaan), `Event` (agenda), `BlogPosting` (artikel), `DefinedTermSet` (glosarium).
- `/robots.txt` (crawler AI diizinkan eksplisit), `/sitemap.xml`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt` (konten situs dalam Markdown untuk LLM, ikut memuat artikel & agenda terbit), `/.well-known/security.txt` (RFC 9116; `/security.txt` dialihkan).
- Halaman `/privasi` (UU PDP), tombol bagikan, waktu baca, dan artikel terkait di detail artikel.

## Kontak

Pertanyaan konten & requirement bisnis: kepala divisi / pengurus P3RI.
Pertanyaan teknis repo: lihat `CLAUDE.md`.
