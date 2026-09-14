# API — Kontrak Endpoint

Payload otomatis generate REST & GraphQL API dari collection config. Frontend server components sebisa mungkin pakai **Local API** (langsung panggil fungsi Payload di server, bukan HTTP round-trip) — REST di bawah ini terutama relevan untuk: form submission dari client component, integrasi eksternal, dan dokumentasi kontrak.

Base URL: `{NEXT_PUBLIC_SITE_URL}/api`

## 1. Auth

### `POST /api/users/login`
Body: `{ "email": string, "password": string }`
Response sukses (200): set httpOnly cookie JWT + `{ "user": {...}, "token": "..." }`
Response gagal (401): `{ "errors": [{ "message": "Invalid email or password" }] }`

### `POST /api/users/logout`
Menghapus cookie sesi.

### `GET /api/users/me`
Mengembalikan user yang sedang login (untuk cek role di client component kalau perlu).

> Rate limit khusus endpoint ini — lihat `docs/SECURITY.md#rate-limiting` untuk cegah brute force.

## 2. Posts (blog)

### `GET /api/posts`
Query params: `where[_status][equals]=published`, `where[category][equals]=<id>`, `limit`, `page`, `sort=-publishedAt`
Response: daftar post **hanya yang `published`** untuk request tanpa auth (Author juga melihat draft miliknya sendiri) (access control otomatis dari `docs/DATABASE.md`).

### `GET /api/posts/:id` atau by slug via query `where[slug][equals]=<slug>`
Response: detail satu post beserta relasi (`coverImage`, `category`, `author`) ter-populate.

### `POST /api/posts` — hanya untuk user login (Author/Editor/Admin)
Body sesuai schema `Posts` di `docs/DATABASE.md`. Author yang submit otomatis `status: draft` (dipaksa oleh access control, bukan trust dari client).

### `PATCH /api/posts/:id` — update, tunduk pada access control per role.

### `DELETE /api/posts/:id` — Editor/Admin saja.

## 3. Categories & Media

### `GET /api/categories` — publik.
### `GET /api/media/:id` — publik (untuk render gambar).
### `POST /api/media` — user login saja, multipart/form-data, validasi tipe & ukuran file (lihat `SECURITY.md`).

## 4. Pages (konten semi-statis)

### `GET /api/pages?where[slug][equals]=about`
### `PATCH /api/pages/:id` — Admin/Editor saja.

## 5. Form publik (contact & membership)

### `POST /api/contact-submissions`
Body: `{ "name": string, "email": string, "subject"?: string, "message": string, "website"?: "" }` — `website` adalah honeypot, **harus kosong**.
- Create diizinkan tanpa auth (access control: `create: () => true`, tapi `read/update` tetap terbatas Admin/Editor).
- Validasi server-side oleh Payload; honeypot + rate limit 5 request/jam/IP di hook `beforeValidate` (`src/hooks/anti-spam.ts`) → `400`/`429`.
- Setelah create sukses → trigger email notifikasi ke pengurus (lewat hook `afterChange`).

### `POST /api/membership-inquiries`
Body sesuai schema `MembershipInquiries`. Behaviour sama seperti contact-submissions.

## 6. Format error standar

Semua error Payload mengikuti format:

```json
{
  "errors": [
    { "message": "Deskripsi error", "field": "email" }
  ]
}
```

Frontend harus selalu handle bentuk ini secara konsisten (satu helper `parseApiError()` di `lib/utils.ts`), jangan re-implement parsing error di tiap form.

## 7. GraphQL

**Dimatikan** (`graphQL.disable: true` di `payload.config.ts`) — tidak ada kebutuhan query kompleks, dan mematikannya memperkecil permukaan serangan. Aktifkan kembali hanya kalau ada integrasi yang memang membutuhkannya.

## 7b. Preview draft (internal)

`GET /preview?path=/blog/<slug>` — hanya untuk user yang sudah login ke `/admin` (dicek lewat `payload.auth`). Mengaktifkan Next.js *draft mode* lalu redirect ke `path`. `GET /preview?exit=1&path=...` mematikannya. Tombol **Preview** di editor artikel memanggil URL ini.

## 8. Revalidation webhook (internal, bukan public API)

Hook `afterChange` pada collection `Posts` dan `Pages` memanggil `revalidatePath()` Next.js secara internal (bukan lewat HTTP publik) saat konten berubah — supaya ISR cache selalu fresh tanpa redeploy.
