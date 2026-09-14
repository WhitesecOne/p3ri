import { ArrowRightIcon, ShieldCheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PHOTOS } from '@/assets/images'
import { Eyebrow } from '@/components/blocks/brand'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { COLOR_CLASS, FIELDS, LEGAL, STATS } from '@/lib/content'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
        <Reveal className="lg:col-span-7">
          <Eyebrow>Organisasi profesi · Berbadan hukum sejak 2017</Eyebrow>
          <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Wadah profesi pengelola rekod dan arsip <span className="text-primary">Indonesia</span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            P3RI menghimpun praktisi, akademisi, dan pemerhati untuk memajukan standar, kompetensi, dan tata kelola rekod — agar informasi organisasi dapat dipercaya dan dipertanggungjawabkan.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/membership#daftar">
                Daftar keanggotaan
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/about">Kenali P3RI</Link>
            </Button>
          </div>
          <p className="mt-10 flex items-start gap-2.5 text-sm text-muted-foreground">
            <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
            <span>
              Disahkan {LEGAL.authorityShort}, {LEGAL.date} · <span className="font-mono text-xs">{LEGAL.number}</span>
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md pb-10 pl-10 sm:pb-14 sm:pl-14 lg:max-w-none">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-2xl shadow-ink/15">
              <Image src={PHOTOS.gudangBoks.src} alt={PHOTOS.gudangBoks.alt} fill priority placeholder="blur" sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
              <figcaption className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">Arsip fisik</figcaption>
            </figure>
            <figure className="absolute bottom-0 left-0 w-[46%] overflow-hidden rounded-lg border-4 border-background bg-muted shadow-xl shadow-ink/20">
              <div className="relative aspect-square">
                <Image src={PHOTOS.pusatData.src} alt={PHOTOS.pusatData.alt} fill placeholder="blur" sizes="(min-width: 1024px) 220px, 42vw" className="object-cover" />
              </div>
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">Arsip digital</figcaption>
            </figure>
            <div className="absolute top-6 -right-3 grid size-20 place-items-center rounded-full border bg-background shadow-lg sm:size-24 lg:-right-6">
              <Image src="/logo-mark.png" alt="Tiga cincin logo P3RI: informasi, rekod, dan kearsipan" width={1147} height={1147} sizes="96px" className="size-14 object-contain sm:size-16" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-y bg-muted">
        <div className="container-site grid md:grid-cols-3">
          {FIELDS.map((f, i) => (
            <div key={f.name} className="flex gap-4 border-b py-6 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:border-r-0">
              <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${COLOR_CLASS[f.color]}`} aria-hidden />
              <div>
                <p className="flex items-baseline gap-2 font-heading text-xl font-semibold">
                  <span className="font-sans text-xs tracking-widest text-muted-foreground">0{i + 1}</span>
                  {f.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <dl className="container-site grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="border-l pl-4 odd:border-l-0 odd:pl-0 md:pl-6 md:odd:border-l md:odd:pl-6 md:first:border-l-0 md:first:pl-0">
            <dd className="font-heading text-4xl font-semibold md:text-5xl">{s.value}</dd>
            <dt className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
