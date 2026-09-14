import { readFile } from 'fs/promises'
import { ImageResponse } from 'next/og'
import path from 'path'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const asset = (p: string) => readFile(path.join(process.cwd(), p))

/** Kartu Open Graph bergaya editorial: garis tri-warna, logo, eyebrow, judul sans semibold. Dipakai semua opengraph-image.tsx. */
export async function ogImage({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  const [heading, sans, logo] = await Promise.all([
    asset('src/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    asset('src/assets/fonts/PlusJakartaSans-Regular.ttf'),
    asset('public/logo-p3ri.png'),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  const long = title.length > 60
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#141416', fontFamily: 'Jakarta' }}>
        <div style={{ display: 'flex', height: 14 }}>
          <div style={{ flex: 1, background: '#b80016' }} />
          <div style={{ flex: 1, background: '#0b6b28' }} />
          <div style={{ flex: 1, background: '#9a9aa0' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 72px 52px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (satori) hanya menerima <img> biasa */}
            <img src={logoSrc} alt="" style={{ height: 74 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#5f5f66' }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#b80016' }} />
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#0b6b28' }} />
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#9a9aa0' }} />
              <span style={{ marginLeft: 8 }}>{eyebrow}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ fontFamily: 'Jakarta', fontWeight: 600, fontSize: long ? 58 : 72, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
            {description && <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.4, color: '#5f5f66', maxWidth: 940 }}>{description}</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36, fontSize: 22, color: '#5f5f66' }}>
            <span>Perkumpulan Profesi Pengelola Rekod Indonesia</span>
            <span>p3ri.or.id</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Jakarta', data: heading, weight: 600, style: 'normal' },
        { name: 'Jakarta', data: sans, weight: 400, style: 'normal' },
      ],
    },
  )
}
