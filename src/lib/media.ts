import type { Media } from '@/payload-types'

type Size = 'thumbnail' | 'card' | 'og'

export const asMedia = (m: number | Media | null | undefined): Media | null =>
  m && typeof m === 'object' ? m : null

export function mediaUrl(m: number | Media | null | undefined, size?: Size): string | null {
  const media = asMedia(m)
  if (!media) return null
  const sized = size ? media.sizes?.[size]?.url : null
  return sized || media.url || null
}
