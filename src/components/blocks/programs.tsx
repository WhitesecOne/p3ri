import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { PROGRAMS } from '@/lib/content'

export function Programs({ number = '02' }: { number?: string }) {
  return (
    <Section id="program">
      <SectionHeading
        number={number}
        eyebrow="Program"
        title="Empat format kegiatan, satu tujuan"
        description="Dari bincang santai hingga forum ilmiah — setiap format dirancang untuk kebutuhan belajar yang berbeda."
      />
      <Stagger className="border-t">
        {PROGRAMS.map((p) => (
          <StaggerItem key={p.name}>
            <article className="group grid gap-3 border-b py-7 transition-colors hover:bg-muted/60 md:grid-cols-12 md:items-baseline md:gap-6 md:px-4">
              <span className="font-heading text-2xl text-muted-foreground font-medium tabular-nums md:col-span-1">{p.n}</span>
              <h3 className="font-heading text-3xl font-semibold md:col-span-3 md:text-4xl">{p.name}</h3>
              <p className="leading-relaxed text-muted-foreground md:col-span-6">{p.description}</p>
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase md:col-span-2 md:text-right">{p.format}</span>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
