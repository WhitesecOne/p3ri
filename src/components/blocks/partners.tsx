import { Reveal } from '@/components/motion/reveal'
import { PARTNERS } from '@/lib/content'

export function Partners({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <div className="container-site border-y py-8">
        <p className="eyebrow text-center">Pernah berkolaborasi dengan</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PARTNERS.map((p) => (
            <li key={p} className="font-heading text-lg text-muted-foreground md:text-xl">{p}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
