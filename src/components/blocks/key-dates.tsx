import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { KEY_DATES } from '@/lib/content'

const dots = ['bg-brand-red', 'bg-brand-green', 'bg-brand-silver', 'bg-brand-amber', 'bg-brand-red']

export function KeyDates({ number, tone = 'default' }: { number?: string; tone?: 'default' | 'muted' }) {
  return (
    <Section id="hari-penting" tone={tone}>
      <SectionHeading number={number} eyebrow="Kalender profesi" title="Hari-hari penting kearsipan" description="Momen tahunan yang biasa dimanfaatkan P3RI dan komunitas untuk kampanye, seminar, dan publikasi." />
      <Stagger className="border-t">
        {KEY_DATES.map((d, i) => (
          <StaggerItem key={d.name}>
            <div className="grid gap-2 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-6">
              <p className="flex items-center gap-3 md:col-span-3">
                <span className={`size-2.5 rounded-full ${dots[i]}`} aria-hidden />
                <span className="font-heading text-2xl font-semibold">{d.date}</span>
              </p>
              <h3 className="text-lg font-semibold md:col-span-4">{d.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-5">{d.note}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
