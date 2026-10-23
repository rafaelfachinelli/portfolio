import { DatumPageContent } from '@/components/pages/projects/datum/datum-page-content'
import { toArticleLocale } from '@/content/articles'
import {
  DATUM_SOURCE_URL,
  DATUM_STORYBOOK_URL,
  datumCopy,
} from '@/content/projects/datum'
import {
  buildPageMetadata,
  canonicalLocale,
  resolveLocale,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo'

import { getTranslation } from '../../../../../get-translation'

type Params = Promise<{ lang: string }>

// The Storybook sharing card (apps/datum/og), copied next to the page images.
const OG_IMAGE = `${SITE_URL}/images/projects/datum/og.png`

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params
  const copy = datumCopy[toArticleLocale(lang)]
  const metadata = await buildPageMetadata({
    lang,
    path: '/projects/datum',
    getCopy: () => copy.meta,
  })

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: copy.name }],
    },
    twitter: { ...metadata.twitter, images: [OG_IMAGE] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params
  const locale = canonicalLocale(resolveLocale(lang))
  const copy = datumCopy[toArticleLocale(lang)]
  const translation = await getTranslation(resolveLocale(lang))
  const url = `${SITE_URL}/${locale}/projects/datum`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: copy.name,
      description: copy.meta.description,
      url,
      codeRepository: DATUM_SOURCE_URL,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React',
      sameAs: DATUM_STORYBOOK_URL,
      inLanguage: locale,
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: translation.pages.projects.title,
          item: `${SITE_URL}/${locale}/projects`,
        },
        { '@type': 'ListItem', position: 2, name: copy.name, item: url },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DatumPageContent
        copy={copy}
        locale={locale}
        projectsTitle={translation.pages.projects.title}
      />
    </>
  )
}
