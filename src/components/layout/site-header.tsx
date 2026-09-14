import Image from 'next/image'
import Link from 'next/link'
import { BrandStripe } from '@/components/blocks/brand'
import { MainNav } from '@/components/layout/main-nav'
import { mediaUrl } from '@/lib/media'
import { getSettings } from '@/lib/queries'

export async function SiteHeader() {
  const settings = await getSettings()
  // Logo resmi disimpan sebagai aset statis; Settings.logo dari admin menimpanya kalau diisi.
  const logo = mediaUrl(settings.logo) ?? '/logo-p3ri.png'
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <BrandStripe />
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-8 border-b">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${settings.siteName} — beranda`}>
          <Image src={logo} alt={`Logo ${settings.siteName}`} width={2051} height={610} priority className="hidden h-10 w-auto sm:block" />
          <Image src="/logo-mark.png" alt="" width={1147} height={1147} priority className="h-9 w-auto sm:hidden" />
          <span className="ml-2.5 font-heading text-2xl font-semibold tracking-tight sm:hidden">{settings.siteName}</span>
        </Link>
        <MainNav />
      </div>
    </header>
  )
}
