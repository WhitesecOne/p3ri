import { FileTextIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleCard } from '@/components/blocks/article-card'
import { PageHeader } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { JsonLd } from '@/components/json-ld'
import { getCategories, getPublishedPosts } from '@/lib/queries'
import { breadcrumbLd, graph, pageMetadata, webPageLd } from '@/lib/seo'
import { cn } from '@/lib/utils'

const DESC = 'Artikel, berita, dan rekap kegiatan P3RI seputar pengelolaan rekod dan arsip di Indonesia.'

type Search = { kategori?: string; page?: string }

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { kategori, page } = await searchParams
  const cat = kategori ? (await getCategories()).find((c) => c.slug === kategori) : undefined
  const base = pageMetadata({ title: cat ? `${cat.name} — Artikel & Berita` : 'Artikel & Berita', description: cat?.description || DESC, path: '/blog' })
  // Halaman berfilter/berhalaman tetap kanonik ke /blog supaya tidak ada duplikasi indeks.
  return { ...base, ...(kategori || page ? { robots: { index: false, follow: true } } : {}) }
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { kategori, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const categories = await getCategories()
  const active = kategori ? categories.find((c) => c.slug === kategori) : undefined
  const result = await getPublishedPosts({ page, categoryId: active?.id })
  const href = (p: number) => {
    const q = new URLSearchParams({ ...(kategori ? { kategori } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString()
    return q ? `/blog?${q}` : '/blog'
  }
  const [first, ...rest] = result.docs
  const showFeatured = page === 1 && first

  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/blog', name: 'Artikel & Berita P3RI', description: DESC, type: 'CollectionPage' }), breadcrumbLd([{ name: 'Artikel', path: '/blog' }]))} />
      <PageHeader
        eyebrow="Artikel & berita"
        title={active ? active.name : 'Wawasan profesi, dari praktisi untuk praktisi.'}
        description={active?.description || 'Tulisan, berita, dan rekap kegiatan seputar tata kelola rekod, arsip, dan informasi di Indonesia.'}
      />

      <div className="container-site py-12 md:py-16">
        <nav className="-mx-5 mb-12 flex gap-6 overflow-x-auto border-b px-5 md:mx-0 md:px-0" aria-label="Filter kategori">
          {[{ id: 0, name: 'Semua', slug: '' }, ...categories].map((c) => {
            const isActive = c.id === 0 ? !active : active?.id === c.id
            return (
              <Link
                key={c.id}
                href={c.slug ? `/blog?kategori=${c.slug}` : '/blog'}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  '-mb-px shrink-0 border-b-2 py-3 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors',
                  isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {c.name}
              </Link>
            )
          })}
        </nav>

        {result.docs.length === 0 ? (
          <div className="flex flex-col items-center rounded-lg border border-dashed px-6 py-20 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground" aria-hidden>
              <FileTextIcon className="size-5" />
            </span>
            <p className="mt-5 font-heading text-2xl font-semibold">Belum ada artikel{active ? ` di kategori ${active.name}` : ''}.</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">Artikel dan rekap kegiatan akan tampil di sini setelah dipublikasikan oleh pengelola.</p>
          </div>
        ) : (
          <Stagger className="flex flex-col gap-12">
            {showFeatured && (
              <StaggerItem>
                <ArticleCard post={first} featured priority />
              </StaggerItem>
            )}
            <div className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-3', showFeatured && rest.length > 0 && 'border-t pt-12')}>
              {(showFeatured ? rest : result.docs).map((p) => (
                <StaggerItem key={p.id}>
                  <ArticleCard post={p} />
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        )}

        {result.totalPages > 1 && (
          <Pagination className="mt-14">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={href(page - 1)} aria-disabled={!result.hasPrevPage} className={cn(!result.hasPrevPage && 'pointer-events-none opacity-50')} />
              </PaginationItem>
              {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink href={href(p)} isActive={p === page}>{p}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href={href(page + 1)} aria-disabled={!result.hasNextPage} className={cn(!result.hasNextPage && 'pointer-events-none opacity-50')} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  )
}
