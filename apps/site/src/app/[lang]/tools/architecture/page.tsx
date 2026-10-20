import { ArchitecturePageContent } from '@/components/pages/tools/architecture/architecture-page-content'
import { toArticleLocale } from '@/content/articles'
import { architectureCopy } from '@/content/tools/architecture'
import {
  buildPageMetadata,
  canonicalLocale,
  resolveLocale,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo'

import { getTranslation } from '../../../../../get-translation'

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params
  const copy = architectureCopy[toArticleLocale(lang)]
  const metadata = await buildPageMetadata({
    lang,
    path: '/tools/architecture',
    getCopy: () => copy.meta,
  })
  const image = `${SITE_URL}/${canonicalLocale(resolveLocale(lang))}/tools/architecture/opengraph-image`

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: image, width: 1200, height: 630, alt: copy.name }],
    },
    twitter: { ...metadata.twitter, images: [image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params
  const locale = canonicalLocale(resolveLocale(lang))
  const copy = architectureCopy[toArticleLocale(lang)]
  const translation = await getTranslation(resolveLocale(lang))
  const url = `${SITE_URL}/${locale}/tools/architecture`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.name,
      description: copy.meta.description,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      inLanguage: locale,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: translation.pages.tools.title,
          item: `${SITE_URL}/${locale}/tools`,
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
      <ArchitecturePageContent
        copy={copy}
        locale={locale}
        toolsTitle={translation.pages.tools.title}
      />
    </>
  )
}
