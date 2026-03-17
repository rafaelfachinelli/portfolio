'use client'

import type { Variants } from 'framer-motion'
import { BriefcaseBusiness, Building2, FolderKanban, Network } from 'lucide-react'

import { PageContent } from '@/components/ui/page-content'
import { useLanguage } from '@/contexts/LanguageContext'

import { CountUpMetricValue } from './count-up-metric-value'
import { HomeCtaSection } from './home-cta-section'
import { HomeCustomersSection } from './home-customers-section'
import { HomeHeroSection } from './home-hero-section'
import { HomeMetricsSection } from './home-metrics-section'
import { HomeProjectsSection } from './home-projects-section'
import { HomeResumeCard } from './home-resume-card'

const EXPERIENCE_START_DATE = '2021-02-22'

function getYearsOfExperience(fromDate: string) {
  const start = new Date(`${fromDate}T00:00:00`)
  const now = new Date()
  const years = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.2425)

  return Math.max(0, years)
}

export function HomePageContent() {
  const { lang, translation } = useLanguage()

  const personalitiesText = translation.pages.home.personalities
  const [beforePlaceholder, afterPlaceholder] =
    personalitiesText.split('{personality}')
  const home = translation.pages.home
  const yearsOfExperience = getYearsOfExperience(EXPERIENCE_START_DATE)

  const metrics = [
    {
      icon: BriefcaseBusiness,
      value: (
        <CountUpMetricValue
          endValue={yearsOfExperience}
          lang={lang}
          decimals={1}
          suffix="+"
        />
      ),
      label: home.metrics.yearsExperience.label,
      description: home.metrics.yearsExperience.description,
    },
    {
      icon: FolderKanban,
      value: (
        <CountUpMetricValue endValue={30} lang={lang} decimals={0} suffix="+" />
      ),
      label: home.metrics.repositories.label,
      description: home.metrics.repositories.description,
    },
    {
      icon: Network,
      value: (
        <CountUpMetricValue endValue={40} lang={lang} decimals={0} suffix="+" />
      ),
      label: home.metrics.microservices.label,
      description: home.metrics.microservices.description,
    },
    {
      icon: Building2,
      value: <CountUpMetricValue endValue={3} lang={lang} decimals={0} />,
      label: home.metrics.clients.label,
      description: home.metrics.clients.description,
    },
  ]

  const customers = [
    {
      image: '/images/customers/leroy-merlin-wordmark.svg',
      alt: 'Leroy Merlin',
      name: home.clients.leroyMerlin.name,
      description: home.clients.leroyMerlin.description,
    },
    {
      image: '/images/customers/markit3d-wordmark.svg',
      alt: 'Markit3D',
      name: home.clients.markit3d.name,
      description: home.clients.markit3d.description,
    },
    {
      image: '/images/customers/flex-wordmark.svg',
      alt: 'Flex',
      name: home.clients.flex.name,
      description: home.clients.flex.description,
    },
  ]

  const featuredProjects = [
    {
      href: `/${lang}/projects/leroy-merlin-instala`,
      title: home.featuredProjects.leroyMerlinInstala.title,
      description: home.featuredProjects.leroyMerlinInstala.description,
      tags: home.featuredProjects.leroyMerlinInstala.tags,
    },
    {
      href: `/${lang}/projects/markit3d`,
      title: home.featuredProjects.markit3d.title,
      description: home.featuredProjects.markit3d.description,
      tags: home.featuredProjects.markit3d.tags,
    },
    {
      href: `/${lang}/projects/flex-sewing-machine`,
      title: home.featuredProjects.flexSewingMachine.title,
      description: home.featuredProjects.flexSewingMachine.description,
      tags: home.featuredProjects.flexSewingMachine.tags,
    },
  ]

  const ctaCards = [
    {
      eyebrow: home.aboutEyebrow,
      title: home.aboutMeTitle,
      description: home.aboutMeOverview,
      buttonLabel: home.viewAboutButton,
      href: `/${lang}/about/me`,
      buttonVariant: 'default' as const,
    },
    {
      eyebrow: home.contactEyebrow,
      title: home.contactTitle,
      description: home.contactOverview,
      buttonLabel: home.contactButton,
      href: `/${lang}/contact`,
      buttonVariant: 'outline' as const,
    },
  ]

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <PageContent className="relative gap-8 pb-16 md:gap-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        <HomeHeroSection
          lang={lang}
          eyebrow={home.eyebrow}
          availability={home.availability}
          intro={home.intro}
          heroTitle={home.heroTitle}
          heroSubtitle={home.heroSubtitle}
          heroSupporting={home.heroSupporting}
          beforePlaceholder={beforePlaceholder}
          afterPlaceholder={afterPlaceholder}
          animatedWords={[
            translation.commons.experience,
            translation.commons.collaboration,
            translation.commons.leadership,
            translation.commons.communication,
            translation.commons.adaptability,
            translation.commons.innovation,
          ]}
          viewProjectsButton={home.viewProjectsButton}
          contactButton={home.contactButton}
          variants={sectionVariants}
        />

        <HomeResumeCard
          title={translation.pages.about.resume.title}
          cardTitle={home.resumeCardTitle}
          description={home.resumeCardDescription}
          buttonLabel={home.viewResumeButton}
          variants={sectionVariants}
        />
      </div>

      <HomeMetricsSection metrics={metrics} variants={sectionVariants} />

      <HomeCustomersSection
        eyebrow={home.clientsEyebrow}
        title={home.clientsTitle}
        subtitle={home.clientsSubtitle}
        customers={customers}
        variants={sectionVariants}
      />

      <HomeProjectsSection
        eyebrow={home.projectsEyebrow}
        title={home.projectsTitle}
        overview={home.projectsOverview}
        featuredProjects={featuredProjects}
        viewProjectDetailsButton={home.viewProjectDetailsButton}
        viewAllProjectsButton={home.viewAllProjectsButton}
        allProjectsHref={`/${lang}/projects/more`}
        variants={sectionVariants}
      />

      <HomeCtaSection cards={ctaCards} variants={sectionVariants} />
    </PageContent>
  )
}
