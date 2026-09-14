import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BrandStripe } from '@/components/blocks/brand'
import { LEGAL, NAV_LINKS, PROGRAMS } from '@/lib/content'
import { getSettings } from '@/lib/queries'

export async function SiteFooter() {
  const s = await getSettings()
  const c = s.contactInfo
  const socials = [
    { label: 'Instagram', href: s.socialLinks?.instagram },
    { label: 'YouTube', href: s.socialLinks?.youtube },
  ].filter((x) => x.href)

  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <BrandStripe />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Image src="/logo-p3ri-white.png" alt={`Logo ${s.siteName}`} width={2051} height={610} className="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            {s.footerText || 'Organisasi profesi resmi pengelola rekod dan arsip di Indonesia — pengembangan kompetensi, standar profesi, advokasi, dan jejaring.'}
          </p>
          {c?.address && <p className="mt-6 text-sm leading-relaxed whitespace-pre-line text-ink-foreground/70">{c.address}</p>}
        </div>

        <nav className="md:col-span-2" aria-label="Navigasi footer">
          <p className="eyebrow text-ink-foreground/50">Navigasi</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-ink-foreground/80 hover:text-ink-foreground">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow text-ink-foreground/50">Program</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {PROGRAMS.map((p) => (
              <li key={p.name}>
                <Link href={`/program#${p.name.toLowerCase().replace(' ', '-')}`} className="link-underline text-ink-foreground/80 hover:text-ink-foreground">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-ink-foreground/50">Kontak</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {c?.email && (
              <li><a href={`mailto:${c.email}`} className="link-underline text-ink-foreground/80 hover:text-ink-foreground">{c.email}</a></li>
            )}
            {c?.phone && (
              <li><a href={`tel:${c.phone.replace(/\s/g, '')}`} className="link-underline text-ink-foreground/80 hover:text-ink-foreground">{c.phone}</a></li>
            )}
            {socials.map((x) => (
              <li key={x.label}>
                <a href={x.href!} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-ink-foreground/80 hover:text-ink-foreground">
                  {x.label}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site relative flex flex-col gap-2 border-t border-ink-foreground/10 py-6 text-xs text-ink-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {s.siteName}. Disahkan {LEGAL.authority}, {LEGAL.date}.</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/privasi" className="link-underline hover:text-ink-foreground">Kebijakan privasi</Link>
          <a href="/sitemap.xml" className="link-underline hover:text-ink-foreground">Peta situs</a>
          <span className="font-mono">No. {LEGAL.number}</span>
        </p>
      </div>

      <span
        className="pointer-events-none absolute -right-6 -bottom-10 font-heading text-[12rem] leading-none font-semibold text-ink-foreground/[0.04] select-none md:text-[18rem]"
        aria-hidden
      >
        P3RI
      </span>
    </footer>
  )
}
