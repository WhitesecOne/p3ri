import { ADDRESS } from '@/lib/content'
import type { Setting } from '@/payload-types'

export const SITE_DEFAULTS: Setting = {
  id: 0,
  siteName: 'P3RI',
  tagline: 'Perkumpulan Profesi Pengelola Rekod Indonesia',
  contactInfo: {
    address: ADDRESS.lines.join('\n'),
    email: 'p3ri.indonesia@gmail.com',
    phone: '+62 816 744 953',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/id_p3ri/',
    youtube: 'https://www.youtube.com/@id_p3ri',
  },
  footerText: 'Organisasi profesi resmi pengelola rekod dan arsip di Indonesia — pengembangan kompetensi, standar profesi, advokasi, dan jejaring.',
}
