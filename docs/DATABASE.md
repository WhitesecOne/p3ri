# DATABASE — Skema Data

Payload mendefinisikan skema lewat **collection config di TypeScript** (bukan SQL manual). Payload + Drizzle yang generate tabel Postgres & migration. Dokumen ini adalah kontrak skema yang harus diikuti — kalau ada perubahan, update file ini juga.

## 1. Diagram relasi (ringkas)

```
Users ──1:N── Posts (author)
Categories ──1:N── Posts
Media ──1:N── Posts (coverImage)
Media ──1:N── Users (avatar)
Pages (standalone, tidak berelasi)
ContactSubmissions (standalone)
MembershipInquiries (standalone)
Settings (global singleton)
```

## 2. Collection: `Users`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `name` | text | ✔ | nama tampil |
| `email` | email | ✔ | unik, dipakai login |
| `password` | (auth bawaan Payload) | ✔ | di-hash otomatis, tidak pernah diekspos |
| `role` | select: `admin` \| `editor` \| `author` | ✔ | dipakai access control, lihat `SECURITY.md` |
| `avatar` | relation → Media | – | opsional |
| `createdAt` / `updatedAt` | timestamp | auto | bawaan Payload |

Auth: pakai fitur `auth: true` bawaan Payload (email/password + JWT cookie). Rekomendasi tambahan: aktifkan lockout setelah percobaan login gagal (`auth.maxLoginAttempts`).

## 3. Collection: `Categories`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `name` | text | ✔ | mis. "Kegiatan", "Regulasi", "Wawasan Profesi" |
| `slug` | text | ✔ | auto-generate dari `name`, unik |
| `description` | textarea | – | opsional, untuk SEO halaman kategori |

## 4. Collection: `Media`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `alt` | text | ✔ | **wajib diisi** — untuk aksesibilitas & SEO |
| `filename`, `mimeType`, `filesize`, `width`, `height` | auto | auto | dikelola Payload upload adapter |
| `uploadedBy` | relation → Users | auto | diisi otomatis dari session |

Ukuran turunan (otomatis, WebP): `thumbnail` 480×320, `card` 900×600, `og` 1200×630. File asli di-*re-encode* ke WebP (maks. 1920px) sehingga EXIF/GPS terbuang dan nama file diacak (UUID).

Validasi: batasi tipe file (`image/jpeg`, `image/png`, `image/webp`) dan ukuran maksimum (mis. 5MB) di level config — lihat `SECURITY.md`.

## 5. Collection: `Posts` (inti fitur blog)

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `title` | text | ✔ | |
| `slug` | text | ✔ | auto-generate dari `title`, unik, bisa diedit manual |
| `excerpt` | textarea | ✔ | ringkasan untuk card & meta description default |
| `content` | richText (Lexical) | ✔ | isi artikel |
| `coverImage` | relation → Media | ✔ | |
| `category` | relation → Categories | ✔ | satu kategori utama |
| `tags` | array of text | – | opsional, multi-tag |
| `author` | relation → Users | auto | diisi dari session saat create |
| `_status` | select: `draft` \| `published` (fitur *drafts* bawaan Payload) | ✔ | default `draft`. Dipilih drafts bawaan (bukan field `status` manual) supaya versioning/audit trail §10 SECURITY.md, tombol Simpan Draft/Publish, autosave, dan preview ikut gratis. |
| `publishedAt` | date | – | diisi otomatis saat status → `published` |
| `seo.title` / `seo.description` | text/textarea | – | override meta tag default. OG image diambil dari `coverImage` ukuran `og` (1200×630). |

Versi: `versions.drafts` aktif (autosave 1,5 detik, maksimal 20 versi per dokumen).

Access control ringkas (detail di `SECURITY.md`):
- Author: create/update **hanya post miliknya sendiri**, tidak bisa set `status: published`.
- Editor & Admin: full CRUD semua post, termasuk publish.
- Public (read): hanya bisa baca post dengan `status: published`.

## 6. Collection: `Pages`

Untuk konten semi-statis yang tetap ingin bisa diedit non-developer (Tentang, Keanggotaan) tanpa hardcode di kode.

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `title` | text | ✔ | |
| `slug` | select: `about` \| `membership` | ✔ | terbatas, sesuai halaman yang ada |
| `content` | richText | ✔ | |
| `_status` | draft \| published | ✔ | drafts bawaan Payload, sama seperti Posts |
| `seo.title` / `seo.description` | text/textarea | – | |

## 7. Collection: `ContactSubmissions`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `name` | text | ✔ | |
| `email` | email | ✔ | |
| `subject` | text | – | |
| `message` | textarea | ✔ | |
| `status` | select: `new` \| `read` \| `replied` | ✔ | default `new`; tidak bisa diisi dari form publik |
| `website` | text (honeypot) | – | tersembunyi di admin; kalau terisi → request ditolak (anti-spam) |
| `createdAt` | timestamp | auto | |

Access: create terbuka untuk public (lewat form, bukan langsung ke `/admin`), read/update hanya Admin & Editor.

## 8. Collection: `MembershipInquiries`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `name` | text | ✔ | |
| `email` | email | ✔ | |
| `organization` | text | – | |
| `memberType` | select: `Praktisi` \| `Akademisi` \| `Pemerhati` \| `Anggota Kehormatan` | ✔ | sesuai kategori di situs lama |
| `message` | textarea | – | |
| `status` | select: `new` \| `contacted` \| `approved` \| `rejected` | ✔ | default `new`; tidak bisa diisi dari form publik |
| `website` | text (honeypot) | – | sama seperti ContactSubmissions |
| `createdAt` | timestamp | auto | |

Access: sama seperti `ContactSubmissions`.

## 9. Global: `Settings`

Singleton (bukan collection biasa) untuk data yang dipakai di banyak halaman (navbar/footer).

| Field | Tipe | Catatan |
|---|---|---|
| `siteName` | text | |
| `tagline` | text | dipakai di header & footer |
| `logo` | relation → Media | |
| `contactInfo.address` / `.email` / `.phone` | text | |
| `socialLinks.instagram` / `.youtube` | text (URL) | |
| `footerText` | textarea | |

## 9b. Collection: `Events` (ditambahkan 6 Sep 2026, permintaan owner)

Agenda kegiatan yang tampil di beranda (mendatang) dan halaman `/program` (mendatang + sebelumnya).

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `title` | text | ✔ | |
| `slug` | text | ✔ | auto dari judul |
| `program` | select: `coffee-talk` \| `klinik` \| `workshop` \| `seminar` \| `lainnya` | ✔ | |
| `startDate` / `endDate` | date | ✔ / – | index di `startDate`; "mendatang" = `startDate >= sekarang` |
| `mode` | select: `daring` \| `luring` \| `hibrid` | ✔ | |
| `location` | text | – | nama platform atau gedung & kota |
| `description` | textarea (≤600) | ✔ | |
| `speakers[]` | array of `name` | – | |
| `registrationUrl` | text (URL) | – | kalau kosong, tombol jadi "Tanya pengurus" |
| `coverImage` | relation → Media | – | |
| `_status` | draft \| published | ✔ | drafts bawaan Payload |

Access: read publik hanya `published`; create/update/delete Editor & Admin.

## 9c. Collection: `BoardMembers` (struktur pengurus, docs/PRD.md §4.1)

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `name` | text | ✔ | |
| `position` | text | ✔ | jabatan |
| `organization` | text | – | afiliasi |
| `period` | text | – | mis. "2024–2027" |
| `photo` | relation → Media | – | tanpa foto → inisial |
| `order` | number | – | default 100, urut naik |

Access: read publik; kelola Editor & Admin. Section di `/about` hanya tampil bila ada data.

## 10. Index & performa

- Index otomatis di `slug` (Posts, Categories, Pages) untuk lookup cepat.
- Index di `status` + `publishedAt` (Posts) untuk query listing.
- Foreign key `author`, `category`, `coverImage`, `uploadedBy` — pastikan `onDelete` behaviour didefinisikan eksplisit (mis. set null, bukan cascade delete artikel kalau user dihapus).

## 11. Migration

Payload + Drizzle pakai migration file (bukan `push` langsung ke production):

```bash
pnpm payload migrate:create   # generate migration dari perubahan schema
pnpm payload migrate          # apply migration
```

Migration: `src/migrations/20260906_093843_initial.ts`, `20260906_151327_add_events_board.ts`. Di development Payload memakai *push* otomatis (schema disinkronkan saat start); di production (Vercel) `pnpm ci` menjalankan `payload migrate` sebelum `next build`.

Setiap PR yang mengubah collection **wajib** menyertakan file migration yang di-generate, dan update dokumen ini.
