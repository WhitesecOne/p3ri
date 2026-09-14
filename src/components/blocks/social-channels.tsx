import { ArrowUpRightIcon } from 'lucide-react'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { SOCIAL_CHANNELS } from '@/lib/content'
import type { Setting } from '@/payload-types'

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8L10 9.2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SocialChannels({ settings, number, compact = false }: { settings: Setting; number?: string; compact?: boolean }) {
  const links = { instagram: settings.socialLinks?.instagram, youtube: settings.socialLinks?.youtube }
  const channels = SOCIAL_CHANNELS.filter((c) => links[c.key])
  if (!channels.length) return null
  const cards = (
    <Stagger className={compact ? 'grid gap-4' : 'grid gap-4 md:grid-cols-2'}>
      {channels.map((c) => (
        <StaggerItem key={c.key}>
          <a
            href={links[c.key]!}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex h-full items-start gap-5 rounded-lg border bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg hover:shadow-ink/5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
              {c.key === 'instagram' ? <InstagramGlyph className="size-6" /> : <YoutubeGlyph className="size-6" />}
            </span>
            <span className="flex-1">
              <span className="flex items-center justify-between gap-3">
                <span className="font-heading text-2xl font-semibold">{c.name}</span>
                <ArrowUpRightIcon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-primary">{c.handle}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{c.description}</span>
            </span>
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  )
  if (compact) return cards
  return (
    <Section id="kanal" tone="muted">
      <SectionHeading number={number} eyebrow="Kanal resmi" title="Ikuti P3RI di media sosial" description="Agenda terbaru, dokumentasi kegiatan, dan rekaman sesi dibagikan lebih dulu di kanal resmi." />
      {cards}
    </Section>
  )
}
