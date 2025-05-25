'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function ResumePageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        title={translation.pages.about.resume.title}
        description={translation.pages.about.resume.description}
      />

      <PageContent className="gap-4">
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
