import { Info } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'

import type { Translation } from '../../../../../get-translation'

export function MePageContent({
  translation,
}: Readonly<{ translation: Translation }>) {
  const text = translation.pages.about.me

  return (
    <>
      <PageTitle
        icon={Info}
        title={text.title}
        description={text.description}
      />

      <PageContent className="gap-4 text-justify">
        <Card className="mb-4 border-0 bg-white p-6 dark:bg-black/50">
          <p className="mb-3 font-medium">{text.entityStatement}</p>
          {text.content.map(paragraph => (
            <ReactMarkdown key={paragraph}>{paragraph}</ReactMarkdown>
          ))}
        </Card>
      </PageContent>
    </>
  )
}
