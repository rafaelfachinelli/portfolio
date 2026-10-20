import { notFound } from 'next/navigation'

import { ArchitecturePageContent } from '@/components/pages/tools/architecture/architecture-page-content'
import { toArticleLocale } from '@/content/articles'
import { architectureCopy } from '@/content/tools/architecture'
import {
  buildPageMetadata,
  canonicalLocale,
  resolveLocale,
  SITE_URL,
} from '@/lib/seo'
import { decodeAnswers } from '@/lib/tools/architecture/code'

import { getTranslation } from '../../../../../../../get-translation'

type Params = Promise<{ lang: string; code: string }>

// Any valid code renders on first visit and is cached after that.
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, code } = await params
  const copy = architectureCopy[toArticleLocale(lang)]
  const locale = canonicalLocale(resolveLocale(lang))
  const metadata = await buildPageMetadata({
    lang,
    path: '/tools/architecture',
    getCopy: () => copy.meta,
  })
  const image = `${SITE_URL}/${locale}/tools/architecture/r/${code}/opengraph-image`
  const url = `${SITE_URL}/${locale}/tools/architecture/r/${code}`

  // A shared result is a copy of the tool: the tool stays the canonical page.
  return {
    ...metadata,
    robots: { index: false, follow: true },
    openGraph: {
      ...metadata.openGraph,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: copy.name }],
    },
    twitter: { ...metadata.twitter, images: [image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, code } = await params
  const answers = decodeAnswers(code)
  if (!answers) notFound()

  const translation = await getTranslation(resolveLocale(lang))

  return (
    <ArchitecturePageContent
      copy={architectureCopy[toArticleLocale(lang)]}
      locale={canonicalLocale(resolveLocale(lang))}
      toolsTitle={translation.pages.tools.title}
      initialAnswers={answers}
      shared
    />
  )
}
