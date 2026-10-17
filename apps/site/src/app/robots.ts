import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/seo'

// Search and AI crawlers that are explicitly welcome. Being listed here is
// informational (the wildcard rule already allows everything), but it makes
// the intent clear to AI search products.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'bingbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' },
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
