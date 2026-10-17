'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type HomeArticle = {
  href: string
  cover: string
  title: string
  description: string
  tags: string[]
  meta: string
}

type HomeArticlesSectionProps = {
  eyebrow: string
  title: string
  overview: string
  articles: HomeArticle[]
  readArticleButton: string
  viewAllArticlesButton: string
  allArticlesHref: string
  variants: Variants
}

export function HomeArticlesSection({
  eyebrow,
  title,
  overview,
  articles,
  readArticleButton,
  viewAllArticlesButton,
  allArticlesHref,
  variants,
}: Readonly<HomeArticlesSectionProps>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-5"
    >
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-[0.3em] text-white/60 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-white/75">{overview}</p>
      </div>

      <div
        className={
          articles.length >= 3
            ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
            : 'grid gap-4 md:grid-cols-2'
        }
      >
        {articles.map(article => (
          <Link
            key={article.href}
            href={article.href}
            className="group block focus-visible:outline-none"
          >
            <Card className="h-full overflow-hidden border-white/10 bg-black/50 p-0 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-sky-500 dark:bg-black/25">
              <Image
                src={article.cover}
                alt=""
                width={1200}
                height={630}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[1200/630] w-full object-cover"
              />
              <div className="flex flex-col gap-3 p-6">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/15 bg-white/5 text-white/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl leading-snug font-semibold text-white group-hover:text-sky-300">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-white/75">
                  {article.description}
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-white/60">
                  <span>{article.meta}</span>
                  <span className="flex items-center gap-1 font-medium text-sky-300">
                    {readArticleButton}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Button
        asChild
        variant="outline"
        className="cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
      >
        <Link href={allArticlesHref}>{viewAllArticlesButton}</Link>
      </Button>
    </motion.section>
  )
}
