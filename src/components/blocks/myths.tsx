import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { MYTHS } from '@/lib/content'

export function Myths({ number, limit, tone = 'default' }: { number?: string; limit?: number; tone?: 'default' | 'muted' }) {
  const items = limit ? MYTHS.slice(0, limit) : MYTHS
  return (
    <Section id="mitos" tone={tone}>
      <SectionHeading
        number={number}
        eyebrow="Mitos & fakta"
        title="Yang sering disalahpahami tentang rekod"
        description="Anggapan umum yang membuat organisasi menunda pengelolaan rekod — dan kenyataannya."
        action={limit ? (
          <Button asChild variant="ghost">
            <Link href="/sumber-daya#mitos">
              Semua mitos & fakta
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        ) : undefined}
      />
      <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <StaggerItem key={m.myth} className="flex flex-col bg-card p-7">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Mitos 0{i + 1}</p>
            <p className="mt-2 font-heading text-2xl leading-snug font-semibold text-muted-foreground line-through decoration-brand-red/60 decoration-2">{m.myth}</p>
            <p className="mt-5 text-xs font-semibold tracking-widest text-brand-green uppercase">Fakta</p>
            <p className="mt-2 text-sm leading-relaxed">{m.fact}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
