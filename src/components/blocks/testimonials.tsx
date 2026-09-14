import { QuoteIcon } from 'lucide-react'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { TESTIMONIALS } from '@/lib/content'

const dots = ['bg-brand-red', 'bg-brand-green', 'bg-brand-silver']

export function Testimonials({ number = '05' }: { number?: string }) {
  return (
    <Section id="suara">
      <SectionHeading number={number} eyebrow="Suara komunitas" title="Mengapa mereka bergabung" />
      <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <StaggerItem key={t.name} className="flex h-full flex-col bg-card p-8">
            <QuoteIcon className="size-7 fill-brand-red/15 text-brand-red/70" aria-hidden />
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-pretty">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-start gap-3 border-t pt-5">
              <span className={`mt-1.5 size-2 shrink-0 rounded-full ${dots[i % 3]}`} aria-hidden />
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
