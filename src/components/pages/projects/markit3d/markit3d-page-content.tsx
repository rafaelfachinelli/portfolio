'use client'

import { Presentation } from 'lucide-react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function Markit3DPageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        icon={Presentation}
        title={translation.pages.projects.title}
        description={translation.pages.projects.description}
      />

      <PageContent className="gap-4">
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
