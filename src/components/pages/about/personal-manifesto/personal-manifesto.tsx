'use client'

import ReactMarkdown from 'react-markdown'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

export function PersonalManifestoPageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        title={translation.pages.about.personalManifesto.title}
        description={translation.pages.about.personalManifesto.description}
      />

      <PageContent className="gap-2 text-justify">
        {translation.pages.about.personalManifesto.content.map(
          (paragraph: string, index: number) => (
            <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
          ),
        )}
      </PageContent>
    </>
  )
}
