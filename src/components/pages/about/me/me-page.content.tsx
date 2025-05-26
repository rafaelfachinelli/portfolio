'use client'

import { Info } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

export function MePageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        icon={Info}
        title={translation.pages.about.me.title}
        description={translation.pages.about.me.description}
      />

      <PageContent className="gap-4 text-justify">
        {translation.pages.about.me.content.map((paragraph, index) => (
          <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
        ))}

        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
