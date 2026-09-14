// Foto dekoratif situs — sumber & lisensi di CREDITS.md. Static import → next/image dapat ukuran + blur placeholder otomatis.
import arsipDigitalPita from './arsip-digital-pita.jpg'
import arsipDigitalPusatData from './arsip-digital-pusat-data.jpg'
import arsipFisikBerkas from './arsip-fisik-berkas.jpg'
import arsipFisikLemariKartu from './arsip-fisik-lemari-kartu.jpg'
import arsipNasionalAmerika from './arsip-nasional-amerika.jpg'
import bukuArsipKuno from './buku-arsip-kuno.jpg'
import bukuArsipRegister from './buku-arsip-register.jpg'
import gudangArsipBoks from './gudang-arsip-boks.jpg'
import gudangArsipDepot from './gudang-arsip-depot.jpg'
import gudangArsipRak from './gudang-arsip-rak.jpg'

export const PHOTOS = {
  gudangBoks: { src: gudangArsipBoks, alt: 'Lorong ruang arsip dengan rak kayu penuh boks arsip berlabel' },
  pusatData: { src: arsipDigitalPusatData, alt: 'Deretan kabinet penyimpanan data berwarna putih di pusat data' },
  arsipNasional: { src: arsipNasionalAmerika, alt: 'Fasad gedung National Archives Amerika Serikat di Washington, D.C.' },
  depot: { src: gudangArsipDepot, alt: 'Lorong depot arsip dengan rak baja bertingkat dan lemari peta' },
  rak: { src: gudangArsipRak, alt: 'Lorong panjang di antara rak penyimpanan berlabel nomor klasifikasi' },
  register: { src: bukuArsipRegister, alt: 'Buku register lama terbuka dengan catatan tulisan tangan' },
  bukuKuno: { src: bukuArsipKuno, alt: 'Deretan buku bersampul kulit yang menua di rak kayu' },
  berkas: { src: arsipFisikBerkas, alt: 'Tumpukan berkas arsip kertas yang diikat tali' },
  lemariKartu: { src: arsipFisikLemariKartu, alt: 'Lemari laci kartu indeks berlabel dari logam' },
  pita: { src: arsipDigitalPita, alt: 'Petugas menata gulungan pita magnetik penyimpan data di rak pusat data' },
} as const
