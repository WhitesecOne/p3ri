import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { COLOR_CLASS, MEMBER_TYPES } from '@/lib/content'

export function MembershipTeaser({ number = '03' }: { number?: string }) {
  return (
    <Section id="keanggotaan" tone="muted">
      <SectionHeading number={number} eyebrow="Keanggotaan" title="Siapa yang bisa bergabung?" />
      <div className="grid gap-10 lg:grid-cols-12">
        <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:col-span-8">
          {MEMBER_TYPES.map((m) => (
            <StaggerItem key={m.name} className="flex flex-col bg-card p-7">
              <span className={`size-2.5 rounded-full ${COLOR_CLASS[m.color]}`} aria-hidden />
              <h3 className="mt-5 font-heading text-2xl font-semibold">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between rounded-lg border bg-card p-7">
            <dl className="flex flex-col divide-y">
              {[
                ['Periode', 'Dua tahun, dapat diperpanjang'],
                ['Syarat', 'Warga negara Indonesia'],
                ['Pendaftaran', 'Formulir daring, diverifikasi pengurus'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-3 py-4 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="col-span-2 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild size="lg" className="mt-8">
              <Link href="/membership#daftar">
                Daftar sekarang
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
