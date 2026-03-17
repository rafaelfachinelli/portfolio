'use client'

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Compass,
  Network,
  Presentation,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Wrench,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ProjectCaseStudySection } from '@/components/pages/projects/instalacoes-e-reformas/project-case-study-section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { useLanguage } from '@/contexts/LanguageContext'

const HERO_LOGO =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/leroy_merlin_logo.svg'
const OVERVIEW_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_2.png'
const SCOPE_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_1.png'
const RESULTS_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_3.png'

function formatTemporalMarkDate(value: string, locale: string) {
  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function InstalacoesEReformasPageContent() {
  const { lang, translation } = useLanguage()
  const project = translation.pages.projects.instalacoesEReformas
  const formattedTemporalMarkDate = formatTemporalMarkDate(
    project.hero.temporalMarkDate,
    lang,
  )

  return (
    <PageContent className="gap-6 pb-16">
      <Card className="overflow-hidden py-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="p-6 md:p-8">
            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm font-medium tracking-[0.2em] uppercase">
              <Presentation className="h-4 w-4 text-blue-500" />
              <span>{project.hero.eyebrow}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>

            <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-8 text-pretty">
              {project.hero.subtitle}
            </p>

            <p className="text-muted-foreground mt-4 max-w-3xl leading-7 text-pretty">
              {project.hero.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm shadow-sm">
                <CalendarDays className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">
                  {project.hero.temporalMarkLabel}
                </span>
                <span className="font-medium">{formattedTemporalMarkDate}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.hero.highlights.map(highlight => (
                <Badge key={highlight} variant="outline" className="rounded-full">
                  {highlight}
                </Badge>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href={`/${lang}/about/resume`}>
                  {translation.pages.about.resume.download}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-muted/20 border-t p-6 lg:border-t-0 lg:border-l">
            <div className="flex h-full items-center justify-center rounded-2xl border bg-background p-8">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <Image
                src={HERO_LOGO}
                alt={project.hero.logoAlt}
                width={220}
                height={134}
                className="h-auto w-full max-w-[220px]"
                priority
              />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <ProjectCaseStudySection
        icon={Compass}
        iconClassName="bg-sky-500/15 text-sky-600 dark:text-sky-400"
        title={project.overview.title}
        intro={project.overview.intro}
        paragraphs={project.overview.paragraphs}
        imageSrc={OVERVIEW_IMAGE}
        imageAlt={project.imageCaptions.overview}
        imageCaption={project.imageCaptions.overview}
      />

      <ProjectCaseStudySection
        icon={Target}
        iconClassName="bg-rose-500/15 text-rose-600 dark:text-rose-400"
        title={project.businessProblem.title}
        intro={project.businessProblem.intro}
        paragraphs={project.businessProblem.paragraphs}
      />

      <ProjectCaseStudySection
        icon={Network}
        iconClassName="bg-violet-500/15 text-violet-600 dark:text-violet-400"
        title={project.scopeAndComplexity.title}
        intro={project.scopeAndComplexity.intro}
        paragraphs={project.scopeAndComplexity.paragraphs}
        items={project.scopeAndComplexity.items}
        imageSrc={SCOPE_IMAGE}
        imageAlt={project.imageCaptions.scopeAndComplexity}
        imageCaption={project.imageCaptions.scopeAndComplexity}
      />

      <ProjectCaseStudySection
        icon={BriefcaseBusiness}
        iconClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        title={project.myRole.title}
        intro={project.myRole.intro}
        paragraphs={project.myRole.paragraphs}
        items={project.myRole.items}
      />

      <ProjectCaseStudySection
        icon={Wrench}
        iconClassName="bg-slate-500/15 text-slate-700 dark:text-slate-300"
        title={project.architecture.title}
        intro={project.architecture.intro}
        paragraphs={project.architecture.paragraphs}
        items={project.architecture.items}
        badgesLabel={project.architecture.technologiesLabel}
        badges={project.architecture.technologies}
      />

      <ProjectCaseStudySection
        icon={Sparkles}
        iconClassName="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        title={project.contributions.title}
        intro={project.contributions.intro}
        paragraphs={project.contributions.paragraphs}
        items={project.contributions.items}
      />

      <ProjectCaseStudySection
        icon={ShieldCheck}
        iconClassName="bg-red-500/15 text-red-600 dark:text-red-400"
        title={project.challenges.title}
        intro={project.challenges.intro}
        paragraphs={project.challenges.paragraphs}
        items={project.challenges.items}
      />

      <ProjectCaseStudySection
        icon={Trophy}
        iconClassName="bg-yellow-500/15 text-yellow-700 dark:text-yellow-300"
        title={project.results.title}
        intro={project.results.intro}
        paragraphs={project.results.paragraphs}
        items={project.results.items}
        imageSrc={RESULTS_IMAGE}
        imageAlt={project.imageCaptions.results}
        imageCaption={project.imageCaptions.results}
      />

      <ProjectCaseStudySection
        icon={BookOpen}
        iconClassName="bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
        title={project.learnings.title}
        intro={project.learnings.intro}
        paragraphs={project.learnings.paragraphs}
        items={project.learnings.items}
      />

      <Card>
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-500">
              {project.nextStep.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold">{project.nextStep.title}</h2>
            <p className="text-muted-foreground max-w-2xl leading-7 text-pretty">
              {project.nextStep.description}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href={`/${lang}/contact`}>
              {project.nextStep.buttonLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageContent>
  )
}
