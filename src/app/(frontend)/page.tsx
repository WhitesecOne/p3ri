import type { Metadata } from 'next'
import { ArchiveGallery } from '@/components/blocks/archive-gallery'
import { CtaBand } from '@/components/blocks/cta-band'
import { UpcomingEvents } from '@/components/blocks/events'
import { Faq } from '@/components/blocks/faq'
import { Hero } from '@/components/blocks/hero'
import { Insights } from '@/components/blocks/insights'
import { LatestArticles } from '@/components/blocks/latest-articles'
import { Lifecycle } from '@/components/blocks/lifecycle'
import { MembershipTeaser } from '@/components/blocks/membership-teaser'
import { Myths } from '@/components/blocks/myths'
import { Partners } from '@/components/blocks/partners'
import { Programs } from '@/components/blocks/programs'
import { RolesBento } from '@/components/blocks/roles-bento'
import { SocialChannels } from '@/components/blocks/social-channels'
import { Testimonials } from '@/components/blocks/testimonials'
import { JsonLd } from '@/components/json-ld'
import { FAQ_HOME } from '@/lib/content'
import { eventLd, faqLd, graph, pageMetadata, SITE_DESCRIPTION, webPageLd } from '@/lib/seo'
import { getPublishedPosts, getSettings, getUpcomingEvents } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = pageMetadata({ title: 'Beranda', description: SITE_DESCRIPTION, path: '/' })

export default async function HomePage() {
  const [{ docs: posts }, events, settings] = await Promise.all([getPublishedPosts({ limit: 4 }), getUpcomingEvents(3), getSettings()])
  // Nomor editorial dihitung dari section yang benar-benar tampil (agenda & artikel bisa kosong).
  let i = 0
  const n = () => String(++i).padStart(2, '0')
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/', name: 'P3RI — Perkumpulan Profesi Pengelola Rekod Indonesia', description: SITE_DESCRIPTION }), faqLd(FAQ_HOME), ...events.map(eventLd))} />
      <Hero />
      <RolesBento number={n()} />
      <Programs number={n()} />
      {events.length > 0 && <UpcomingEvents events={events} number={n()} />}
      <Insights number={n()} />
      <ArchiveGallery number={n()} />
      <Lifecycle number={n()} />
      <Myths number={n()} limit={3} tone="muted" />
      <MembershipTeaser number={n()} />
      {posts.length > 0 && <LatestArticles posts={posts} number={n()} />}
      <Testimonials number={n()} />
      <SocialChannels settings={settings} number={n()} />
      <Partners />
      <Faq items={FAQ_HOME} number={n()} />
      <CtaBand />
    </>
  )
}
