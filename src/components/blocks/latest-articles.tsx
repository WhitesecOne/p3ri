import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { ArticleCard } from '@/components/blocks/article-card'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import type { Post } from '@/payload-types'

export function LatestArticles({ posts, number = '04' }: { posts: Post[]; number?: string }) {
  if (!posts.length) return null
  const [first, ...rest] = posts
  return (
    <Section id="artikel">
      <SectionHeading
        number={number}
        eyebrow="Artikel & berita"
        title="Tulisan terbaru"
        action={
          <Button asChild variant="ghost">
            <Link href="/blog">
              Semua artikel
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        }
      />
      <Stagger className="flex flex-col gap-12">
        <StaggerItem>
          <ArticleCard post={first} featured />
        </StaggerItem>
        {rest.length > 0 && (
          <div className="grid gap-8 border-t pt-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <StaggerItem key={p.id}>
                <ArticleCard post={p} />
              </StaggerItem>
            ))}
          </div>
        )}
      </Stagger>
    </Section>
  )
}
