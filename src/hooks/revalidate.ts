import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

// Dipanggil dari hook Payload (docs/API.md §8). Seed script mematikan ini lewat context.disableRevalidate.
const safeRevalidate = (paths: string[], type?: 'layout' | 'page') => {
  try {
    paths.forEach((p) => revalidatePath(p, type))
  } catch {
    // di luar request context Next (mis. `payload run`), abaikan
  }
}

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req: { context } }) => {
  if (context.disableRevalidate) return doc
  const paths = ['/', '/blog', '/sitemap.xml', `/blog/${doc.slug}`]
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) paths.push(`/blog/${previousDoc.slug}`)
  safeRevalidate(paths)
  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) safeRevalidate(['/', '/blog', '/sitemap.xml', `/blog/${doc.slug}`])
  return doc
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) safeRevalidate([`/${doc.slug}`])
  return doc
}

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) safeRevalidate(['/'], 'layout')
  return doc
}

export const revalidateEvent: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) safeRevalidate(['/', '/program'])
  return doc
}

export const revalidateBoard: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) safeRevalidate(['/about'])
  return doc
}
