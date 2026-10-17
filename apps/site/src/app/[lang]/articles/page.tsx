import { ArticlesPageContent } from '@/components/pages/articles/articles-page-content'
import { articles } from '@/content/articles'
import { buildPageMetadata } from '@/lib/seo'

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

export default function Page() {
  return <ArticlesPageContent articles={articles} />
}
