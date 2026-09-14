import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/blocks/article-card'
import { BrandStripe, Eyebrow } from '@/components/blocks/brand'
import { ShareLinks } from '@/components/blocks/share-links'
import { JsonLd } from '@/components/json-ld'
import { RichText } from '@/components/rich-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { asMedia, mediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'
import { getPostBySlug, getRelatedPosts } from '@/lib/queries'
import { articleLd, breadcrumbLd, graph } from '@/lib/seo'
import { formatDate, readingTime, SITE_URL } from '@/lib/utils'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', limit: 200, pagination: false, select: { slug: true }, where: { _status: { equals: 'published' } } })
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const og = mediaUrl(post.coverImage, 'og')
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: typeof post.author === 'object' ? [post.author.name] : undefined,
      section: typeof post.category === 'object' ? post.category.name : undefined,
      tags: post.tags?.map((t) => t.tag),
      images: og ? [{ url: og, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt, images: og ? [og] : undefined },
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const post = await getPostBySlug(slug, isDraft)
  if (!post) notFound()
  const related = await getRelatedPosts(post)
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const minutes = readingTime(post.content)

  const cover = asMedia(post.coverImage)
  const coverSrc = mediaUrl(post.coverImage)
  const category = typeof post.category === 'object' ? post.category : null
  const author = typeof post.author === 'object' ? post.author : null
  const avatar = author ? mediaUrl(author.avatar, 'thumbnail') : null
  const initials = (author?.name ?? 'P3RI').split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()

  return (
    <article>
      {!isDraft && <JsonLd data={graph(articleLd(post), breadcrumbLd([{ name: 'Artikel', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]))} />}
      {isDraft && (
        <div className="bg-warning px-4 py-2 text-center text-sm font-medium text-white">
          Mode pratinjau — {post._status === 'draft' ? 'draft belum dipublikasikan' : 'versi terbaru'}.{' '}
          <Link href={`/preview?exit=1&path=/blog/${post.slug}`} className="underline underline-offset-4">Keluar pratinjau</Link>
        </div>
      )}
      <header className="relative border-b bg-muted">
        <div className="container-site max-w-4xl py-14 md:py-20">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Beranda</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link href="/blog">Artikel</Link></BreadcrumbLink></BreadcrumbItem>
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>{category.name}</BreadcrumbPage></BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          {category && (
            <Eyebrow>
              <Link href={`/blog?kategori=${category.slug}`} className="text-primary hover:underline">{category.name}</Link>
            </Eyebrow>
          )}
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold text-balance md:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {author && (
              <span className="flex items-center gap-2.5">
                <Avatar className="size-8">
                  {avatar && <AvatarImage src={avatar} alt="" />}
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{author.name}</span>
              </span>
            )}
            <time dateTime={post.publishedAt ?? undefined} className="text-muted-foreground">{formatDate(post.publishedAt) || 'Belum dipublikasikan'}</time>
            <span className="text-muted-foreground">{minutes} menit baca</span>
          </div>
        </div>
        <BrandStripe className="absolute inset-x-0 bottom-0 h-0.5" />
      </header>

      <div className="container-site max-w-4xl py-12 md:py-16">
        {coverSrc && (
          <figure className="relative mb-12 aspect-[16/9] overflow-hidden rounded-md bg-muted">
            <Image src={coverSrc} alt={cover?.alt ?? ''} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          </figure>
        )}
        <div className="mx-auto max-w-3xl">
          <RichText data={post.content} className="prose-lg" />
          <div className="mt-12 flex flex-col gap-6 border-t pt-8">
            {post.tags && post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Tag">
                {post.tags.map((t) => (
                  <li key={t.id ?? t.tag}><Badge variant="outline">{t.tag}</Badge></li>
                ))}
              </ul>
            )}
            <ShareLinks url={postUrl} title={post.title} />
            {post.updatedAt && post.publishedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) && (
              <p className="text-xs text-muted-foreground">Diperbarui {formatDate(post.updatedAt)}</p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t bg-muted">
          <div className="container-site py-14 md:py-20">
            <p className="eyebrow">Artikel terkait</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ArticleCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
