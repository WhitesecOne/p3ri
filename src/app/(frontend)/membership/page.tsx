import { CheckIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { Faq } from '@/components/blocks/faq'
import { PageHeader, Section, SectionHeading } from '@/components/blocks/section'
import { MembershipForm } from '@/components/forms/membership-form'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { RichText } from '@/components/rich-text'
import { COLOR_CLASS, FAQ_MEMBERSHIP, JOIN_STEPS, MEMBER_BENEFITS, MEMBER_DUTIES, MEMBER_RIGHTS, MEMBER_TYPES } from '@/lib/content'
import { JsonLd } from '@/components/json-ld'
import { getPage, getSettings } from '@/lib/queries'
import { isCmsEnabled } from '@/lib/cms'
import { Button } from '@/components/ui/button'
import { breadcrumbLd, faqLd, graph, pageMetadata, webPageLd } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('membership')
  return pageMetadata({
    title: page?.seo?.title || 'Keanggotaan',
    description: page?.seo?.description || 'Jenis keanggotaan P3RI, manfaat, hak dan kewajiban anggota, langkah pendaftaran, FAQ, dan formulir pendaftaran daring.',
    path: '/membership',
  })
}

export default async function MembershipPage() {
  const [page, settings] = await Promise.all([getPage('membership'), getSettings()])
  const cmsEnabled = isCmsEnabled()
  return (
    <>
      <JsonLd data={graph(webPageLd({ path: '/membership', name: 'Keanggotaan P3RI', description: 'Jenis keanggotaan, manfaat, hak dan kewajiban, langkah pendaftaran, dan FAQ.' }), breadcrumbLd([{ name: 'Keanggotaan', path: '/membership' }]), faqLd(FAQ_MEMBERSHIP))} />
      <PageHeader
        eyebrow="Keanggotaan"
        title="Bergabung dengan profesi yang menjaga informasi."
        description="P3RI terbuka untuk seluruh warga negara Indonesia — praktisi, akademisi, maupun pemerhati pengelolaan rekod dan arsip. Periode keanggotaan dua tahun dan dapat diperpanjang."
        aside={
          <a href="#daftar" className="group flex items-center justify-between rounded-lg bg-primary p-6 text-primary-foreground transition-colors hover:bg-primary-hover">
            <span>
              <span className="block text-xs font-semibold tracking-widest uppercase opacity-80">Langsung</span>
              <span className="mt-1 block font-heading text-2xl font-semibold">{cmsEnabled ? 'Isi formulir pendaftaran' : 'Hubungi pengurus untuk bergabung'}</span>
            </span>
            <span className="font-heading text-4xl transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>
        }
      />

      <Section id="jenis">
        <SectionHeading number="01" eyebrow="Jenis keanggotaan" title="Empat jalur keanggotaan" />
        <Stagger className="border-t">
          {MEMBER_TYPES.map((m, i) => (
            <StaggerItem key={m.name}>
              <div className="grid gap-3 border-b py-7 md:grid-cols-12 md:items-start md:gap-6">
                <span className="flex items-center gap-3 md:col-span-1">
                  <span className={`size-2.5 rounded-full ${COLOR_CLASS[m.color]}`} aria-hidden />
                  <span className="font-heading text-xl text-muted-foreground font-medium tabular-nums">0{i + 1}</span>
                </span>
                <h3 className="font-heading text-3xl font-semibold md:col-span-4">{m.name}</h3>
                <p className="leading-relaxed text-muted-foreground md:col-span-7">{m.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted" id="manfaat">
        <SectionHeading number="02" eyebrow="Manfaat" title="Apa yang Anda dapatkan" />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MEMBER_BENEFITS.map((b, i) => (
            <StaggerItem key={b.title} className="flex flex-col rounded-lg border bg-card p-6">
              <span className="font-heading text-3xl text-brand-red/80 font-medium tabular-nums">0{i + 1}</span>
              <h3 className="mt-5 font-heading text-2xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="hak-kewajiban">
        <SectionHeading number="03" eyebrow="Hak & kewajiban" title="Menjadi anggota berarti" />
        <Stagger className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
          {([['Hak anggota', MEMBER_RIGHTS, 'text-brand-green'], ['Kewajiban anggota', MEMBER_DUTIES, 'text-brand-red']] as const).map(([title, items, color]) => (
            <StaggerItem key={title} className="bg-card p-8">
              <h3 className="font-heading text-3xl font-semibold">{title}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <CheckIcon className={`mt-1 size-4 shrink-0 ${color}`} aria-hidden />
                    <span className="leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted" id="daftar" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading number="04" eyebrow="Cara bergabung" title="Empat langkah pendaftaran" className="mb-10" />
            <Stagger>
              <ol className="relative border-l">
                {JOIN_STEPS.map((s, i) => (
                  <StaggerItem key={s.title} className="relative pb-8 pl-8 last:pb-0">
                    <span className="absolute top-0.5 -left-[13px] grid size-6 place-items-center rounded-full border bg-background text-xs font-semibold">{i + 1}</span>
                    <h3 className="font-heading text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  </StaggerItem>
                ))}
              </ol>
            </Stagger>
            {page && (
              <Reveal className="mt-10 border-t pt-8">
                <RichText data={page.content} className="prose-sm" />
              </Reveal>
            )}
          </div>
          <Reveal className="lg:col-span-7">
            <div className="rounded-lg border bg-card p-6 md:p-10">
              <p className="eyebrow">{cmsEnabled ? 'Formulir pendaftaran' : 'Informasi pendaftaran'}</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">Daftar keanggotaan P3RI</h2>
              <p className="mt-2 text-sm text-muted-foreground">{cmsEnabled ? 'Pengurus akan menghubungi Anda melalui email untuk langkah selanjutnya. Kolom bertanda * wajib diisi.' : 'Kirimkan nama, instansi, dan jenis keanggotaan yang diminati melalui email. Pengurus akan menjelaskan langkah pendaftaran selanjutnya.'}</p>
              <div className="mt-8">
                {cmsEnabled ? <MembershipForm /> : (
                  <Button asChild>
                    <a href={`mailto:${settings.contactInfo?.email}?subject=${encodeURIComponent('Pendaftaran keanggotaan P3RI')}`}>Tanyakan keanggotaan lewat email</a>
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Faq items={FAQ_MEMBERSHIP} number="05" title="Pertanyaan seputar keanggotaan" />
    </>
  )
}
