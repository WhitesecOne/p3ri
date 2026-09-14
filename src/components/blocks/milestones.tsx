import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { MILESTONES } from '@/lib/content'

export function Milestones({ number, tone = 'default' }: { number?: string; tone?: 'default' | 'muted' }) {
  return (
    <Section id="tonggak" tone={tone}>
      <SectionHeading number={number} eyebrow="Tonggak sejarah" title="Perjalanan kearsipan Indonesia" description="Dari lembaga arsip era kolonial hingga pelindungan data pribadi — regulasi yang membentuk profesi ini." />
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((m, i) => (
          <StaggerItem key={m.year} className={i === 4 ? 'rounded-lg bg-ink p-6 text-ink-foreground' : 'rounded-lg border bg-card p-6'}>
            <p className={`font-heading text-4xl font-semibold ${i === 4 ? 'text-ink-foreground' : 'text-primary'}`}>{m.year}</p>
            <h3 className="mt-3 font-heading text-xl font-semibold">{m.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${i === 4 ? 'text-ink-foreground/70' : 'text-muted-foreground'}`}>{m.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
