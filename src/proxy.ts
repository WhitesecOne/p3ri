import { NextResponse, type NextRequest } from 'next/server'
import { isCmsEnabled } from '@/lib/cms'

export function proxy(request: NextRequest) {
  if (isCmsEnabled()) return NextResponse.next()
  if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.json(
    { errors: [{ message: 'Layanan ini belum tersedia. Silakan hubungi sekretariat melalui halaman Kontak.' }] },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  )
}

export const config = { matcher: ['/admin/:path*', '/api/:path*', '/preview'] }
