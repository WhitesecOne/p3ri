import Image from 'next/image'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { mediaUrl } from '@/lib/media'
import type { BoardMember } from '@/payload-types'

export function Board({ members, number }: { members: BoardMember[]; number?: string }) {
  if (!members.length) return null
  const period = members.find((m) => m.period)?.period
  return (
    <Section id="pengurus">
      <SectionHeading number={number} eyebrow="Struktur pengurus" title={period ? `Pengurus periode ${period}` : 'Pengurus P3RI'} />
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m) => {
          const photo = mediaUrl(m.photo, 'card')
          const initials = m.name.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()
          return (
            <StaggerItem key={m.id} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                {photo ? (
                  <Image src={photo} alt={m.name} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-heading text-5xl text-muted-foreground">{initials}</span>
                )}
              </div>
              <p className="mt-4 font-heading text-xl font-semibold">{m.name}</p>
              <p className="text-sm font-semibold text-primary">{m.position}</p>
              {m.organization && <p className="mt-0.5 text-sm text-muted-foreground">{m.organization}</p>}
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
