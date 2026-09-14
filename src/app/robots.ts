import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'

// docs/SECURITY.md §6: /admin tidak boleh terindeks. Crawler AI diizinkan eksplisit (GEO) — konten P3RI memang untuk publik.
const disallow = ['/admin', '/api/', '/preview']
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'meta-externalagent']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: AI_BOTS, allow: ['/', '/llms.txt', '/llms-full.txt'], disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
