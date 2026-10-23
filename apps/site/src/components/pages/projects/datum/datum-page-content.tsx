import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stat,
} from '@datum/ui'
import { BookOpen, ExternalLink, Github, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { articles } from '@/content/articles'
import {
  DATUM_ARTICLE_SLUG,
  DATUM_SOURCE_URL,
  DATUM_STACK,
  DATUM_STORYBOOK_URL,
  type DatumCopy,
} from '@/content/projects/datum'

import { PageContent } from '../../../ui/page-content'

type DatumPageContentProps = Readonly<{
  copy: DatumCopy
  /** Canonical locale (`pt-BR` or `en-US`). */
  locale: string
  projectsTitle: string
}>

const IMAGES = '/images/projects/datum'

/** A screenshot in a drafting frame, with its caption. */
function Shot({
  src,
  alt,
  caption,
  width,
  height,
  priority,
}: Readonly<{
  src: string
  alt: string
  caption: string
  width: number
  height: number
  priority?: boolean
}>) {
  return (
    <figure className="grid gap-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 480px, 100vw"
        priority={priority}
        className="border-line-strong w-full rounded-[var(--datum-radius-md)] border"
      />
      <figcaption className="text-ink-muted text-sm">{caption}</figcaption>
    </figure>
  )
}

export function DatumPageContent({
  copy,
  locale,
  projectsTitle,
}: DatumPageContentProps) {
  const article = articles.find(item => item.slug === DATUM_ARTICLE_SLUG)
  const { numbers } = copy

  return (
    <PageContent className="gap-12 pb-16">
      <header className="grid max-w-3xl gap-4">
        <nav aria-label="Breadcrumb">
          <ol className="text-ink-muted flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
            <li>
              <Link
                prefetch={false}
                href={`/${locale}/projects`}
                className="hover:text-ink underline-offset-4 hover:underline"
              >
                {projectsTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-season-accent">
              {copy.name}
            </li>
          </ol>
        </nav>
        <p className="text-season-accent font-mono text-xs tracking-[0.3em] uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="font-display flex items-center gap-3 text-4xl font-bold md:text-5xl">
          <Ruler
            className="text-season-accent size-9 shrink-0"
            aria-hidden="true"
          />
          {copy.name}
        </h1>
        <p className="text-ink-muted text-lg">{copy.lead}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={DATUM_STORYBOOK_URL} target="_blank" rel="noopener">
              {copy.actions.storybook}
              <ExternalLink />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={DATUM_SOURCE_URL} target="_blank" rel="noopener">
              <Github />
              {copy.actions.source}
            </a>
          </Button>
          {article && (
            <Button asChild variant="outline">
              <Link
                prefetch={false}
                href={`/${locale}/articles/${article.slug}`}
              >
                <BookOpen />
                {copy.actions.article}
              </Link>
            </Button>
          )}
        </div>
      </header>

      <section aria-labelledby="datum-numbers" className="grid gap-5">
        <h2 id="datum-numbers" className="font-display text-2xl font-bold">
          {numbers.title}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { value: '14', item: numbers.components },
            { value: '69', item: numbers.stories },
            { value: '8', item: numbers.seasons },
            { value: 'WCAG AA', item: numbers.contrast },
          ].map(({ value, item }) => (
            <li key={item.title}>
              <Card className="h-full py-5">
                <CardContent className="px-5">
                  <Stat
                    label={item.title}
                    value={value}
                    description={item.description}
                  />
                </CardContent>
              </Card>
            </li>
          ))}
          <li>
            <Card className="h-full py-5">
              <CardContent className="px-5">
                <Stat
                  label={numbers.lcp.title}
                  value={locale === 'pt-BR' ? '2,3 s' : '2.3 s'}
                  description={numbers.lcp.description}
                  trend={{
                    direction: 'down',
                    value: numbers.lcp.trend,
                    positive: true,
                    label: numbers.lcp.trendLabel,
                  }}
                />
              </CardContent>
            </Card>
          </li>
          <li>
            <Card className="h-full py-5">
              <CardContent className="px-5">
                <Stat
                  label={numbers.performance.title}
                  value="90+"
                  description={numbers.performance.description}
                  trend={{
                    direction: 'up',
                    value: numbers.performance.trend,
                    label: numbers.performance.trendLabel,
                  }}
                />
              </CardContent>
            </Card>
          </li>
        </ul>
      </section>

      <section aria-labelledby="datum-before-after" className="grid gap-5">
        <div className="grid max-w-3xl gap-2">
          <h2
            id="datum-before-after"
            className="font-display text-2xl font-bold"
          >
            {copy.beforeAfter.title}
          </h2>
          <p className="text-ink-muted">{copy.beforeAfter.lead}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Shot
            src={`${IMAGES}/antes.webp`}
            width={1440}
            height={900}
            alt={copy.beforeAfter.before.alt}
            caption={copy.beforeAfter.before.caption}
            priority
          />
          <Shot
            src={`${IMAGES}/depois.webp`}
            width={1440}
            height={900}
            alt={copy.beforeAfter.after.alt}
            caption={copy.beforeAfter.after.caption}
            priority
          />
        </div>
      </section>

      <section aria-labelledby="datum-seasons" className="grid gap-5">
        <div className="grid max-w-3xl gap-2">
          <h2 id="datum-seasons" className="font-display text-2xl font-bold">
            {copy.seasons.title}
          </h2>
          <p className="text-ink-muted">{copy.seasons.lead}</p>
        </div>
        <Image
          src={`${IMAGES}/temporadas.webp`}
          alt={copy.seasons.alt}
          width={1328}
          height={260}
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="border-line-strong w-full rounded-[var(--datum-radius-md)] border"
        />
      </section>

      <section aria-labelledby="datum-inside" className="grid gap-5">
        <h2 id="datum-inside" className="font-display text-2xl font-bold">
          {copy.inside.title}
        </h2>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ul className="grid gap-4 sm:grid-cols-2">
            {copy.inside.items.map(item => (
              <li key={item.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle asChild>
                      <h3>{item.title}</h3>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
          <Shot
            src={`${IMAGES}/storybook.webp`}
            width={1440}
            height={900}
            alt={copy.inside.storybook.alt}
            caption={copy.inside.storybook.caption}
          />
        </div>
      </section>

      <section aria-labelledby="datum-stack" className="grid gap-4">
        <h2 id="datum-stack" className="font-display text-2xl font-bold">
          {copy.stack.title}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {DATUM_STACK.map(name => (
            <li key={name}>
              <Badge variant="outline">{name}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>{copy.cta.title}</h2>
          </CardTitle>
          <CardDescription>{copy.cta.text}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={DATUM_STORYBOOK_URL} target="_blank" rel="noopener">
              {copy.actions.storybook}
              <ExternalLink />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={DATUM_SOURCE_URL} target="_blank" rel="noopener">
              <Github />
              {copy.actions.source}
            </a>
          </Button>
        </CardContent>
      </Card>
    </PageContent>
  )
}
