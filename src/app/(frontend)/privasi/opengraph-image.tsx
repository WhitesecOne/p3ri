import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Bagaimana P3RI menjaga data Anda. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Kebijakan privasi', title: 'Bagaimana P3RI menjaga data Anda.', description: 'Sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.' })
}
