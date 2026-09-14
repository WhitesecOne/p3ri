import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { JsonLd } from '@/components/json-ld'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { MotionProvider } from '@/components/motion/reveal'
import { Toaster } from '@/components/ui/sonner'
import { getSettings } from '@/lib/queries'
import { graph, ORG_NAME, organizationLd, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, websiteLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/utils'
import '../globals.css'

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['P3RI', 'pengelola rekod', 'manajemen rekod', 'kearsipan', 'arsip', 'records management Indonesia', 'organisasi profesi arsip', 'tata kelola informasi'],
  authors: [{ name: ORG_NAME, url: SITE_URL }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  category: 'organization',
  formatDetection: { telephone: false },
  openGraph: { type: 'website', locale: 'id_ID', siteName: ORG_NAME, url: SITE_URL, title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  alternates: { canonical: SITE_URL },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
}

export const viewport: Viewport = { themeColor: '#b80016', colorScheme: 'light', width: 'device-width', initialScale: 1 }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <html lang="id" className={sans.variable}>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={graph(organizationLd(settings), websiteLd())} />
        <MotionProvider>
          <a
            href="#konten"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Lompat ke konten
          </a>
          <SiteHeader />
          <main id="konten" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <Toaster position="top-center" richColors />
        </MotionProvider>
      </body>
    </html>
  )
}
