import { notFound, permanentRedirect } from 'next/navigation'
import { getPostBySlug } from '@/lib/queries'

// docs/ARCHITECTURE.md §6: permalink WordPress lama berbentuk /{slug}/ — 301 ke /blog/{slug} kalau artikelnya ada.
export default async function LegacyPostRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  permanentRedirect(`/blog/${post.slug}`)
}
