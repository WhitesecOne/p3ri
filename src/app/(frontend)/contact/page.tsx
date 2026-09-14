import { ArrowUpRightIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PHOTOS } from '@/assets/images'
import { PageHeader, Section, SectionHeading } from '@/components/blocks/section'
import { SocialChannels } from '@/components/blocks/social-channels'
import { ContactForm } from '@/components/forms/contact-form'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { ADDRESS, COLLAB_TYPES } from '@/lib/content'
import { JsonLd } from '@/components/json-ld'
import { getSettings } from '@/lib/queries'
import { breadcrumbLd, graph, pageMetadata, webPageLd } from '@/lib/seo'

const DESC = 'Hubungi sekretariat P3RI — alamat, email, telepon, formulir pesan, dan bentuk kerja sama: narasumber, workshop in-house, klinik, kolaborasi akademik.'
export const metadata: Metadata = pageMetadata({ title: 'Kontak', description: DESC, path: '/contact' })

const dots = ['bg-brand-red', 'bg-brand-green', 'bg-brand-silver', 'bg-brand-amber']

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ subjek?: string }> }) {
  const [settings, { subjek }] = await Promise.all([getSettings(), searchParams])
  const c = settings.contactInfo
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/contact', name: 'Kontak P3RI', description: DESC, type: 'ContactPage' }), breadcrumbLd([{ name: 'Kontak', path: '/contact' }]))} />
      <PageHeader eyebrow="Kontak" title="Mari berbincang tentang rekod." description="Pertanyaan seputar keanggotaan, kerja sama kegiatan, undangan narasumber, atau media — kirimkan pesan dan pengurus akan membalas melalui email."
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Image src={PHOTOS.lemariKartu.src} alt={PHOTOS.lemariKartu.alt} fill priority placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        }
      />
      <Section className="py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div id="formulir" className="scroll-mt-20 rounded-lg border bg-card p-6 md:p-10">
              <p className="eyebrow">Formulir</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">Kirim pesan</h2>
              <p className="mt-2 text-sm text-muted-foreground">Kolom bertanda * wajib diisi. Balasan dikirim ke alamat email yang Anda cantumkan.</p>
              <div className="mt-8">
                <ContactForm defaultSubject={subjek?.slice(0, 200)} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="eyebrow">Sekretariat</p>
            <dl className="mt-6 divide-y border-y">
              {c?.address && (
                <div className="grid gap-2 py-5 md:grid-cols-3">
                  <dt className="text-sm text-muted-foreground">Alamat</dt>
                  <dd className="whitespace-pre-line md:col-span-2">{c.address}</dd>
                </div>
              )}
              {c?.email && (
                <div className="grid gap-2 py-5 md:grid-cols-3">
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd className="md:col-span-2"><a href={`mailto:${c.email}`} className="link-underline font-medium">{c.email}</a></dd>
                </div>
              )}
              {c?.phone && (
                <div className="grid gap-2 py-5 md:grid-cols-3">
                  <dt className="text-sm text-muted-foreground">Telepon</dt>
                  <dd className="md:col-span-2"><a href={`tel:${c.phone.replace(/\s/g, '')}`} className="link-underline font-medium">{c.phone}</a></dd>
                </div>
              )}
              <div className="grid gap-2 py-5 md:grid-cols-3">
                <dt className="text-sm text-muted-foreground">Waktu balasan</dt>
                <dd className="md:col-span-2">Pengurus adalah relawan profesi; pesan umumnya dibalas dalam beberapa hari kerja.</dd>
              </div>
            </dl>
            <Button asChild variant="outline" className="mt-6">
              <a href={ADDRESS.maps} target="_blank" rel="noreferrer">
                Buka di Google Maps
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
            <p className="eyebrow mt-12">Kanal resmi</p>
            <div className="mt-5">
              <SocialChannels settings={settings} compact />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted" id="kerja-sama">
        <SectionHeading eyebrow="Kerja sama" title="Bentuk kolaborasi yang bisa diajukan" description="Pilih salah satu — subjek pesan akan terisi otomatis." />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {COLLAB_TYPES.map((t, i) => (
            <StaggerItem key={t.title}>
              <Link href={`/contact?subjek=${encodeURIComponent(`Kerja sama: ${t.title}`)}#formulir`} className="flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-foreground/30">
                <span className={`size-2.5 rounded-full ${dots[i]}`} aria-hidden />
                <span className="mt-5 font-heading text-2xl font-semibold">{t.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  )
}
