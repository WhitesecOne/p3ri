import { llmsIndex } from '@/lib/llms'
import { getPublishedPosts, getSettings } from '@/lib/queries'

export const revalidate = 3600

export async function GET() {
  const [settings, posts] = await Promise.all([getSettings(), getPublishedPosts({ limit: 10 })])
  return new Response(llmsIndex(settings, posts.docs), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
