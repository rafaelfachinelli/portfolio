'use client'

import { Info } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
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
        <Card className="mb-4 border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
          {translation.pages.about.me.content.map((paragraph, index) => (
            <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>
          ))}
        </Card>
      </PageContent>
    </>
  )
}
