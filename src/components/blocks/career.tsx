import { Section, SectionHeading } from '@/components/blocks/section'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { CAREER_PATHS, CERTIFICATIONS, LSP_TYPES } from '@/lib/content'
import { cn } from '@/lib/utils'

export function Career({ number, tone = 'default' }: { number?: string; tone?: 'default' | 'muted' }) {
  return (
    <Section id="karier" tone={tone}>
      <SectionHeading number={number} eyebrow="Jalur karier" title="Ke mana profesi ini membawa Anda" description="Pengelola rekod dibutuhkan di hampir semua sektor — dengan sebutan jabatan yang berbeda-beda." />
      <div className="grid gap-10 lg:grid-cols-12">
        <Stagger className="border-t lg:col-span-8">
          {CAREER_PATHS.map((c, i) => (
            <StaggerItem key={c.title}>
              <div className="grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6">
                <span className="font-heading text-xl text-muted-foreground font-medium tabular-nums md:col-span-1">0{i + 1}</span>
                <div className="md:col-span-5">
                  <h3 className="font-heading text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{c.sector}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{c.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="lg:col-span-4">
          <div className="rounded-lg border bg-muted p-6">
            <p className="eyebrow">Sertifikasi yang dikenal luas</p>
            <ul className="mt-5 flex flex-col divide-y">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name} className="py-3">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.by}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">P3RI tidak menerbitkan sertifikasi ini; daftar disusun sebagai peta rujukan pengembangan karier.</p>
          </div>
        </Reveal>
      </div>

      <div id="lsp-p3" className="mt-16 grid scroll-mt-20 gap-10 rounded-lg border bg-card p-6 md:p-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Badge>Uji kompetensi</Badge>
          <h3 className="mt-4 font-heading text-3xl font-semibold text-balance md:text-4xl">Mengenal LSP P3</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">LSP P3 (Lembaga Sertifikasi Profesi Pihak Ketiga)</strong> adalah lembaga sertifikasi profesi yang bersifat independen dan dibentuk oleh asosiasi industri atau asosiasi profesi untuk melayani uji kompetensi bagi masyarakat umum — termasuk pengelola dokumen, rekod, dan arsip.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Seluruh LSP beroperasi di bawah lisensi Badan Nasional Sertifikasi Profesi (BNSP). Sertifikat kompetensi yang diterbitkan diakui secara nasional dan menjadi bukti formal keahlian di bidang kearsipan.
          </p>
        </Reveal>
        <Stagger className="flex flex-col divide-y border-y lg:col-span-7">
          {LSP_TYPES.map((l) => {
            const main = l.code === 'LSP P3'
            return (
              <StaggerItem key={l.code} className={cn('grid gap-2 py-5 md:grid-cols-12 md:gap-6', main && 'md:-mx-4 md:rounded-md md:bg-muted md:px-4')}>
                <div className="md:col-span-4">
                  <p className={cn('font-heading text-2xl font-semibold', main && 'text-primary')}>{l.code}</p>
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{l.name}</p>
                </div>
                <p className={cn('text-sm leading-relaxed md:col-span-8', main ? 'text-foreground' : 'text-muted-foreground')}>{l.description}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
