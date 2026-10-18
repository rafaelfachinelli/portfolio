import { File } from 'lucide-react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'

import type { Translation } from '../../../../../get-translation'
import { ResumeDownloadButton } from './resume-download-button'

export function ResumePageContent({
  translation,
}: Readonly<{ translation: Translation }>) {
  const text = translation.pages.about.resume

  return (
    <>
      <PageTitle
        icon={File}
        title={text.title}
        description={text.description}
      />

      <PageContent className="items-center gap-4">
        <ResumeDownloadButton
          title={text.title}
          downloadDescription={text.downloadDescription}
          downloadLabel={text.download}
          fileName={text.file.name}
        />
      </PageContent>
    </>
  )
}
