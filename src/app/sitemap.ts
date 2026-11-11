/**
 * Dynamic XML Sitemap generator (`sitemap.xml`) covering all 10 pages in both VI and EN
 * with `hreflang` language alternates.
 */
import type { MetadataRoute } from 'next'

import { env } from '@/config/env'
import { ALL_PAGE_IDS, PAGE_ROUTES } from '@/i18n/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  const now = new Date()

  return ALL_PAGE_IDS.flatMap((pageId) => {
    const route = PAGE_ROUTES[pageId]
    const viUrl = `${baseUrl}${route.paths.vi}`
    const enUrl = `${baseUrl}${route.paths.en}`

    return [
      {
        url: viUrl,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: pageId === 'home' ? 1.0 : 0.8,
        alternates: {
          languages: {
            vi: viUrl,
            en: enUrl,
          },
        },
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: pageId === 'home' ? 0.9 : 0.7,
        alternates: {
          languages: {
            vi: viUrl,
            en: enUrl,
          },
        },
      },
    ]
  })
}
