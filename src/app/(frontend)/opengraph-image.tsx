import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Wadah profesi pengelola rekod dan arsip Indonesia. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Organisasi profesi', title: 'Wadah profesi pengelola rekod dan arsip Indonesia.', description: 'Pengembangan kompetensi, standar profesi, advokasi, dan jejaring — berbadan hukum sejak 2017.' })
}
