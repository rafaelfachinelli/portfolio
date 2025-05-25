'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

export function PersonalManifestoPageContent() {
  const { dictionary } = useLanguage()

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.personalManifesto.title}
        description={dictionary.pages.about.personalManifesto.description}
      />

      <PageContent className="gap-4">
        {dictionary.pages.about.personalManifesto.content.map(
          (paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ),
        )}
      </PageContent>
    </>
  )
}
