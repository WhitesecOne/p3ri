import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/blocks/cta-band'
import { EventRow } from '@/components/blocks/events'
import { PageHeader, Section, SectionHeading } from '@/components/blocks/section'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { COLLAB_TYPES, PROGRAM_DETAILS } from '@/lib/content'
import { JsonLd } from '@/components/json-ld'
import { getPastEvents, getUpcomingEvents } from '@/lib/queries'
import { breadcrumbLd, eventLd, graph, pageMetadata, webPageLd } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const revalidate = 3600

const DESC = 'Coffee Talk, Klinik, Workshop, dan Seminar P3RI — format, sasaran peserta, contoh topik, cara mengikuti, dan agenda kegiatan.'
export const metadata: Metadata = pageMetadata({ title: 'Program', description: DESC, path: '/program' })

const dots = ['bg-brand-red', 'bg-brand-green', 'bg-brand-silver', 'bg-brand-amber']

export default async function ProgramPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(10), getPastEvents(6)])
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/program', name: 'Program P3RI', description: DESC }), breadcrumbLd([{ name: 'Program', path: '/program' }]), ...upcoming.map(eventLd))} />
      <PageHeader
        eyebrow="Program"
        title="Empat format, satu tujuan: profesi yang terus belajar."
        description="Setiap format dirancang untuk kebutuhan yang berbeda — dari bincang ringan hingga pendampingan kasus nyata dan forum ilmiah bersama kampus."
        aside={
          <nav aria-label="Lompat ke program" className="grid grid-cols-2 gap-2">
            {PROGRAM_DETAILS.map((p, i) => (
              <a key={p.slug} href={`#${p.slug}`} className="flex items-center gap-2 rounded-md border bg-card px-3 py-2.5 text-sm font-medium transition-colors hover:border-foreground/30">
                <span className={`size-2 rounded-full ${dots[i]}`} aria-hidden />
                {p.name}
              </a>
            ))}
          </nav>
        }
      />

      {PROGRAM_DETAILS.map((p, i) => (
        <Section key={p.slug} id={p.slug} tone={i % 2 ? 'muted' : 'default'} className="scroll-mt-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="flex items-center gap-3">
                <span className={`size-2.5 rounded-full ${dots[i]}`} aria-hidden />
                <span className="font-heading text-2xl text-muted-foreground font-medium tabular-nums">0{i + 1}</span>
              </p>
              <h2 className="mt-4 font-heading text-4xl font-semibold md:text-5xl">{p.name}</h2>
              <p className="mt-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{p.format}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            </Reveal>
            <Stagger className="grid gap-5 lg:col-span-7">
              <StaggerItem className={cn('rounded-lg border p-6', i % 2 ? 'bg-card' : 'bg-muted')}>
                <p className="eyebrow">Untuk siapa</p>
                <p className="mt-3 leading-relaxed">{p.audience}</p>
              </StaggerItem>
              <StaggerItem className={cn('rounded-lg border p-6', i % 2 ? 'bg-card' : 'bg-muted')}>
                <p className="eyebrow">Contoh topik</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.topics.map((t) => (
                    <li key={t} className="rounded-full border bg-background px-3 py-1 text-sm">{t}</li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem className={cn('rounded-lg border p-6', i % 2 ? 'bg-card' : 'bg-muted')}>
                <p className="eyebrow">Cara mengikuti</p>
                <p className="mt-3 leading-relaxed">{p.how}</p>
              </StaggerItem>
            </Stagger>
          </div>
        </Section>
      ))}

      <Section id="agenda" className="scroll-mt-20">
        <SectionHeading eyebrow="Agenda" title="Kegiatan mendatang" description="Daftar melalui tautan yang tersedia, atau tanyakan kepada pengurus bila pendaftaran belum dibuka." />
        {upcoming.length ? (
          <Stagger className="border-t">
            {upcoming.map((e) => (
              <StaggerItem key={e.id}>
                <EventRow event={e} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="rounded-lg border border-dashed px-6 py-14 text-center text-muted-foreground">Belum ada agenda yang dijadwalkan. Pantau media sosial P3RI atau hubungi pengurus untuk informasi kegiatan berikutnya.</p>
        )}
        {past.length > 0 && (
          <div className="mt-16">
            <p className="eyebrow">Kegiatan sebelumnya</p>
            <div className="mt-6 border-t">
              {past.map((e) => (
                <EventRow key={e.id} event={e} past />
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section tone="muted" id="kolaborasi">
        <SectionHeading eyebrow="Kolaborasi" title="Undang P3RI ke instansi Anda" description="Program dapat diselenggarakan khusus untuk instansi, kampus, atau komunitas." />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {COLLAB_TYPES.map((c, i) => (
            <StaggerItem key={c.title} className="flex flex-col rounded-lg border bg-card p-6">
              <span className={`size-2.5 rounded-full ${dots[i]}`} aria-hidden />
              <h3 className="mt-5 font-heading text-2xl font-semibold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <Link href={`/contact?subjek=${encodeURIComponent(`Kerja sama: ${c.title}`)}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary link-underline">
                Ajukan
                <ArrowUpRightIcon className="size-4" aria-hidden />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <Button asChild size="lg">
            <Link href="/contact?subjek=Kerja%20sama%20kegiatan">
              Hubungi pengurus
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
