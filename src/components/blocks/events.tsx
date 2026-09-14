import { ArrowUpRightIcon, MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PROGRAM_LABEL } from '@/lib/content'
import { cn, formatDay, formatMonthShort, formatTime } from '@/lib/utils'
import type { Event } from '@/payload-types'

const MODE: Record<string, string> = { daring: 'Daring', luring: 'Luring', hibrid: 'Hibrid' }

export function EventRow({ event, past = false }: { event: Event; past?: boolean }) {
  return (
    <article className={cn('grid gap-4 border-b py-6 md:grid-cols-12 md:items-center md:gap-6', past && 'opacity-80')}>
      <time dateTime={event.startDate} className="flex items-baseline gap-2 md:col-span-2 md:flex-col md:gap-0">
        <span className="font-heading text-5xl leading-none font-semibold">{formatDay(event.startDate)}</span>
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{formatMonthShort(event.startDate)}</span>
      </time>
      <div className="md:col-span-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{PROGRAM_LABEL[event.program] ?? event.program}</Badge>
          <Badge variant="outline">{MODE[event.mode] ?? event.mode}</Badge>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-semibold text-balance md:text-3xl">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{formatTime(event.startDate)}{event.endDate ? ` – ${formatTime(event.endDate)}` : ''}</span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="size-3.5" aria-hidden />
              {event.location}
            </span>
          )}
          {event.speakers && event.speakers.length > 0 && <span>Narasumber: {event.speakers.map((s) => s.name).join(', ')}</span>}
        </p>
      </div>
      <div className="md:col-span-3 md:justify-self-end">
        {!past && event.registrationUrl ? (
          <Button asChild>
            <a href={event.registrationUrl} target="_blank" rel="noreferrer">
              Daftar
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          </Button>
        ) : !past ? (
          <Button asChild variant="outline">
            <Link href={`/contact?subjek=${encodeURIComponent(`Pendaftaran: ${event.title}`)}`}>Tanya pengurus</Link>
          </Button>
        ) : (
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Selesai</span>
        )}
      </div>
    </article>
  )
}

export function UpcomingEvents({ events, number }: { events: Event[]; number?: string }) {
  if (!events.length) return null
  return (
    <Section id="agenda" tone="muted">
      <SectionHeading
        number={number}
        eyebrow="Agenda"
        title="Kegiatan mendatang"
        action={
          <Button asChild variant="ghost">
            <Link href="/program#agenda">
              Semua agenda
              <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        }
      />
      <Stagger className="border-t">
        {events.map((e) => (
          <StaggerItem key={e.id}>
            <EventRow event={e} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
