'use client'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import {
  type Article,
  getReadingMinutes,
  toArticleLocale,
} from '@/content/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-2xl font-bold">{children}</h2>
  ),
  p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 leading-7">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 leading-7">{children}</ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      className="text-sky-700 underline underline-offset-4 dark:text-sky-400"
    >
      {children}
    </Link>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : undefined}
      alt={alt ?? ''}
      loading="lazy"
      className="my-6 w-full rounded-xl"
    />
  ),
}

export function ArticlePageContent({
  article,
}: Readonly<{ article: Article }>) {
  const { lang, translation } = useLanguage()
  const text = translation.pages.articles
  const locale = toArticleLocale(lang)
  const { title, body } = article.content[locale]

  return (
    <PageContent className="gap-4">
      <Link
        href={`/${lang}/articles`}
        className="flex w-fit items-center gap-2 text-sm text-sky-700 dark:text-sky-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {text.backToList}
      </Link>

      <article>
        <Image
          src={article.cover}
          alt=""
          width={1200}
          height={630}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="mb-6 aspect-[1200/630] w-full rounded-2xl object-cover"
        />
        <header className="mb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl leading-tight font-bold md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {text.author} ·{' '}
            <time dateTime={article.date}>
              {new Date(`${article.date}T12:00:00`).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>{' '}
            · {getReadingMinutes(body)} {text.minRead}
          </p>
        </header>
        <Card className="border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
          <ReactMarkdown components={markdownComponents}>{body}</ReactMarkdown>
        </Card>
      </article>
    </PageContent>
  )
}
