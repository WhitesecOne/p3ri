# ROADMAP — Fase Pengerjaan

## Phase 0 — Setup & Foundation

- [x] Scaffold project (`pnpx create-payload-app@latest -t website`)
- [x] Setup PostgreSQL (dev lokal via Homebrew `postgresql@16`; production Neon)
- [x] Install & konfigurasi shadcn/ui + Tailwind tokens sesuai `docs/DESIGN-SYSTEM.md`
- [x] Buat collection dasar: `Users`, `Categories`, `Media`, `Posts`, `Pages`, `ContactSubmissions`, `MembershipInquiries` (skema lihat `docs/DATABASE.md`)
- [x] Setup access control per collection (lihat `docs/SECURITY.md`)
- [ ] Setup jalur deploy (kode siap: `pnpm ci`, plugin Vercel Blob & Resend aktif via env; tinggal buat project Vercel + Neon): Vercel + Neon Postgres + Vercel Blob (keputusan final, lihat `docs/ARCHITECTURE.md#5-deployment`), termasuk environment `production`
- [x] Setup `.gitignore`, `.env.example`, CI dasar (lint + build check di setiap PR)

**Output fase ini**: repo jalan lokal, admin panel bisa diakses, deploy pipeline siap (boleh masih halaman kosong).

## Phase 1 — Core MVP

- [x] Layout dasar: Navbar, Footer, komponen `blocks/` (Hero, ActivityCards, ArticleCard, Testimonials)
- [x] Halaman Beranda (sesuai konten situs lama: hero, status hukum, program P3RI, highlight artikel, testimoni, galeri)
- [x] Halaman Tentang (`/about`) — dari collection `Pages`
- [x] Halaman Keanggotaan (`/membership`) — dari collection `Pages` + form `MembershipInquiries`
- [x] Halaman Kontak (`/contact`) — form `ContactSubmissions` + info kontak dari `Settings`
- [x] Blog: halaman list (`/blog`) + detail (`/blog/[slug]`), filter kategori
- [x] Admin workflow: Author bisa bikin draft, Editor/Admin bisa publish — verifikasi end-to-end (`pnpm check:rbac`)
- [x] Notifikasi email untuk form kontak & inquiry (hook siap; butuh `RESEND_API_KEY` + domain terverifikasi di production)
- [x] Redirect URL lama sesuai mapping di `docs/ARCHITECTURE.md`

- [x] Tambahan atas permintaan owner (6 Sep 2026): halaman `/program`, `/sumber-daya`, section wawasan/daur hidup/FAQ/mitra di beranda, collection `Events` (agenda) dan `BoardMembers` (pengurus)

**Output fase ini**: situs bisa dipakai untuk kebutuhan inti — publik bisa baca info & artikel, staf bisa publish artikel sendiri.

## Phase 2 — Content & Polish

- [x] Terapkan motion guideline (`docs/DESIGN-SYSTEM.md` §6) — scroll reveal, hover states, stagger grid
- [x] SEO: metadata per halaman/artikel, sitemap.xml, OG image otomatis dari `coverImage`
- [x] AEO/GEO: JSON-LD lengkap, FAQ terstruktur, `llms.txt` + `llms-full.txt`, robots mengizinkan crawler AI, OG image ber-desain per halaman, `security.txt`, manifest, halaman privasi
- [ ] Audit aksesibilitas (kontras, keyboard nav, alt text) — target WCAG 2.1 AA
- [ ] Audit performa (Lighthouse ≥ 90), optimasi gambar (next/image, format modern)
- [ ] Migrasi/kurasi konten artikel lama yang masih relevan
- [ ] Jalankan checklist go-live di `docs/SECURITY.md` §12

**Output fase ini**: siap launch ke domain production.

## Phase 3 — Backlog / pasca-launch (belum di-scope detail, evaluasi setelah launch)

- Fitur pencarian artikel
- Integrasi newsletter (Mailchimp/Resend Broadcast/dsb)
- Multi-bahasa (ID/EN)
- Dashboard sederhana untuk Admin (jumlah view artikel, submission terbaru)
- Member portal (kalau organisasi memutuskan digitalisasi keanggotaan penuh)
- 2FA untuk role Admin/Editor

## Prioritas pengambilan keputusan

Kalau ada konflik prioritas waktu terbatas: **Phase 1 (blog CMS jalan) > Phase 0 (fondasi benar) > Phase 2 (polish)**. Jangan lompat ke Phase 2 sebelum Author/Editor/Admin workflow di Phase 1 benar-benar teruji — itu requirement inti dari kepala divisi.
