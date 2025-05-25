'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function ContactPageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        title={translation.pages.contact.title}
        description={translation.pages.contact.description}
      />

      <PageContent className="gap-4">
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
