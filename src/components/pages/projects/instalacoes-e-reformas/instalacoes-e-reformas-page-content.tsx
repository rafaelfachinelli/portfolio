'use client'
import { ProjectCaseStudyPage } from '@/components/pages/projects/shared/project-case-study-page'
import { useLanguage } from '@/contexts/LanguageContext'

const HERO_LOGO =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/leroy_merlin_logo.svg'
const OVERVIEW_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_2.png'
const SCOPE_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_1.png'
const RESULTS_IMAGE =
  '/images/projects/instalacoes_e_reformas_leroy_merlin/evidence_3.png'

export function InstalacoesEReformasPageContent() {
  const { lang, translation } = useLanguage()
  const project = translation.pages.projects.instalacoesEReformas

  return (
    <ProjectCaseStudyPage
      lang={lang}
      resumeButtonLabel={translation.pages.about.resume.download}
      project={project}
      nextStep={translation.pages.projects.caseStudyNextStep}
      heroLogoSrc={HERO_LOGO}
      sections={{
        overview: {
          imageSrc: OVERVIEW_IMAGE,
          imageAlt: project.imageCaptions.overview,
          imageCaption: project.imageCaptions.overview,
        },
        scopeAndComplexity: {
          imageSrc: SCOPE_IMAGE,
          imageAlt: project.imageCaptions.scopeAndComplexity,
          imageCaption: project.imageCaptions.scopeAndComplexity,
        },
        results: {
          imageSrc: RESULTS_IMAGE,
          imageAlt: project.imageCaptions.results,
          imageCaption: project.imageCaptions.results,
        },
      }}
    />
  )
}
