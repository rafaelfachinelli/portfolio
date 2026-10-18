import { ProjectCaseStudyPage } from '@/components/pages/projects/shared/project-case-study-page'

import type { Translation } from '../../../../../get-translation'

const HERO_LOGO = '/images/customers/flex-wordmark.svg'

export function FlexSewingMachinePageContent({
  lang,
  translation,
}: Readonly<{ lang: string; translation: Translation }>) {
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
