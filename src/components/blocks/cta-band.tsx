import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PHOTOS } from '@/assets/images'
import { BrandStripe } from '@/components/blocks/brand'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <BrandStripe className="relative z-10" />
      <Image src={PHOTOS.rak.src} alt="" fill sizes="100vw" className="-z-10 object-cover object-[center_40%] opacity-30 grayscale" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/50" aria-hidden />
      <Reveal className="container-site grid gap-8 py-20 md:grid-cols-12 md:items-end md:py-28">
        <div className="md:col-span-8">
          <p className="eyebrow text-ink-foreground/50">Bergabung</p>
          <h2 className="mt-4 font-heading text-4xl leading-[1.1] font-semibold text-balance md:text-5xl lg:text-6xl">
            Jadilah bagian dari profesi yang terpercaya.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/70">
            Isi formulir pendaftaran — pengurus akan menghubungi Anda untuk langkah berikutnya.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Button asChild size="lg" className="bg-ink-foreground text-ink hover:bg-ink-foreground/90">
            <Link href="/membership#daftar">
              Daftar keanggotaan
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground">
            <Link href="/contact">Hubungi kami</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
