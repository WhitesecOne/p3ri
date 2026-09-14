import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Wawasan profesi, dari praktisi untuk praktisi. — P3RI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage({ eyebrow: 'Artikel & berita', title: 'Wawasan profesi, dari praktisi untuk praktisi.', description: 'Tulisan, berita, dan rekap kegiatan seputar rekod, arsip, dan informasi.' })
}
