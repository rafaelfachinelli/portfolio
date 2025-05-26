'use client'

import { File } from 'lucide-react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

import { ResumeDownloadButton } from './resume-download-button'

export function ResumePageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        icon={File}
        title={translation.pages.about.resume.title}
        description={translation.pages.about.resume.description}
      />

      <PageContent className="gap-4">
        <div className="flex justify-center">
          <ResumeDownloadButton />
        </div>
      </PageContent>
    </>
  )
}
