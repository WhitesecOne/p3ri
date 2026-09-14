import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Bergabung dengan profesi yang menjaga informasi. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Keanggotaan', title: 'Bergabung dengan profesi yang menjaga informasi.', description: 'Praktisi, Akademisi, Pemerhati, Anggota Kehormatan. Periode dua tahun.' })
}
