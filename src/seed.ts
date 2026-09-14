/**
 * Seed konten awal untuk dev/staging. Jalankan: `pnpm seed`
 * Idempoten: dokumen yang sudah ada dilewati. Tidak mengimpor artikel — konten artikel ditulis pengelola lewat /admin.
 */
import config from '@payload-config'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { slugify } from './fields/slug'

const ctx = { disableRevalidate: true }

const ABOUT_HTML = `
<p>Gagasan pembentukan Perkumpulan Profesi Pengelola Rekod Indonesia (P3RI) bermula dari pertemuan sejumlah praktisi dan akademisi bidang pengelolaan rekod pada 19 Juli 2017 di Jakarta. Dalam pertemuan yang difasilitasi oleh Kantor Arsip Universitas Indonesia tersebut, para peserta memaparkan tantangan yang dihadapi profesi pengelola rekod di Indonesia dan menyepakati perlunya sebuah wadah organisasi profesi.</p>
<p>Pada 9 Oktober 2017, Pemerintah Republik Indonesia melalui Menteri Hukum dan Hak Asasi Manusia mengesahkan pendirian badan hukum P3RI dengan Nomor AHU-0014361.AH.01.07 Tahun 2017. Sejak saat itu P3RI menjalankan program pengembangan kompetensi, advokasi, dan jejaring bersama kampus, lembaga, dan komunitas profesi di berbagai daerah.</p>
`

const MEMBERSHIP_HTML = `
<p><strong>Catatan:</strong> Anggota Kehormatan tidak melalui pendaftaran umum — ditetapkan langsung oleh pengurus. Pertanyaan seputar keanggotaan dapat disampaikan melalui halaman <a href="/contact">Kontak</a>.</p>
`

const CATEGORIES: [string, string][] = [
  ['Kegiatan', 'Rekap dan dokumentasi Coffee Talk, Klinik, Workshop, dan Seminar P3RI.'],
  ['Artikel', 'Tulisan mendalam praktisi dan akademisi tentang pengelolaan rekod, arsip, dan informasi.'],
  ['Berita', 'Kabar organisasi, kemitraan, dan perkembangan profesi pengelola rekod di Indonesia.'],
  ['Regulasi', 'Ulasan peraturan dan kebijakan kearsipan, pelindungan data, dan tata kelola informasi.'],
  ['Wawasan Profesi', 'Karier, kompetensi, dan praktik terbaik bagi pengelola rekod.'],
  ['Pengumuman', 'Informasi resmi pengurus untuk anggota dan publik.'],
]

async function toLexical(html: string) {
  const editorConfig = await editorConfigFactory.default({ config: await config })
  return convertHTMLToLexical({ editorConfig, html, JSDOM })
}

async function ensureAdmin(payload: Payload) {
  const existing = await payload.find({ collection: 'users', limit: 1, where: { role: { equals: 'admin' } } })
  if (existing.docs[0]) return existing.docs[0]
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'AdminP3RI-2026!'
  const user = await payload.create({ collection: 'users', data: { name: 'Admin P3RI', email: 'admin@p3ri.or.id', password, role: 'admin' } })
  payload.logger.info(`Admin dibuat: admin@p3ri.or.id / ${password} — segera ganti setelah login.`)
  return user
}

async function seed() {
  const payload = await getPayload({ config })
  const admin = await ensureAdmin(payload)

  let logoId: number | undefined
  const existingLogo = await payload.find({ collection: 'media', limit: 1, where: { alt: { equals: 'Logo P3RI' } } })
  if (existingLogo.docs[0]) logoId = existingLogo.docs[0].id
  else {
    const logo = await payload.create({ collection: 'media', data: { alt: 'Logo P3RI' }, filePath: path.resolve(process.cwd(), 'public/logo-p3ri.png'), user: admin })
    logoId = logo.id
  }

  await payload.updateGlobal({
    slug: 'settings',
    context: ctx,
    data: {
      siteName: 'P3RI',
      tagline: 'Perkumpulan Profesi Pengelola Rekod Indonesia',
      logo: logoId,
      contactInfo: {
        address: 'Arkadia Green Park, Tower G, Level 8\nJl. TB Simatupang Kav. 88, Kebagusan, Pasar Minggu\nJakarta Selatan, DKI Jakarta 12520',
        email: 'p3ri.indonesia@gmail.com',
        phone: '+62 816 744 953',
      },
      socialLinks: { instagram: 'https://www.instagram.com/id_p3ri/', youtube: 'https://www.youtube.com/@id_p3ri' },
      footerText: 'Organisasi profesi resmi pengelola rekod dan arsip di Indonesia — pengembangan kompetensi, standar profesi, advokasi, dan jejaring.',
    },
  })

  for (const [name, description] of CATEGORIES) {
    const slug = slugify(name)
    const found = await payload.find({ collection: 'categories', limit: 1, where: { slug: { equals: slug } } })
    if (!found.docs[0]) await payload.create({ collection: 'categories', data: { name, slug, description } })
    else if (!found.docs[0].description) await payload.update({ collection: 'categories', id: found.docs[0].id, data: { description } })
  }

  for (const [slug, title, html] of [
    ['about', 'Tentang P3RI', ABOUT_HTML],
    ['membership', 'Keanggotaan P3RI', MEMBERSHIP_HTML],
  ] as const) {
    const found = await payload.find({ collection: 'pages', limit: 1, where: { slug: { equals: slug } } })
    const content = await toLexical(html)
    if (found.docs[0]) await payload.update({ collection: 'pages', id: found.docs[0].id, context: ctx, data: { title, content, _status: 'published' } })
    else await payload.create({ collection: 'pages', context: ctx, data: { title, slug, content, _status: 'published' } })
    payload.logger.info(`Halaman ${slug} siap`)
  }

  payload.logger.info('Seed selesai.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
