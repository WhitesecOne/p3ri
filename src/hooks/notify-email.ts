import type { CollectionAfterChangeHook } from 'payload'

// Notifikasi ke pengurus saat ada submission baru (docs/PRD.md §4.3). Tanpa RESEND_API_KEY, Payload hanya log ke console.
export const notifyPengurus =
  (label: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req }) => {
    if (operation !== 'create' || !process.env.NOTIFY_EMAIL) return doc
    const skip = new Set(['id', 'status', 'website', 'createdAt', 'updatedAt'])
    const text = Object.entries(doc)
      .filter(([k, v]) => !skip.has(k) && v)
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join('\n')
    try {
      await req.payload.sendEmail({
        to: process.env.NOTIFY_EMAIL,
        subject: `[Website P3RI] ${label} baru dari ${String(doc.name ?? '')}`,
        text: `${text}\n\nLihat di ${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin`,
      })
    } catch (err) {
      req.payload.logger.error({ err, msg: `Gagal kirim email notifikasi ${label}` })
    }
    return doc
  }
