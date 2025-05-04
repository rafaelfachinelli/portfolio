'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function TimelinePageContent() {
  const { dictionary } = useLanguage()

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.timeline.title}
        description={dictionary.pages.about.timeline.description}
      />

      <PageContent className="gap-4">
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
