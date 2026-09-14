import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { COLOR_CLASS, INSIGHTS } from '@/lib/content'

export function Insights({ number }: { number?: string }) {
  return (
    <Section id="wawasan" tone="ink">
      <SectionHeading
        tone="ink"
        number={number}
        eyebrow="Wawasan"
        title="Lanskap kearsipan hari ini"
        description="Regulasi yang mengikat, standar yang menjadi rujukan, dan prinsip keamanan yang melindungi rekod — fisik maupun digital."
        action={
          <Button asChild variant="outline" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground">
            <Link href="/sumber-daya">
              Buka Sumber Daya
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        }
      />
      <Stagger className="grid gap-px overflow-hidden rounded-lg border border-ink-foreground/10 bg-ink-foreground/10 lg:grid-cols-3">
        {INSIGHTS.map((col) => (
          <StaggerItem key={col.key} className="flex flex-col bg-ink p-7 md:p-8">
            <span className={`size-2.5 rounded-full ${COLOR_CLASS[col.color]}`} aria-hidden />
            <h3 className="mt-5 font-heading text-3xl font-semibold">{col.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{col.lead}</p>
            <ul className="mt-6 flex flex-col divide-y divide-ink-foreground/10 border-t border-ink-foreground/10">
              {col.items.map((it) => (
                <li key={it.label} className="py-4">
                  <p className="text-xs font-semibold tracking-widest text-ink-foreground/50 uppercase">{it.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-foreground/85">{it.text}</p>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-6 text-xs text-ink-foreground/40">Ringkasan ini bersifat pengantar, bukan nasihat hukum. Rujuk teks resmi melalui halaman Sumber Daya.</p>
    </Section>
  )
}
