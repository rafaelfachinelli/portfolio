'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { type Article, toArticleLocale } from '@/content/articles'
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
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      className="text-sky-700 underline underline-offset-4 dark:text-sky-400"
    >
      {children}
    </Link>
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
        <header className="mb-6">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {text.author} · {text.publishedOn}{' '}
            <time dateTime={article.date}>
              {new Date(`${article.date}T12:00:00`).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </header>
        <Card className="border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
          <ReactMarkdown components={markdownComponents}>{body}</ReactMarkdown>
        </Card>
      </article>
    </PageContent>
  )
}
