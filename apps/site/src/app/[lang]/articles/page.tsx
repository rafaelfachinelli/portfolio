import { ArticlesPageContent } from '@/components/pages/articles/articles-page-content'
import { articles } from '@/content/articles'
import { buildPageMetadata, resolveLocale } from '@/lib/seo'

import { getTranslation } from '../../../../get-translation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/articles',
    getCopy: t => ({
      title: t.pages.articles.title,
      description: t.pages.articles.description,
    }),
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return (
    <ArticlesPageContent
      articles={articles}
      lang={lang}
      translation={translation}
    />
  )
}
