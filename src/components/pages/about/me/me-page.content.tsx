'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

export function MePageContent() {
  const { dictionary } = useLanguage()

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.me.title}
        description={dictionary.pages.about.me.description}
      />

      <PageContent className="gap-4">
        {dictionary.pages.about.me.content.map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
          </p>
        ))}
      </PageContent>
    </>
  )
}
