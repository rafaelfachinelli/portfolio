import { ProjectCaseStudyPage } from '@/components/pages/projects/shared/project-case-study-page'

import type { Translation } from '../../../../../get-translation'

const HERO_LOGO = '/images/customers/markit3d-wordmark.svg'

export function Markit3DPageContent({
  lang,
  translation,
}: Readonly<{ lang: string; translation: Translation }>) {
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
