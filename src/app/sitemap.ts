import type { MetadataRoute } from 'next'

import { getAllSitePaths, INDEXED_LOCALES, SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitePaths().flatMap(path =>
    INDEXED_LOCALES.map(locale => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          INDEXED_LOCALES.map(alt => [alt, `${SITE_URL}/${alt}${path}`]),
        ),
      },
    })),
  )
}
