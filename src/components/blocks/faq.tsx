import { Section, SectionHeading } from '@/components/blocks/section'
import { Reveal } from '@/components/motion/reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Item = { readonly q: string; readonly a: string }

export function FaqList({ items }: { items: readonly Item[] }) {
  return (
    <Accordion type="single" collapsible className="border-t">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-b">
          <AccordionTrigger className="items-baseline gap-4 py-5 text-left font-heading text-base font-semibold hover:no-underline hover:text-primary md:text-lg [&>svg]:mt-1 [&>svg]:size-5">
            <span className="flex items-baseline gap-4">
              <span className="font-sans text-xs tracking-widest text-muted-foreground">0{i + 1}</span>
              {f.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pl-9 text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function Faq({ items, number, title = 'Pertanyaan yang sering diajukan', description, tone = 'default' }: { items: readonly Item[]; number?: string; title?: string; description?: string; tone?: 'default' | 'muted' }) {
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading number={number} eyebrow="FAQ" title={title} description={description} className="mb-0" />
        </div>
        <Reveal className="lg:col-span-8">
          <FaqList items={items} />
        </Reveal>
      </div>
    </Section>
  )
}
