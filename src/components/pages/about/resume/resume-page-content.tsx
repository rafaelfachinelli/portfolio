'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function ResumePageContent() {
  const { dictionary } = useLanguage()

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.resume.title}
        description={dictionary.pages.about.resume.description}
      />

      <PageContent className="gap-4">
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
