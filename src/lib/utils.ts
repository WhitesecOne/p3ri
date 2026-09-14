import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format error standar Payload (docs/API.md §6) → satu string untuk ditampilkan. */
export function parseApiError(body: unknown, fallback = 'Terjadi kesalahan. Silakan coba lagi.'): string {
  if (body && typeof body === 'object' && 'errors' in body && Array.isArray(body.errors)) {
    const msgs = body.errors
      .map((e: unknown) => (e && typeof e === 'object' && 'message' in e ? String(e.message) : ''))
      .filter(Boolean)
    if (msgs.length) return msgs.join(' ')
  }
  return fallback
}

export const formatDate = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
    : ''

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const JKT = 'Asia/Jakarta'
export const formatDay = (iso: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', timeZone: JKT }).format(new Date(iso))
export const formatMonthShort = (iso: string) => new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric', timeZone: JKT }).format(new Date(iso))
export const formatTime = (iso: string) => `${new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: JKT }).format(new Date(iso))} WIB`

/** Perkiraan waktu baca (menit) dari isi Lexical — ~200 kata/menit. */
export function readingTime(content: unknown): number {
  const words: string[] = []
  const walk = (n: unknown) => {
    if (!n || typeof n !== 'object') return
    const node = n as { text?: string; children?: unknown[] }
    if (typeof node.text === 'string') words.push(...node.text.split(/\s+/).filter(Boolean))
    node.children?.forEach(walk)
  }
  walk((content as { root?: unknown })?.root)
  return Math.max(1, Math.round(words.length / 200))
}
