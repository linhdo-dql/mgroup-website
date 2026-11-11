/**
 * Robots.txt configuration (`robots.txt`).
 * Disallows `/design-system` and `/api/` from search engine indexing.
 */
import type { MetadataRoute } from 'next'

import { env } from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/design-system'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
