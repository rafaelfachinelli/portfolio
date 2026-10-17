'use client'

import { ProjectCaseStudyPage } from '@/components/pages/projects/shared/project-case-study-page'
import { useLanguage } from '@/contexts/LanguageContext'

const HERO_LOGO = '/images/customers/markit3d-wordmark.svg'

export function Markit3DPageContent() {
  const { lang, translation } = useLanguage()

  return (
    <ProjectCaseStudyPage
      lang={lang}
      resumeButtonLabel={translation.pages.about.resume.download}
      project={translation.pages.projects.markit3d}
      nextStep={translation.pages.projects.caseStudyNextStep}
      heroLogoSrc={HERO_LOGO}
    />
  )
}
