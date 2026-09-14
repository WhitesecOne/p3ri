import { getSettings } from '@/lib/queries'
import { SITE_URL } from '@/lib/utils'

// RFC 9116. Kontak keamanan bisa dipisah dari email sekretariat lewat SECURITY_CONTACT.
export const revalidate = 86400

export async function GET() {
  const s = await getSettings()
  const contact = process.env.SECURITY_CONTACT || s.contactInfo?.email || 'p3ri.indonesia@gmail.com'
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  const body = [
    `Contact: mailto:${contact}`,
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, 'Z')}`,
    'Preferred-Languages: id, en',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    `Policy: ${SITE_URL}/privasi#keamanan`,
    '',
    '# Laporkan kerentanan keamanan situs P3RI ke kontak di atas. Mohon tidak mengakses data pengguna lain saat pengujian.',
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } })
}
