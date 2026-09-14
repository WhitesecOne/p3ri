import type { CollectionBeforeValidateHook, Field } from 'payload'
import { APIError } from 'payload'

// docs/SECURITY.md §4: honeypot + rate limit per IP untuk form publik.
// ponytail: limiter in-memory per instance, reset saat cold start. Pindah ke Vercel WAF / Upstash kalau spam nyata.
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

export const honeypotField: Field = {
  name: 'website',
  type: 'text',
  admin: { hidden: true },
}

export const antiSpam: CollectionBeforeValidateHook = ({ data, operation, req }) => {
  if (operation !== 'create' || req.user) return data
  if (data?.website) throw new APIError('Permintaan ditolak.', 400, undefined, true)

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    throw new APIError('Terlalu banyak permintaan. Silakan coba lagi dalam satu jam.', 429, undefined, true)
  }
  hits.set(ip, [...recent, now])
  return data
}
