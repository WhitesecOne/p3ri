import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Regulasi, standar, dan istilah yang perlu dikuasai pengelola rekod. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Sumber daya', title: 'Regulasi, standar, dan istilah yang perlu dikuasai pengelola rekod.', description: 'Kurasi dengan tautan ke sumber resmi: UU Kearsipan, UU PDP, ISO 15489, dan lainnya.' })
}
