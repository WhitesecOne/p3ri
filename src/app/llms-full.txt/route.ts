import { llmsFull } from '@/lib/llms'
import { getPublishedPosts, getSettings, getUpcomingEvents } from '@/lib/queries'

export const revalidate = 3600

export async function GET() {
  const [settings, posts, events] = await Promise.all([getSettings(), getPublishedPosts({ limit: 100 }), getUpcomingEvents(20)])
  return new Response(llmsFull(settings, posts.docs, events), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
