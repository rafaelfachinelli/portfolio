'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function MePageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        title={translation.pages.about.me.title}
        description={translation.pages.about.me.description}
      />

      <PageContent className="gap-4">
        {translation.pages.about.me.content.map(
          (paragraph: string, index: number) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ),
        )}

        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
