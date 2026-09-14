import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { SITE_URL } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', limit: 1000, pagination: false, select: { slug: true, updatedAt: true }, where: { _status: { equals: 'published' } }, sort: '-publishedAt' })
  const staticPages = ['', '/about', '/program', '/membership', '/blog', '/sumber-daya', '/contact', '/privasi'].map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : p === '/privasi' ? 0.3 : 0.7, lastModified: new Date() }))
  return [
    ...staticPages,
    ...docs.map((d) => ({ url: `${SITE_URL}/blog/${d.slug}`, lastModified: d.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
