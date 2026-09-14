import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Empat format, satu tujuan: profesi yang terus belajar. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Program', title: 'Empat format, satu tujuan: profesi yang terus belajar.', description: 'Coffee Talk, Klinik, Workshop, dan Seminar — beserta agenda kegiatan.' })
}
