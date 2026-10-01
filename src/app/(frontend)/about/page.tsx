import { ArrowRightIcon, ShieldCheckIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PHOTOS } from '@/assets/images'
import { Board } from '@/components/blocks/board'
import { Eyebrow } from '@/components/blocks/brand'
import { CtaBand } from '@/components/blocks/cta-band'
import { Partners } from '@/components/blocks/partners'
import { PageHeader, Section, SectionHeading } from '@/components/blocks/section'
import { SocialChannels } from '@/components/blocks/social-channels'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { COLOR_CLASS, FIELDS, LEGAL, MISSION, TIMELINE, VALUES, VISION } from '@/lib/content'
import { JsonLd } from '@/components/json-ld'
import { getBoardMembers, getPage, getSettings } from '@/lib/queries'
import { breadcrumbLd, graph, pageMetadata, webPageLd } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return pageMetadata({
    title: page?.seo?.title || 'Tentang P3RI',
    description: page?.seo?.description || 'Sejarah, visi, misi, nilai, filosofi logo, struktur pengurus, dan legalitas Perkumpulan Profesi Pengelola Rekod Indonesia.',
    path: '/about',
  })
}

const dots = ['bg-brand-red', 'bg-brand-green', 'bg-brand-silver', 'bg-brand-amber']

export default async function AboutPage() {
  const [page, members, settings] = await Promise.all([getPage('about'), getBoardMembers(), getSettings()])
  let i = 0
  const n = () => String(++i).padStart(2, '0')
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/about', name: 'Tentang P3RI', description: 'Sejarah, visi, misi, nilai, filosofi logo, struktur pengurus, dan legalitas P3RI.', type: 'AboutPage' }), breadcrumbLd([{ name: 'Tentang', path: '/about' }]))} />
      <PageHeader
        eyebrow="Tentang P3RI"
        title="Organisasi profesi untuk mereka yang menjaga memori organisasi."
        description="Perkumpulan Profesi Pengelola Rekod Indonesia didirikan oleh praktisi dan akademisi, disahkan negara, dan terbuka bagi seluruh warga negara Indonesia."
        aside={
          <div className="rounded-lg border bg-card p-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-green uppercase">
              <ShieldCheckIcon className="size-4" aria-hidden />
              Badan hukum resmi
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Disahkan {LEGAL.authority}, {LEGAL.date}</p>
            <p className="mt-2 font-mono text-sm break-all">{LEGAL.number}</p>
          </div>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Visi</Eyebrow>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sejak 2017, P3RI hadir sebagai wadah profesi yang mempertemukan praktisi, akademisi, regulator, dan komunitas — agar pengelolaan rekod di Indonesia setara dengan praktik terbaik dunia.
            </p>
            <div className="relative mt-8 aspect-[4/3] max-w-sm overflow-hidden rounded-lg bg-muted">
              <Image src={PHOTOS.bukuKuno.src} alt={PHOTOS.bukuKuno.alt} fill placeholder="blur" sizes="(min-width: 1024px) 384px, 90vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <p className="font-heading text-3xl leading-[1.2] font-semibold text-balance md:text-4xl lg:text-5xl">“{VISION}”</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted" id="sejarah">
        <SectionHeading number={n()} eyebrow="Sejarah" title="Dari sebuah pertemuan menjadi badan hukum" />
        <div className="grid gap-12 lg:grid-cols-12">
          <Stagger className="lg:col-span-5">
            <ol className="relative border-l">
              {TIMELINE.map((t, idx) => (
                <StaggerItem key={t.date} className="relative pb-10 pl-8 last:pb-0">
                  <span className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full ${dots[idx % 3]}`} aria-hidden />
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t.date}</p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>
          <Reveal className="lg:col-span-7">
            {page ? (
              <RichText data={page.content} />
            ) : (
              <div className="space-y-5 leading-relaxed text-muted-foreground">
                <p>Gagasan pembentukan Perkumpulan Profesi Pengelola Rekod Indonesia (P3RI) bermula dari pertemuan sejumlah praktisi dan akademisi bidang pengelolaan rekod pada 19 Juli 2017 di Jakarta. Pertemuan yang difasilitasi oleh Kantor Arsip Universitas Indonesia tersebut menyepakati perlunya sebuah wadah organisasi profesi.</p>
                <p>Pada {LEGAL.date}, {LEGAL.authority} mengesahkan pendirian badan hukum P3RI dengan Nomor {LEGAL.number}. P3RI menjalankan program pengembangan kompetensi, advokasi, dan jejaring bersama kampus, lembaga, dan komunitas profesi di berbagai daerah.</p>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      <Section id="misi">
        <SectionHeading number={n()} eyebrow="Misi" title="Empat komitmen organisasi" />
        <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
          {MISSION.map((m, idx) => (
            <StaggerItem key={m} className="flex gap-6 bg-card p-8">
              <span className="font-heading text-4xl text-brand-red/80 font-medium tabular-nums">0{idx + 1}</span>
              <p className="pt-2 text-lg leading-relaxed">{m}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted" id="nilai">
        <SectionHeading number={n()} eyebrow="Nilai & etika" title="Yang kami junjung" description="Nilai-nilai ini menjadi dasar kode etik profesi yang terus dikembangkan bersama anggota." />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, idx) => (
            <StaggerItem key={v.title} className="flex flex-col rounded-lg border bg-card p-6">
              <span className={`size-2.5 rounded-full ${dots[idx]}`} aria-hidden />
              <h3 className="mt-5 font-heading text-2xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Board members={members} number={members.length ? n() : undefined} />

      <Section tone={members.length ? 'muted' : 'default'} id="logo">
        <SectionHeading number={n()} eyebrow="Filosofi logo" title="Tiga cincin, tiga bidang keilmuan" description="Tiga temali melingkar yang saling berhubungan — informasi, rekod, dan kearsipan — adalah payung keilmuan yang menaungi seluruh aktivitas perkumpulan." />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-sm rounded-lg border bg-card p-10">
              <Image src="/logo-mark.png" alt="Cincin logo P3RI" fill sizes="384px" className="object-contain p-10" />
            </div>
          </Reveal>
          <Stagger className="flex flex-col divide-y rounded-lg border bg-card lg:col-span-7">
            {FIELDS.map((f) => (
              <StaggerItem key={f.name} className="flex gap-5 p-6">
                <span className={`mt-1.5 size-3 shrink-0 rounded-full ${COLOR_CLASS[f.color]}`} aria-hidden />
                <div>
                  <h3 className="font-heading text-2xl font-semibold">{f.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem className="p-6 text-sm leading-relaxed text-muted-foreground">
              Gradasi kuning dan biru di balik cincin melambangkan optimisme, semangat, dan dinamika yang berpadu dalam wadah yang harmonis. Huruf yang tegas dan jelas mencerminkan disiplin, kejujuran, dan tanggung jawab dalam menjalankan amanah.
            </StaggerItem>
          </Stagger>
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/membership">
              Lihat keanggotaan
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>
      </Section>

      <Partners className="py-4" />
      <SocialChannels settings={settings} number={n()} />
      <CtaBand />
    </>
  )
}
