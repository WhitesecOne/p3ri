import type { Metadata } from 'next'
import { ADDRESS, FAQ_HOME, GLOSSARY, LEGAL } from '@/lib/content'
import { mediaUrl } from '@/lib/media'
import { SITE_URL } from '@/lib/utils'
import type { Event, Post, Setting } from '@/payload-types'

export const SITE_NAME = 'P3RI'
export const ORG_NAME = 'Perkumpulan Profesi Pengelola Rekod Indonesia'
export const SITE_TITLE = `${SITE_NAME} — ${ORG_NAME}`
export const SITE_DESCRIPTION =
  'Organisasi profesi resmi pengelola rekod dan arsip di Indonesia, berbadan hukum sejak 2017. Pengembangan kompetensi, standar profesi, advokasi, dan jejaring bagi praktisi, akademisi, dan pemerhati.'
export const ORG_ID = `${SITE_URL}/#organization`
export const KNOWS_ABOUT = [
  'Manajemen rekod',
  'Kearsipan',
  'Tata kelola informasi',
  'Arsip dinamis dan arsip statis',
  'Jadwal retensi arsip',
  'ISO 15489',
  'UU No. 43 Tahun 2009 tentang Kearsipan',
  'Pelindungan data pribadi',
  'Preservasi digital',
]

const abs = (path: string) => `${SITE_URL}${path}`

/** Metadata standar per halaman: canonical + Open Graph + Twitter. OG image datang dari file opengraph-image.tsx di segmen rute. */
export function pageMetadata({ title, description, path, type = 'website' }: { title: string; description: string; path: string; type?: 'website' | 'article' }): Metadata {
  const url = abs(path)
  const fullTitle = path === '/' ? SITE_TITLE : `${title} · ${SITE_NAME}`
  return {
    title: path === '/' ? { absolute: SITE_TITLE } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type, url, title: fullTitle, description, siteName: ORG_NAME, locale: 'id_ID' },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}

export function organizationLd(s: Setting) {
  const c = s.contactInfo
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: SITE_NAME,
    legalName: ORG_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: abs(mediaUrl(s.logo) ?? '/logo-p3ri.png') },
    image: abs('/opengraph-image'),
    description: SITE_DESCRIPTION,
    foundingDate: '2017-10-09',
    foundingLocation: { '@type': 'Place', name: 'Jakarta, Indonesia' },
    identifier: { '@type': 'PropertyValue', propertyID: 'Nomor pengesahan badan hukum Kemenkumham RI', value: LEGAL.number },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.lines.slice(0, 2).join(', '),
      addressLocality: ADDRESS.lines[2],
      addressRegion: 'DKI Jakarta',
      postalCode: ADDRESS.postalCode,
      addressCountry: 'ID',
    },
    ...(c?.email ? { email: c.email } : {}),
    ...(c?.phone ? { telephone: c.phone } : {}),
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sekretariat', ...(c?.email ? { email: c.email } : {}), availableLanguage: ['id'], url: abs('/contact') }],
    sameAs: [s.socialLinks?.instagram, s.socialLinks?.youtube].filter(Boolean),
    knowsAbout: KNOWS_ABOUT,
    areaServed: { '@type': 'Country', name: 'Indonesia' },
  }
}

export const websiteLd = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ORG_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'id-ID',
  publisher: { '@id': ORG_ID },
})

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Beranda', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

export const faqLd = (items: readonly { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export const webPageLd = ({ path, name, description, type = 'WebPage' }: { path: string; name: string; description: string; type?: string }) => ({
  '@type': type,
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  inLanguage: 'id-ID',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': ORG_ID },
})

export function articleLd(post: Post) {
  const author = typeof post.author === 'object' ? post.author : null
  const category = typeof post.category === 'object' ? post.category : null
  const image = mediaUrl(post.coverImage, 'og') ?? mediaUrl(post.coverImage)
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(`/blog/${post.slug}`)}#article`,
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    ...(image ? { image: abs(image) } : {}),
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: author ? { '@type': 'Person', name: author.name } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(category ? { articleSection: category.name } : {}),
    ...(post.tags?.length ? { keywords: post.tags.map((t) => t.tag).join(', ') } : {}),
    inLanguage: 'id-ID',
  }
}

const MODE_LD: Record<string, string> = {
  daring: 'https://schema.org/OnlineEventAttendanceMode',
  luring: 'https://schema.org/OfflineEventAttendanceMode',
  hibrid: 'https://schema.org/MixedEventAttendanceMode',
}

export const eventLd = (e: Event) => ({
  '@type': 'Event',
  name: e.title,
  description: e.description,
  startDate: e.startDate,
  ...(e.endDate ? { endDate: e.endDate } : {}),
  eventAttendanceMode: MODE_LD[e.mode],
  eventStatus: 'https://schema.org/EventScheduled',
  location:
    e.mode === 'daring'
      ? { '@type': 'VirtualLocation', url: e.registrationUrl || abs('/program#agenda'), name: e.location || 'Daring' }
      : { '@type': 'Place', name: e.location || 'Jakarta', address: { '@type': 'PostalAddress', addressCountry: 'ID' } },
  organizer: { '@id': ORG_ID },
  url: e.registrationUrl || abs('/program#agenda'),
  ...(e.speakers?.length ? { performer: e.speakers.map((s) => ({ '@type': 'Person', name: s.name })) } : {}),
  ...(mediaUrl(e.coverImage) ? { image: abs(mediaUrl(e.coverImage)!) } : {}),
  inLanguage: 'id-ID',
})

export const glossaryLd = () => ({
  '@type': 'DefinedTermSet',
  '@id': `${abs('/sumber-daya')}#glosarium`,
  name: 'Glosarium kearsipan dan manajemen rekod',
  inLanguage: 'id-ID',
  hasDefinedTerm: GLOSSARY.map((g) => ({ '@type': 'DefinedTerm', name: g.term, description: g.definition, inDefinedTermSet: `${abs('/sumber-daya')}#glosarium` })),
})

export const homeFaqLd = () => faqLd(FAQ_HOME)

/** Bungkus beberapa node schema.org dalam satu @graph. */
export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })
