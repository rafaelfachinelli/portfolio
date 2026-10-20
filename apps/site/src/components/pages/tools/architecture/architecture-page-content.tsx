import { Button, Card, CardContent } from '@datum/ui'
import { BookOpen, ChevronDown, Workflow } from 'lucide-react'
import Link from 'next/link'

import { articles } from '@/content/articles'
import {
  ARCHITECTURE_ARTICLE_SLUG,
  type ArchitectureCopy,
} from '@/content/tools/architecture'
import type { Answers } from '@/lib/tools/architecture/questions'

import { PageContent } from '../../../ui/page-content'
import { ArchitectureTool } from './architecture-tool'

type ArchitecturePageContentProps = Readonly<{
  copy: ArchitectureCopy
  /** Canonical locale (`pt-BR` or `en-US`). */
  locale: string
  toolsTitle: string
  initialAnswers?: Answers
  shared?: boolean
}>

export function ArchitecturePageContent({
  copy,
  locale,
  toolsTitle,
  initialAnswers,
  shared,
}: ArchitecturePageContentProps) {
  const article = articles.find(item => item.slug === ARCHITECTURE_ARTICLE_SLUG)

  return (
    <div data-layout="wide">
      <PageContent className="gap-10 pb-16">
        <header className="grid max-w-3xl gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="text-ink-muted flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <li>
                <Link
                  prefetch={false}
                  href={`/${locale}/tools`}
                  className="hover:text-ink underline-offset-4 hover:underline"
                >
                  {toolsTitle}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-season-accent">
                {copy.name}
              </li>
            </ol>
          </nav>
          <h1 className="font-display flex items-center gap-3 text-4xl font-bold md:text-5xl">
            <Workflow
              className="text-season-accent size-9 shrink-0"
              aria-hidden="true"
            />
            {copy.name}
          </h1>
          <p className="text-ink-muted text-lg">{copy.lead}</p>
          <p className="text-ink-subtle text-sm">{copy.disclaimer}</p>
        </header>

        <ArchitectureTool
          copy={copy}
          locale={locale}
          initialAnswers={initialAnswers}
          shared={shared}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <section
            aria-labelledby="how-it-works"
            className="grid content-start gap-4"
          >
            <h2 id="how-it-works" className="font-display text-2xl font-bold">
              {copy.howItWorks.title}
            </h2>
            {copy.howItWorks.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-ink-muted leading-7">
                {paragraph}
              </p>
            ))}
            {article && (
              <Card className="mt-2">
                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-medium">
                    <BookOpen
                      className="text-season-accent size-5"
                      aria-hidden="true"
                    />
                    {copy.ui.articleCta}
                  </p>
                  <Button asChild variant="outline">
                    <Link
                      prefetch={false}
                      href={`/${locale}/articles/${article.slug}`}
                    >
                      {copy.ui.articleLink}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          <section aria-labelledby="faq" className="grid content-start gap-4">
            <h2 id="faq" className="font-display text-2xl font-bold">
              FAQ
            </h2>
            <div className="grid gap-2">
              {copy.faq.map(item => (
                <details
                  key={item.question}
                  className="group border-line-strong rounded-[var(--datum-radius-md)] border"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium">
                    <h3>{item.question}</h3>
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="text-ink-muted px-4 pb-4 leading-7">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </PageContent>
    </div>
  )
}
