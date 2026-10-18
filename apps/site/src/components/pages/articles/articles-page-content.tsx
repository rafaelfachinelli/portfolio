import { Badge, Card } from '@datum/ui'
import { ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import {
  type Article,
  getReadingMinutes,
  toArticleLocale,
} from '@/content/articles'

import type { Translation } from '../../../../get-translation'

export function ArticlesPageContent({
  articles,
  lang,
  translation,
}: Readonly<{ articles: Article[]; lang: string; translation: Translation }>) {
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
              <Card className="group-focus-visible:ring-season-accent h-full overflow-hidden border-white/10 bg-white/10 p-0 transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 dark:bg-black/25">
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
                      <Badge key={tag} variant="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="group-hover:text-season-accent text-xl leading-snug font-bold">
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
                    <span className="text-season-accent flex items-center gap-1 font-medium">
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
