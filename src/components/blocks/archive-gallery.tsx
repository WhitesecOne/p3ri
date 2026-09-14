import Image from 'next/image'
import { PHOTOS } from '@/assets/images'
import { Section, SectionHeading } from '@/components/blocks/section'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

const TILES = [
  { photo: PHOTOS.arsipNasional, label: 'Lembaga kearsipan', caption: 'National Archives, Washington D.C.', className: 'col-span-2 row-span-2', sizes: '(min-width: 768px) 50vw, 100vw' },
  { photo: PHOTOS.depot, label: 'Gudang arsip', caption: 'Depot dengan rak baja dan lemari peta', className: 'col-span-2', sizes: '(min-width: 768px) 50vw, 100vw' },
  { photo: PHOTOS.register, label: 'Buku arsip', caption: 'Register tulisan tangan', className: '', sizes: '(min-width: 768px) 25vw, 50vw' },
  { photo: PHOTOS.berkas, label: 'Arsip fisik', caption: 'Berkas menunggu penataan', className: '', sizes: '(min-width: 768px) 25vw, 50vw' },
  { photo: PHOTOS.lemariKartu, label: 'Arsip fisik', caption: 'Lemari kartu indeks', className: 'col-span-2', sizes: '(min-width: 768px) 50vw, 100vw' },
  { photo: PHOTOS.pita, label: 'Arsip digital', caption: 'Pustaka pita magnetik', className: 'col-span-2', sizes: '(min-width: 768px) 50vw, 100vw', position: 'object-top' },
] as const

export function ArchiveGallery({ number, tone = 'muted' }: { number?: string; tone?: 'default' | 'muted' }) {
  return (
    <Section id="ruang-arsip" tone={tone}>
      <SectionHeading
        number={number}
        eyebrow="Ruang kerja profesi"
        title="Dari rak arsip hingga pusat data"
        description="Pengelola rekod bekerja di banyak ruang: lembaga kearsipan nasional, gudang boks arsip, buku register tulisan tangan, sampai pustaka pita dan server. Medianya berganti, prinsipnya tetap."
      />
      <Stagger className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[230px]">
        {TILES.map((t) => (
          <StaggerItem key={t.caption} className={cn('group relative overflow-hidden rounded-lg bg-ink', t.className)}>
            <figure className="size-full">
              <Image
                src={t.photo.src}
                alt={t.photo.alt}
                fill
                placeholder="blur"
                sizes={t.sizes}
                className={cn('object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]', 'position' in t && t.position)}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-3 pt-10 text-ink-foreground sm:p-4 sm:pt-12 md:p-5 md:pt-16">
                <span className="block text-[0.65rem] font-semibold tracking-[0.16em] text-ink-foreground/75 uppercase">{t.label}</span>
                <span className="mt-0.5 block font-heading text-sm leading-snug font-semibold sm:text-base md:text-lg">{t.caption}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
