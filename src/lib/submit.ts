import { parseApiError } from '@/lib/utils'

/** Kirim form publik ke REST Payload (docs/API.md §5). Melempar Error dengan pesan siap tampil. */
export async function submitForm(collection: 'contact-submissions' | 'membership-inquiries', form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form))
  const res = await fetch(`/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body: unknown = await res.json().catch(() => null)
    throw new Error(parseApiError(body))
  }
}
