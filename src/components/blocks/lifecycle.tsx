import { Section, SectionHeading } from '@/components/blocks/section'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { COLOR_CLASS, GLOSSARY_SHORT, LIFECYCLE } from '@/lib/content'

export function Lifecycle({ number }: { number?: string }) {
  return (
    <Section id="daur-hidup">
      <SectionHeading
        number={number}
        eyebrow="Daur hidup rekod"
        title="Dari tercipta hingga disusutkan"
        description="Rekod bergerak melalui empat tahap. Di setiap tahap ada keputusan yang menentukan apakah ia tetap dapat dipercaya."
      />
      <Stagger className="relative grid gap-6 md:grid-cols-4">
        <span className="absolute top-3 right-0 left-0 hidden h-px bg-border md:block" aria-hidden />
        {LIFECYCLE.map((s) => (
          <StaggerItem key={s.n} className="relative">
            <span className={`relative z-10 block size-6 rounded-full border-4 border-background ${COLOR_CLASS[s.color]}`} aria-hidden />
            <p className="mt-5 font-heading text-lg text-muted-foreground font-medium tabular-nums">{s.n}</p>
            <h3 className="mt-1 font-heading text-3xl font-semibold">{s.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            <p className="mt-4 border-l-2 border-primary pl-3 text-sm font-medium">{s.practice}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
        {GLOSSARY_SHORT.map((g, i) => (
          <div key={g.term} className="bg-muted p-6">
            <p className="flex items-baseline gap-3 font-heading text-2xl font-semibold">
              <span className="font-sans text-xs tracking-widest text-muted-foreground">0{i + 1}</span>
              {g.term}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.definition}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
