'use client'

import {
  ArrowLeft,
  BookMarked,
  ExternalLink,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import {
  type Article,
  getReadingMinutes,
  toArticleLocale,
} from '@/content/articles'
import { useLanguage } from '@/contexts/LanguageContext'

import { ShareButtons } from './share-buttons'

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-5 mb-1.5 text-xl font-bold md:text-2xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-3 mb-1 text-lg font-semibold">{children}</h3>
  ),
  p: ({ children }) => <p className="my-2 leading-7">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-6 leading-7">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-6 leading-7">{children}</ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http')

    return (
      <Link
        href={href ?? '#'}
        className="text-sky-700 underline underline-offset-4 dark:text-sky-400"
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </Link>
    )
  },
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : undefined}
      alt={alt ?? ''}
      loading="lazy"
      className="my-3 w-full rounded-xl"
    />
  ),
}

// Standard section headings share the same look and an icon, so readers
// recognize them across every article.
function SectionTitle({
  icon,
  children,
}: Readonly<{ icon: ReactNode; children: ReactNode }>) {
  return (
    <h2 className="mt-5 mb-1.5 flex items-center gap-2 text-xl font-bold md:text-2xl">
      <span className="text-sky-600 dark:text-sky-400">{icon}</span>
      {children}
    </h2>
  )
}

export function ArticlePageContent({
  article,
  shareUrl,
}: Readonly<{ article: Article; shareUrl: string }>) {
  const { lang, translation } = useLanguage()
  const text = translation.pages.articles
  const locale = toArticleLocale(lang)
  const { title, body, summary, lessons, cta } = article.content[locale]

  return (
    <PageContent className="gap-4">
      <Link
        href={`/${lang}/articles`}
        className="flex w-fit items-center gap-2 text-sm text-sky-700 dark:text-sky-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {text.backToList}
      </Link>

      <article className="flex flex-col gap-4">
        <Image
          src={article.cover}
          alt=""
          width={1200}
          height={630}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="aspect-[1200/630] w-full rounded-2xl object-cover"
        />
        <header>
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

        {/* Single child inside the Card so its flex gap does not add extra space between paragraphs. */}
        <Card className="border-0 bg-white px-6 py-4 backdrop-blur-sm dark:bg-black/50">
          <div>
            {summary.length > 0 && (
              <section className="mt-2 mb-6 rounded-xl border-l-4 border-sky-500 bg-sky-500/10 px-4 py-2">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  {text.summaryTitle}
                </h2>
                <ReactMarkdown components={markdownComponents}>
                  {summary.map(item => `- ${item}`).join('\n')}
                </ReactMarkdown>
              </section>
            )}

            <ReactMarkdown components={markdownComponents}>{body}</ReactMarkdown>

            {lessons.length > 0 && (
              <section>
                <SectionTitle icon={<Lightbulb className="h-6 w-6" />}>
                  {text.lessonsTitle}
                </SectionTitle>
                <ReactMarkdown components={markdownComponents}>
                  {lessons
                    .map((lesson, index) => `${index + 1}. ${lesson}`)
                    .join('\n')}
                </ReactMarkdown>
              </section>
            )}

            {article.references && article.references.length > 0 && (
              <section>
                <SectionTitle icon={<BookMarked className="h-6 w-6" />}>
                  {text.referencesTitle}
                </SectionTitle>
                <ul className="my-2 list-disc space-y-1 pl-6 leading-7">
                  {article.references.map(reference => (
                    <li key={reference.url}>
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-700 underline underline-offset-4 dark:text-sky-400"
                      >
                        {reference.title}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </Card>

        <ShareButtons url={shareUrl} title={title} />

        <Card className="flex-col items-center gap-3 border-white/10 bg-white/10 px-6 py-5 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:text-left dark:bg-black/25">
          <p className="text-lg font-semibold">{cta ?? text.ctaDefault}</p>
          <Button asChild>
            <Link href={`/${lang}/contact`}>{text.ctaButton}</Link>
          </Button>
        </Card>
      </article>
    </PageContent>
  )
}
