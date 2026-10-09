'use client'

import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { type Article, toArticleLocale } from '@/content/articles'
import { useLanguage } from '@/contexts/LanguageContext'

export function ArticlesPageContent({
  articles,
}: Readonly<{ articles: Article[] }>) {
  const { lang, translation } = useLanguage()
  const text = translation.pages.articles
  const locale = toArticleLocale(lang)

  return (
    <>
      <PageTitle
        icon={BookOpen}
        title={text.title}
        description={text.description}
      />

      <PageContent className="gap-4">
        {articles.map(article => {
          const { title, description } = article.content[locale]

          return (
            <Card
              key={article.slug}
              className="border-white/10 bg-white/10 p-6 backdrop-blur-md dark:bg-black/25"
            >
              <time
                dateTime={article.date}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {text.publishedOn}{' '}
                {new Date(`${article.date}T12:00:00`).toLocaleDateString(
                  locale,
                  { year: 'numeric', month: 'long', day: 'numeric' },
                )}
              </time>
              <h2 className="mt-2 text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {description}
              </p>
              <Button asChild className="mt-4 w-fit">
                <Link href={`/${lang}/articles/${article.slug}`}>
                  {text.readMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          )
        })}
      </PageContent>
    </>
  )
}
