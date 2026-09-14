import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Mari berbincang tentang rekod. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Kontak', title: 'Mari berbincang tentang rekod.', description: 'Sekretariat P3RI, Arkadia Green Park Jakarta. Kerja sama, narasumber, dan media.' })
}
