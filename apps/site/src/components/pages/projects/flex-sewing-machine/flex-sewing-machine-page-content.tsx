'use client'

import { ProjectCaseStudyPage } from '@/components/pages/projects/shared/project-case-study-page'
import { useLanguage } from '@/contexts/LanguageContext'

const HERO_LOGO = '/images/customers/flex-wordmark.svg'

export function FlexSewingMachinePageContent() {
  const { lang, translation } = useLanguage()

  return (
    <ProjectCaseStudyPage
      lang={lang}
      resumeButtonLabel={translation.pages.about.resume.download}
      project={translation.pages.projects.flexSewingMachine}
      nextStep={translation.pages.projects.caseStudyNextStep}
      heroLogoSrc={HERO_LOGO}
    />
  )
}
