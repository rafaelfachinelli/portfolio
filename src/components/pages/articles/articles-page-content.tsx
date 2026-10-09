'use client'

import { ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import {
  type Article,
  getReadingMinutes,
  toArticleLocale,
} from '@/content/articles'
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

      <PageContent className="grid gap-6 md:grid-cols-2">
        {articles.map(article => {
          const { title, description, body } = article.content[locale]

          return (
            <Link
              key={article.slug}
              href={`/${lang}/articles/${article.slug}`}
              className="group block focus-visible:outline-none"
            >
              <Card className="h-full overflow-hidden border-white/10 bg-white/10 p-0 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-sky-500 dark:bg-black/25">
                <Image
                  src={article.cover}
                  alt=""
                  width={1200}
                  height={630}
                  className="aspect-[1200/630] w-full object-cover"
                />
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl leading-snug font-bold group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(`${article.date}T12:00:00`).toLocaleDateString(
                        locale,
                        { year: 'numeric', month: 'short', day: 'numeric' },
                      )}{' '}
                      · {getReadingMinutes(body)} {text.minRead}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400">
                      {text.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </PageContent>
    </>
  )
}
