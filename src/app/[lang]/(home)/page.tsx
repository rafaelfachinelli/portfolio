import { HomePageContent } from '@/components/pages/home/home-page-content'
import { articles, getReadingMinutes, toArticleLocale } from '@/content/articles'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '',
    isHome: true,
    getCopy: t => ({
      title: `Rafael Fachinelli | ${t.pages.home.eyebrow}`,
      description: t.pages.home.description,
    }),
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = toArticleLocale(lang)

  // Only the lightweight fields are sent to the client (not the article bodies).
  const latestArticles = articles.slice(0, 3).map(article => ({
    slug: article.slug,
    cover: article.cover,
    tags: article.tags,
    date: article.date,
    title: article.content[locale].title,
    description: article.content[locale].description,
    readingMinutes: getReadingMinutes(article.content[locale].body),
  }))

  return <HomePageContent latestArticles={latestArticles} />
}
