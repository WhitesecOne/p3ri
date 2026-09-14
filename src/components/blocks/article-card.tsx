import Image from 'next/image'
import Link from 'next/link'
import { asMedia, mediaUrl } from '@/lib/media'
import { cn, formatDate } from '@/lib/utils'
import type { Post } from '@/payload-types'

export function ArticleCard({ post, priority = false, featured = false }: { post: Post; priority?: boolean; featured?: boolean }) {
  const cover = asMedia(post.coverImage)
  const src = mediaUrl(post.coverImage, featured ? undefined : 'card')
  const category = typeof post.category === 'object' ? post.category : null
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn('group flex h-full flex-col rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none', featured && 'lg:grid lg:grid-cols-12 lg:gap-8')}
    >
      <div className={cn('relative overflow-hidden rounded-md bg-muted', featured ? 'aspect-[16/10] lg:col-span-7' : 'aspect-[3/2]')}>
        {src && (
          <Image
            src={src}
            alt={cover?.alt ?? ''}
            fill
            priority={priority}
            sizes={featured ? '(min-width: 1024px) 720px, 100vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={cn('flex flex-col pt-5', featured && 'lg:col-span-5 lg:justify-center lg:pt-0')}>
        <div className="flex items-center gap-3 text-xs">
          {category && <span className="font-semibold tracking-widest text-primary uppercase">{category.name}</span>}
          <time dateTime={post.publishedAt ?? undefined} className="text-muted-foreground">{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className={cn('mt-3 font-heading font-semibold text-balance transition-colors group-hover:text-primary', featured ? 'text-3xl md:text-4xl' : 'text-2xl')}>{post.title}</h3>
        <p className={cn('mt-3 leading-relaxed text-muted-foreground', featured ? 'line-clamp-4' : 'line-clamp-3 text-sm')}>{post.excerpt}</p>
      </div>
    </Link>
  )
}
