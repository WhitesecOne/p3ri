import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { PageHeader } from '@/components/blocks/section'
import { Reveal } from '@/components/motion/reveal'
import { getSettings } from '@/lib/queries'
import { breadcrumbLd, graph, pageMetadata, webPageLd } from '@/lib/seo'

const TITLE = 'Kebijakan Privasi'
const DESC = 'Cara P3RI mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi pengunjung situs sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.'
const UPDATED = '6 September 2026'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: '/privasi' })

export default async function PrivacyPage() {
  const { contactInfo: c } = await getSettings()
  const email = c?.email ?? 'p3ri.indonesia@gmail.com'
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/privasi', name: TITLE, description: DESC }), breadcrumbLd([{ name: TITLE, path: '/privasi' }]))} />
      <PageHeader eyebrow="Kebijakan privasi" title="Bagaimana P3RI menjaga data Anda." description={`Berlaku sejak ${UPDATED}. Kebijakan ini menjelaskan data apa yang kami kumpulkan melalui situs ini, untuk apa, dan hak Anda atasnya.`} />
      <Reveal className="container-site max-w-3xl py-12 md:py-16">
        <div className="prose-site">
          <h2 id="data">1. Data yang kami kumpulkan</h2>
          <p>Situs ini hanya mengumpulkan data yang Anda kirimkan secara sukarela melalui dua formulir:</p>
          <ul>
            <li><strong>Formulir kontak</strong>: nama, alamat email, subjek, dan isi pesan.</li>
            <li><strong>Formulir pendaftaran keanggotaan</strong>: nama, alamat email, instansi/organisasi, jenis keanggotaan, dan pesan.</li>
          </ul>
          <p>Untuk mencegah penyalahgunaan, alamat IP pengirim dicatat sementara di memori server guna pembatasan laju pengiriman dan tidak disimpan secara permanen. Situs ini tidak memakai layanan analitik pihak ketiga maupun kuki pelacakan. Kuki hanya dipakai untuk sesi pengelola konten yang sudah masuk ke panel admin.</p>

          <h2 id="tujuan">2. Tujuan penggunaan</h2>
          <p>Data digunakan semata-mata untuk menindaklanjuti permintaan Anda: membalas pesan, memverifikasi dan memproses pendaftaran keanggotaan, serta menghubungi Anda terkait keanggotaan dan kegiatan P3RI. Kami tidak menjual atau membagikan data Anda kepada pihak ketiga untuk tujuan pemasaran.</p>

          <h2 id="akses">3. Siapa yang dapat mengakses</h2>
          <p>Data kiriman formulir hanya dapat diakses oleh pengurus P3RI dengan peran Editor atau Admin di panel pengelolaan situs. Akses dibatasi berdasarkan peran dan dilindungi kata sandi serta pembatasan percobaan masuk.</p>

          <h2 id="penyimpanan">4. Penyimpanan dan retensi</h2>
          <p>Data disimpan pada basis data yang dikelola penyedia infrastruktur awan dengan enkripsi saat transit. Kiriman formulir ditinjau secara berkala dan dihapus ketika tidak lagi diperlukan untuk tujuan di atas. Data keanggotaan disimpan selama Anda menjadi anggota dan selama diperlukan untuk kewajiban administratif organisasi.</p>

          <h2 id="hak">5. Hak Anda sebagai subjek data</h2>
          <p>Sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak memperoleh informasi, mengakses, memperbaiki, dan meminta penghapusan data pribadi Anda, serta menarik persetujuan. Kirimkan permintaan ke <a href={`mailto:${email}`}>{email}</a> dengan menyebutkan nama dan alamat email yang Anda gunakan saat mengisi formulir. Kami akan menanggapi dalam waktu yang wajar.</p>

          <h2 id="keamanan">6. Keamanan situs</h2>
          <p>Situs ini menerapkan HTTPS, header keamanan peramban, validasi masukan di sisi server, perlindungan anti-spam, dan pembatasan akses berbasis peran. Jika Anda menemukan celah keamanan, mohon laporkan secara bertanggung jawab melalui kontak yang tercantum di <a href="/.well-known/security.txt">security.txt</a>. Mohon tidak mengakses data pengguna lain selama pengujian.</p>

          <h2 id="tautan">7. Tautan ke situs lain</h2>
          <p>Halaman Sumber Daya memuat tautan ke situs resmi pihak lain (misalnya ANRI, JDIH, ISO). Kebijakan privasi situs-situs tersebut berlaku terpisah dari kebijakan ini.</p>

          <h2 id="perubahan">8. Perubahan kebijakan</h2>
          <p>Kebijakan ini dapat diperbarui sewaktu-waktu. Tanggal berlaku terbaru dicantumkan di bagian atas halaman. Pertanyaan mengenai kebijakan ini dapat disampaikan melalui halaman <Link href="/contact">Kontak</Link>.</p>
        </div>
      </Reveal>
    </>
  )
}
