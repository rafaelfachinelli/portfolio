import { notFound } from 'next/navigation'

import { ArticlePageContent } from '@/components/pages/articles/article-page-content'
import { articles, toArticleLocale } from '@/content/articles'
import { buildPageMetadata, resolveLocale, SITE_URL } from '@/lib/seo'

type Params = Promise<{ lang: string; slug: string }>

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, slug } = await params
  const article = articles.find(item => item.slug === slug)
  if (!article) return {}

  const { title, description } = article.content[toArticleLocale(lang)]
  const metadata = await buildPageMetadata({
    lang,
    path: `/articles/${slug}`,
    getCopy: () => ({ title, description }),
  })

  const coverUrl = `${SITE_URL}${article.cover}`

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.date,
      authors: ['Rafael Fachinelli'],
      images: [{ url: coverUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { ...metadata.twitter, images: [coverUrl] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params
  const article = articles.find(item => item.slug === slug)
  if (!article) notFound()

  const locale = toArticleLocale(resolveLocale(lang))
  const { title, description } = article.content[locale]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: `${SITE_URL}${article.cover}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/articles/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Rafael Fachinelli',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePageContent article={article} />
    </>
  )
}
