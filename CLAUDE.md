# CLAUDE.md — Instruksi kerja untuk Claude Code

Ini adalah project rebuild website **P3RI** (organisasi profesi pengelola rekod Indonesia). Baca file ini sebelum mengerjakan task apa pun di repo ini.

## Konteks singkat

- Situs lama: WordPress, isinya profil organisasi + blog artikel.
- Situs baru: Next.js + Payload CMS, dengan kebutuhan utama **admin/pengelola website (non-developer) bisa bikin & publish artikel blog sendiri** lewat panel admin.
- Detail requirement ada di `docs/PRD.md`. Jangan tambah fitur di luar `docs/PRD.md` dan `docs/ROADMAP.md` tanpa konfirmasi ke user.

## Non-negotiables (jangan diubah tanpa persetujuan eksplisit)

1. **Stack tetap**: Next.js (App Router) + Payload CMS 3.x + PostgreSQL + Tailwind + shadcn/ui + Framer Motion. Jangan ganti ke CMS lain (Sanity/Strapi/WordPress) atau framework lain.
2. **RBAC harus sesuai** `docs/SECURITY.md` — role Admin/Editor/Author punya batasan akses berbeda, jangan longgarkan tanpa alasan tercatat.
3. **Jangan pernah commit secret** (`.env`, API key, `PAYLOAD_SECRET`, credential DB) ke git. Selalu cek `.gitignore` mencakup `.env*`.
4. **Tema light-only** untuk fase ini (lihat `docs/DESIGN-SYSTEM.md`) — boleh siapkan token untuk dark mode di masa depan, tapi jangan build UI dark mode dulu.
5. Redirect URL lama harus dijaga (lihat `docs/ARCHITECTURE.md#migrasi-url`) — jangan biarkan link lama 404 begitu saja.

## Alur kerja yang diharapkan

1. Sebelum implement fitur baru: cek `docs/PRD.md` (requirement) → `docs/DATABASE.md` (skema terkait) → `docs/API.md` (kontrak endpoint) → `docs/DESIGN-SYSTEM.md` (komponen & style yang dipakai).
2. Kalau butuh komponen UI baru: **tambah lewat shadcn CLI** (`pnpx shadcn@latest add <component>`), jangan hand-roll komponen yang sudah ada di shadcn.
3. Setelah ubah schema Payload (collection/field baru): jalankan `pnpm payload migrate:create` lalu `pnpm payload migrate`, dan update `docs/DATABASE.md` supaya dokumentasi tetap sinkron.
4. Sebelum menganggap task selesai: jalankan `pnpm lint`, `pnpm build`, dan `pnpm generate:types` — pastikan tidak ada error TypeScript maupun ESLint.
5. Perubahan yang menyentuh auth, access control, atau upload file — tandai eksplisit di ringkasan kerja, karena ini area sensitif (lihat `docs/SECURITY.md`).

## Coding standards

- TypeScript strict mode, **tidak ada `any`** kecuali ada komentar alasan jelas.
- Pakai types hasil generate Payload (`payload-types.ts`), jangan definisikan ulang tipe collection secara manual.
- Styling: Tailwind utility classes + shadcn/ui. Hindari inline `style={}` kecuali untuk nilai dinamis (misal posisi animasi Framer Motion).
- Komponen React: functional component, App Router server components by default; tambahkan `"use client"` hanya kalau memang butuh interaktivitas/state/animasi.
- Penamaan file: `kebab-case` untuk file, `PascalCase` untuk nama komponen.
- Commit message: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:` — conventional commits.

## Yang TIDAK boleh dilakukan tanpa bertanya dulu

- Mengubah struktur role/permission di `docs/SECURITY.md`.
- Menghapus atau mengubah slug/URL publik yang sudah live.
- Menambah dependency besar (library baru di luar yang sudah disebut di `README.md`) tanpa alasan kuat.
- Mengaktifkan fitur di luar scope `docs/ROADMAP.md` Phase yang sedang berjalan.

## Peta dokumen

| Kalau kerja soal... | Baca dulu |
|---|---|
| Fitur/requirement baru | `docs/PRD.md` |
| Struktur deployment, folder, hosting | `docs/ARCHITECTURE.md` |
| Collection/field/relasi data | `docs/DATABASE.md` |
| Endpoint, auth flow, format response | `docs/API.md` |
| Warna, tipografi, komponen, animasi | `docs/DESIGN-SYSTEM.md` |
| Auth, RBAC, upload, backup, compliance | `docs/SECURITY.md` |
| Urutan pengerjaan & prioritas | `docs/ROADMAP.md` |
