import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Pratinjau draft dari admin (docs/PRD.md §4.2). Hanya user login Payload yang bisa mengaktifkan draft mode.
export async function GET(req: NextRequest) {
  const dm = await draftMode()
  const path = req.nextUrl.searchParams.get('path') ?? '/'
  if (req.nextUrl.searchParams.get('exit')) {
    dm.disable()
    redirect(path)
  }
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Silakan login ke /admin terlebih dahulu.', { status: 401 })
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Path tidak valid.', { status: 400 })
  dm.enable()
  redirect(path)
}
