import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { PROGRAMS, ROLES } from '@/lib/content'
import { cn } from '@/lib/utils'

const tile = 'group relative flex flex-col rounded-lg border bg-card p-7 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5'

export function RolesBento({ number = '01' }: { number?: string }) {
  const [main, ...rest] = ROLES
  return (
    <Section id="peran" tone="muted">
      <SectionHeading
        number={number}
        eyebrow="Peran P3RI"
        title="Empat pilar untuk profesi yang berdaya"
        description="Mandat organisasi yang dirumuskan sejak pendirian — dijalankan melalui program, standar, advokasi, dan jejaring."
      />
      <Stagger className="grid gap-4 md:auto-rows-fr md:grid-cols-6">
        <StaggerItem className={cn(tile, 'md:col-span-3 md:row-span-2')}>
          <span className="font-heading text-5xl text-brand-red/80 font-medium tabular-nums">{main.n}</span>
          <h3 className="mt-6 font-heading text-3xl font-semibold">{main.title}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{main.description}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-8">
            {PROGRAMS.map((p) => (
              <li key={p.name} className="rounded-full border bg-background px-3 py-1 text-xs font-medium">{p.name}</li>
            ))}
          </ul>
        </StaggerItem>
        {rest.map((r, i) => (
          <StaggerItem key={r.n} className={cn(tile, i === 2 ? 'md:col-span-3' : 'md:col-span-3 lg:col-span-3')}>
            <span className={cn('font-heading text-3xl font-medium tabular-nums', i === 0 ? 'text-brand-green' : i === 1 ? 'text-brand-silver' : 'text-brand-amber')}>{r.n}</span>
            <h3 className="mt-4 font-heading text-2xl font-semibold">{r.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{r.description}</p>
          </StaggerItem>
        ))}
        <StaggerItem className="flex flex-col justify-between rounded-lg bg-ink p-7 text-ink-foreground md:col-span-3">
          <p className="eyebrow text-ink-foreground/50">Keanggotaan</p>
          <div>
            <p className="font-heading text-3xl font-semibold text-balance">Terbuka untuk seluruh warga negara Indonesia.</p>
            <Link href="/membership" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-foreground/80 transition-colors hover:text-ink-foreground">
              Lihat jenis keanggotaan
              <ArrowUpRightIcon className="size-4" aria-hidden />
            </Link>
          </div>
        </StaggerItem>
      </Stagger>
    </Section>
  )
}
