import { ArrowUpRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { PHOTOS } from '@/assets/images'
import { Career } from '@/components/blocks/career'
import { KeyDates } from '@/components/blocks/key-dates'
import { Milestones } from '@/components/blocks/milestones'
import { Myths } from '@/components/blocks/myths'
import { PageHeader, Section, SectionHeading } from '@/components/blocks/section'
import { SelfCheck } from '@/components/blocks/self-check'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/json-ld'
import { GLOSSARY, ORGANIZATIONS, REGULATIONS, SECURITY_PRACTICES, STANDARDS } from '@/lib/content'
import { breadcrumbLd, glossaryLd, graph, pageMetadata, webPageLd } from '@/lib/seo'

const DESC = 'Kurasi regulasi kearsipan Indonesia, standar internasional, keamanan informasi arsip, tonggak sejarah, mitos & fakta, cek cepat tata kelola rekod, glosarium, hari penting, dan lembaga rujukan.'
export const metadata: Metadata = pageMetadata({ title: 'Sumber Daya', description: DESC, path: '/sumber-daya' })

function RefList({ items }: { items: readonly { label: string; title: string; summary: string; href: string }[] }) {
  return (
    <Stagger className="border-t">
      {items.map((r) => (
        <StaggerItem key={r.label}>
          <a href={r.href} target="_blank" rel="noreferrer" className="group grid gap-2 border-b py-6 transition-colors hover:bg-muted/60 md:grid-cols-12 md:gap-6 md:px-4">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase md:col-span-3">{r.label}</p>
            <div className="md:col-span-8">
              <h3 className="font-heading text-2xl font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
            </div>
            <span className="hidden text-muted-foreground transition-colors group-hover:text-foreground md:col-span-1 md:block md:justify-self-end">
              <ArrowUpRightIcon className="size-5" aria-hidden />
              <span className="sr-only">Buka sumber resmi</span>
            </span>
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/sumber-daya', name: 'Sumber Daya Kearsipan', description: DESC, type: 'CollectionPage' }), breadcrumbLd([{ name: 'Sumber Daya', path: '/sumber-daya' }]), glossaryLd())} />
      <PageHeader
        eyebrow="Sumber daya"
        title="Regulasi, standar, dan istilah yang perlu dikuasai pengelola rekod."
        description="Kurasi pengantar dari P3RI dengan tautan ke sumber resmi. Bukan nasihat hukum — selalu rujuk teks peraturan dan standar aslinya."
        aside={
          <nav aria-label="Daftar isi" className="rounded-lg border bg-card p-5 text-sm">
            <p className="eyebrow mb-3">Di halaman ini</p>
            <ul className="flex flex-col gap-2">
              {[['#regulasi', 'Regulasi Indonesia'], ['#standar', 'Standar internasional'], ['#keamanan', 'Keamanan informasi arsip'], ['#tonggak', 'Tonggak sejarah'], ['#mitos', 'Mitos & fakta'], ['#cek-cepat', 'Cek cepat tata kelola'], ['#glosarium', 'Glosarium'], ['#karier', 'Jalur karier'], ['#lsp-p3', 'Mengenal LSP P3'], ['#hari-penting', 'Hari penting'], ['#lembaga', 'Lembaga rujukan']].map(([h, l]) => (
                <li key={h}><a href={h} className="link-underline font-medium">{l}</a></li>
              ))}
            </ul>
          </nav>
        }
      />

      <Section id="regulasi" className="scroll-mt-20">
        <SectionHeading number="01" eyebrow="Regulasi Indonesia" title="Kerangka hukum kearsipan dan informasi" description="Peraturan yang paling sering bersinggungan dengan pekerjaan pengelola rekod di sektor publik maupun swasta." />
        <RefList items={REGULATIONS} />
      </Section>

      <Section id="standar" tone="muted" className="scroll-mt-20">
        <SectionHeading number="02" eyebrow="Standar internasional" title="Rujukan praktik profesi" description="Standar ISO yang menjadi bahasa bersama pengelola rekod di seluruh dunia." />
        <RefList items={STANDARDS} />
      </Section>

      <Section id="keamanan" className="scroll-mt-20">
        <SectionHeading number="03" eyebrow="Keamanan informasi arsip" title="Melindungi rekod fisik dan digital" description="Prinsip dasarnya sama: kendalikan akses, jaga keutuhan, pastikan ketersediaan — sepanjang daur hidup rekod." />
        <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
          {([['Arsip fisik', SECURITY_PRACTICES.fisik, 'bg-brand-red', PHOTOS.berkas], ['Arsip digital', SECURITY_PRACTICES.digital, 'bg-brand-green', PHOTOS.pusatData]] as const).map(([title, items, dot, photo]) => (
            <StaggerItem key={title} className="bg-card p-8">
              <div className="relative -mx-8 -mt-8 mb-8 aspect-[16/9] overflow-hidden bg-muted">
                <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <span className={`block size-2.5 rounded-full ${dot}`} aria-hidden />
              <h3 className="mt-5 font-heading text-3xl font-semibold">{title}</h3>
              <ol className="mt-6 flex flex-col gap-4">
                {items.map((it, i) => (
                  <li key={it} className="flex gap-4">
                    <span className="font-heading text-xl text-muted-foreground font-medium tabular-nums">0{i + 1}</span>
                    <p className="leading-relaxed">{it}</p>
                  </li>
                ))}
              </ol>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Milestones number="04" tone="muted" />
      <Myths number="05" />

      <Section id="cek-cepat" tone="muted" className="scroll-mt-20">
        <SectionHeading number="06" eyebrow="Cek cepat" title="Seberapa sehat tata kelola rekod organisasi Anda?" description="Delapan pernyataan, dua menit. Jawaban tidak disimpan — ini alat refleksi, bukan audit." />
        <SelfCheck />
      </Section>

      <Section id="glosarium" className="scroll-mt-20">
        <SectionHeading number="07" eyebrow="Glosarium" title="Istilah kunci" />
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="bg-card p-6">
                <dt className="font-heading text-2xl font-semibold">{g.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Career number="08" tone="muted" />
      <KeyDates number="09" />

      <Section id="lembaga" tone="muted" className="scroll-mt-20">
        <SectionHeading number="10" eyebrow="Lembaga rujukan" title="Organisasi yang perlu diikuti" />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {ORGANIZATIONS.map((o) => (
            <StaggerItem key={o.name}>
              <a href={o.href} target="_blank" rel="noreferrer" className="group flex h-full items-start justify-between gap-4 rounded-lg border bg-card p-6 transition-colors hover:border-foreground/30">
                <span>
                  <span className="block font-heading text-2xl font-semibold">{o.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{o.role}</span>
                </span>
                <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
