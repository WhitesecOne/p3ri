import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'

// Semua query publik memakai Local API (docs/ARCHITECTURE.md §4). Local API melewati access control,
// jadi filter `_status: published` ditulis eksplisit di sini.
export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', depth: 1 })
})

export const getCategories = cache(async () => {
  const payload = await getPayloadClient()
  return (await payload.find({ collection: 'categories', limit: 50, sort: 'name', pagination: false })).docs
})

export async function getPublishedPosts(opts: { limit?: number; page?: number; categoryId?: number } = {}) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    depth: 2,
    limit: opts.limit ?? 9,
    page: opts.page ?? 1,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
      ...(opts.categoryId ? { category: { equals: opts.categoryId } } : {}),
    },
  })
}

export async function getPostBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    draft,
    where: { slug: { equals: slug }, ...(draft ? {} : { _status: { equals: 'published' } }) },
  })
  return res.docs[0] ?? null
}

export async function getPage(slug: 'about' | 'membership', draft = false) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    draft,
    where: { slug: { equals: slug }, ...(draft ? {} : { _status: { equals: 'published' } }) },
  })
  return res.docs[0] ?? null
}

export async function getUpcomingEvents(limit = 4) {
  const payload = await getPayloadClient()
  return (
    await payload.find({
      collection: 'events',
      depth: 1,
      limit,
      sort: 'startDate',
      where: { _status: { equals: 'published' }, startDate: { greater_than_equal: new Date().toISOString() } },
    })
  ).docs
}

export async function getPastEvents(limit = 6) {
  const payload = await getPayloadClient()
  return (
    await payload.find({
      collection: 'events',
      depth: 1,
      limit,
      sort: '-startDate',
      where: { _status: { equals: 'published' }, startDate: { less_than: new Date().toISOString() } },
    })
  ).docs
}

export const getBoardMembers = cache(async () => {
  const payload = await getPayloadClient()
  return (await payload.find({ collection: 'board-members', depth: 1, limit: 100, pagination: false, sort: 'order' })).docs
})

export async function getRelatedPosts(post: { id: number; category: number | { id: number } }, limit = 3) {
  const payload = await getPayloadClient()
  const categoryId = typeof post.category === 'object' ? post.category.id : post.category
  const res = await payload.find({
    collection: 'posts',
    depth: 2,
    limit,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' }, id: { not_equals: post.id }, category: { equals: categoryId } },
  })
  return res.docs
}
