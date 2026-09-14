# SECURITY — Requirement Keamanan

Dokumen ini bersifat wajib dipatuhi (non-negotiable), bukan sekadar rekomendasi. Ditulis mengikuti prinsip least privilege, defense in depth, dan secure by default.

## 1. RBAC — Role & permission matrix

| Aksi | Public (tanpa login) | Author | Editor | Admin |
|---|---|---|---|---|
| Baca artikel `published` | ✔ | ✔ | ✔ | ✔ |
| Baca artikel `draft` | ✘ | hanya milik sendiri | ✔ semua | ✔ semua |
| Buat artikel baru (`draft`) | ✘ | ✔ | ✔ | ✔ |
| Edit artikel | ✘ | hanya milik sendiri, hanya saat `draft` | ✔ semua | ✔ semua |
| Publish/unpublish artikel | ✘ | ✘ | ✔ | ✔ |
| Hapus artikel | ✘ | ✘ | ✔ | ✔ |
| Kelola kategori | ✘ | ✘ | ✔ | ✔ |
| Upload media | ✘ | ✔ | ✔ | ✔ |
| Edit halaman statis (`Pages`) | ✘ | ✘ | ✔ | ✔ |
| Kelola user & role | ✘ | ✘ | ✘ | ✔ |
| Kelola `Settings` (global) | ✘ | ✘ | ✘ | ✔ |
| Baca `ContactSubmissions` / `MembershipInquiries` | ✘ | ✘ | ✔ | ✔ |
| Submit form kontak/inquiry | ✔ | ✔ | ✔ | ✔ |

Implementasi: fungsi access control per collection di Payload (`access.create`, `access.read`, `access.update`, `access.delete`), **bukan** dicek manual di frontend saja — frontend hanya menyembunyikan UI, backend yang menegakkan aturan.

## 2. Autentikasi

- Payload auth bawaan: password di-hash (bcrypt), sesi via JWT httpOnly cookie (bukan localStorage — hindari XSS token theft).
- Aktifkan `maxLoginAttempts` + `lockTime` di config auth Users untuk cegah brute force.
- Policy password minimum: 10 karakter, tidak boleh sama dengan email.
- **Rekomendasi tambahan (fase 2)**: 2FA/TOTP untuk role Admin & Editor — cek plugin resmi Payload untuk ini sebelum build custom.
- Nonaktifkan self-registration publik untuk collection `Users` — user baru hanya dibuat oleh Admin dari admin panel.

## 3. Upload & media

- Validasi MIME-type di **server side** (`image/jpeg`, `image/png`, `image/webp` saja), jangan percaya ekstensi file dari client.
- Batas ukuran file (mis. 5MB per gambar).
- Strip metadata EXIF (terutama GPS) dari foto yang diupload — foto kegiatan sering diambil dari HP dan bisa membawa data lokasi tanpa disadari pengunggah.
- Nama file di-sanitize/randomize saat disimpan, jangan pakai nama file asli mentah (hindari path traversal & information disclosure).

## 4. Form publik (contact & membership inquiry)

- Validasi server-side untuk semua field (jangan andalkan validasi client saja).
- Anti-spam: honeypot field tersembunyi + rate limit per IP (mis. maksimal 5 submission/jam).
- Sanitize input sebelum disimpan/ditampilkan di admin (cegah stored XSS kalau field ditampilkan sebagai HTML — defaultnya render sebagai plain text).

## 5. Rate limiting

Terapkan di level reverse proxy/edge (bukan hanya application code) untuk endpoint sensitif. **Status saat ini**: login dilindungi `maxLoginAttempts`/`lockTime`; form publik dilindungi rate limit in-memory 5/jam/IP di aplikasi (`src/hooks/anti-spam.ts`) — pindahkan ke Vercel WAF/Upstash bila spam nyata. Endpoint:
- `POST /api/users/login` — cegah brute force credential.
- `POST /api/contact-submissions`, `POST /api/membership-inquiries` — cegah spam/flood.
- `POST /api/media` (upload) — cegah abuse storage.

## 6. Header keamanan & konfigurasi

- Content-Security-Policy, `X-Frame-Options: DENY` (atau `SAMEORIGIN` khusus untuk admin), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff` — set lewat Next.js middleware/`next.config.js` headers.
- **Nonaktifkan GraphQL Playground** (`/api/graphql-playground`) di production.
- `/.well-known/security.txt` (RFC 9116) aktif: kontak dari `SECURITY_CONTACT` atau email sekretariat, kedaluwarsa 1 tahun bergulir. Kebijakan privasi di `/privasi` memuat bagian pelaporan kerentanan.
- Admin panel (`/admin`) tetap bisa diakses publik (memang dirancang begitu oleh Payload dan diamankan oleh auth), tapi pastikan tidak ter-index search engine (`robots.txt` disallow `/admin`).

## 7. Secrets management

- Semua secret (`PAYLOAD_SECRET`, `DATABASE_URI`, credential storage, SMTP/email API key) lewat environment variables platform (Vercel env / Docker secrets) — **tidak pernah** di-commit ke git.
- `.env`, `.env.local`, `.env*.local` wajib ada di `.gitignore`.
- `PAYLOAD_SECRET` random panjang (≥32 karakter), berbeda antara development dan production.
- Rotasi credential kalau ada indikasi kebocoran (mis. commit ter-push tidak sengaja).

## 8. Dependency & supply chain

- Aktifkan Dependabot (atau alat setara) untuk auto-PR update dependency yang ada CVE.
- Jalankan `pnpm audit` sebelum setiap release/deploy signifikan.
- Review dependency baru sebelum ditambah — hindari paket dengan maintenance rendah/red flag untuk fungsi kritikal (auth, upload, payment kalau nanti ada).

## 9. Backup & disaster recovery

- Backup PostgreSQL otomatis terjadwal (harian minimal), retention minimal 30 hari.
- **Catatan implementasi**: Neon free tier hanya retain WAL history 6 jam (tidak cukup). Kalau masih di Neon free tier saat go-live, wajib tambah `pg_dump` terjadwal manual (cron/GitHub Action) ke storage terpisah sebagai gap-filler, atau upgrade ke Neon Launch (~$19/bulan) yang punya point-in-time restore lebih panjang — lihat estimasi biaya di `ARCHITECTURE.md`.
- Backup disimpan **off-site** dari server production (bukan di disk yang sama).
- **Wajib tes restore** secara berkala (bukan cuma bikin backup lalu diasumsikan aman) — dokumentasikan hasil tes restore terakhir.
- Media/storage juga masuk cakupan backup, bukan hanya database.

## 10. Audit trail & logging

- Aktifkan versioning/drafts bawaan Payload untuk `Posts` dan `Pages` — supaya histori perubahan (siapa ubah apa, kapan) tercatat dan bisa di-rollback.
- Log akses admin (login, create/update/delete konten sensitif) — minimal retention 90 hari.
- Jangan log data sensitif (password, token) dalam bentuk plain text di log aplikasi.

## 11. Kepatuhan data pribadi (UU PDP)

Form kontak & inquiry keanggotaan mengumpulkan data pribadi (nama, email, kadang organisasi) — ini tunduk pada **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)**. Implikasi teknis minimal:

- Cantumkan notice singkat di form (tujuan pengumpulan data, siapa yang bisa akses) — bukan hanya masalah UX, ini kewajiban.
- Batasi akses data submission hanya ke role yang perlu (Editor/Admin, sesuai matrix di atas).
- Punya mekanisme hapus data atas permintaan pemilik data (hak subjek data untuk penghapusan) — minimal manual lewat admin panel di fase awal.
- Jangan kirim data form ke pihak ketiga (mis. third-party analytics) tanpa consent eksplisit.

## 12. Checklist go-live (jalankan sebelum situs live ke domain production)

- [ ] Semua endpoint sensitif sudah rate-limited
- [ ] `.env` tidak ada di git history
- [ ] HTTPS/TLS aktif dan dipaksa (redirect HTTP → HTTPS)
- [ ] Backup + tes restore sudah dijalankan minimal sekali
- [x] `robots.txt` men-disallow `/admin`
- [ ] Dependency audit bersih dari critical/high CVE
- [ ] RBAC matrix di atas sudah diverifikasi lewat testing manual per role
- [ ] Redirect URL lama (lihat `ARCHITECTURE.md`) sudah diverifikasi tidak 404
