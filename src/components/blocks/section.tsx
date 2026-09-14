import type { ReactNode } from 'react'
import { BrandStripe, Eyebrow } from '@/components/blocks/brand'
import { cn } from '@/lib/utils'

export function Section({ children, className, tone = 'default', id }: { children: ReactNode; className?: string; tone?: 'default' | 'muted' | 'ink'; id?: string }) {
  return (
    <section
      id={id}
      className={cn('py-20 md:py-28', tone === 'muted' && 'bg-muted', tone === 'ink' && 'bg-ink text-ink-foreground', className)}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

export function SectionHeading({ number, eyebrow, title, description, action, className, tone = 'default' }: { number?: string; eyebrow?: string; title: string; description?: string; action?: ReactNode; className?: string; tone?: 'default' | 'ink' }) {
  return (
    <div className={cn('mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end', className)}>
      {/* Tanpa action, judul memakai lebar penuh parent (dibatasi max-w) — aman saat SectionHeading ada di kolom sempit. */}
      <div className={cn(action ? 'md:col-span-8' : 'max-w-3xl md:col-span-12')}>
        {(eyebrow || number) && (
          <Eyebrow className={cn(tone === 'ink' && 'text-ink-foreground/60')}>
            {number && <span className="font-heading text-sm normal-case tracking-normal font-medium tabular-nums">{number}</span>}
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-semibold text-balance md:text-4xl lg:text-5xl">{title}</h2>
        {description && <p className={cn('mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground', tone === 'ink' && 'text-ink-foreground/70')}>{description}</p>}
      </div>
      {action && <div className="md:col-span-4 md:justify-self-end">{action}</div>}
    </div>
  )
}

export function PageHeader({ eyebrow, title, description, aside, children }: { eyebrow?: string; title: string; description?: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative border-b bg-muted">
      <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          {children}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 font-heading text-4xl leading-[1.1] font-semibold text-balance md:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>}
        </div>
        {aside && <div className="md:col-span-4 md:self-end">{aside}</div>}
      </div>
      <BrandStripe className="absolute inset-x-0 bottom-0 h-0.5" />
    </div>
  )
}
