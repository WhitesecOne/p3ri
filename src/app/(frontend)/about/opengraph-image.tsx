import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Organisasi profesi untuk mereka yang menjaga memori organisasi. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Tentang P3RI', title: 'Organisasi profesi untuk mereka yang menjaga memori organisasi.', description: 'Sejarah, visi, misi, nilai, filosofi logo, dan legalitas P3RI.' })
}
