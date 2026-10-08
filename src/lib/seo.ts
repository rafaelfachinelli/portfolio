import type { Metadata } from 'next'

import type { Translation } from '../../get-translation'
import { getTranslation } from '../../get-translation'
import { i18n, type Locale } from '../../i18n-config'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rafaelfachinelli.com'
).replace(/\/$/, '')

export const SITE_NAME = 'Rafael Fachinelli'

// Locales that are indexed. "en" and "pt" are aliases of these two.
export const INDEXED_LOCALES = ['pt-BR', 'en-US'] as const

export const SITE_PATHS = [
  '',
  '/about/me',
  '/about/resume',
  '/about/timeline',
  '/about/personal-manifesto',
  '/projects/instalacoes-e-reformas',
  '/projects/markit3d',
  '/projects/flex-sewing-machine',
  '/projects/more',
  '/contact',
] as const

export function resolveLocale(lang: string): Locale {
  return i18n.locales.includes(lang as Locale)
    ? (lang as Locale)
    : i18n.defaultLocale
}

function canonicalLocale(locale: Locale) {
  return locale.startsWith('pt') ? 'pt-BR' : 'en-US'
}

type PageCopy = { title: string; description: string }

type BuildPageMetadataOptions = {
  lang: string
  path: (typeof SITE_PATHS)[number]
  getCopy: (translation: Translation) => PageCopy
  isHome?: boolean
}

export async function buildPageMetadata({
  lang,
  path,
  getCopy,
  isHome = false,
}: BuildPageMetadataOptions): Promise<Metadata> {
  const locale = resolveLocale(lang)
  const translation = await getTranslation(locale)
  const { title, description } = getCopy(translation)

  const fullTitle = isHome ? title : `${title} | ${SITE_NAME}`
  const canonicalLang = canonicalLocale(locale)
  const url = `${SITE_URL}/${canonicalLang}${path}`

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${SITE_URL}/pt-BR${path}`,
        'en-US': `${SITE_URL}/en-US${path}`,
        'x-default': `${SITE_URL}/en-US${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: canonicalLang.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
