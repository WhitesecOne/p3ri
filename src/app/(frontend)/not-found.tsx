import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-24 text-center md:py-32">
      <p className="text-sm font-medium tracking-wide text-primary uppercase">404</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-md text-muted-foreground">Tautan mungkin sudah berubah sejak situs diperbarui. Coba mulai dari beranda atau daftar artikel.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link href="/">Ke beranda</Link></Button>
        <Button asChild variant="outline"><Link href="/blog">Lihat artikel</Link></Button>
      </div>
    </div>
  )
}
