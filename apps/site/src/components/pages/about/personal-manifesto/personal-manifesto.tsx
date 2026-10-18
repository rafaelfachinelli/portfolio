import { Scroll } from 'lucide-react'
import { Merriweather } from 'next/font/google'
import ReactMarkdown from 'react-markdown'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'

import type { Translation } from '../../../../../get-translation'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
})

export function PersonalManifestoPageContent({
  translation,
}: Readonly<{ translation: Translation }>) {
  const text = translation.pages.about.personalManifesto

  return (
    <>
      <PageTitle
        icon={Scroll}
        title={text.title}
        description={text.description}
      />

      <PageContent
        className={`gap-2 text-justify ${merriweather.className} leading-relaxed`}
      >
        <Card className="mb-4 border-0 bg-white p-6 dark:bg-black/50">
          <div>
            {text.content.map(paragraph => (
              <ReactMarkdown key={paragraph}>{paragraph}</ReactMarkdown>
            ))}
          </div>
        </Card>
      </PageContent>
    </>
  )
}
