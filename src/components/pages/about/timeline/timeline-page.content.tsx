'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function TimelinePageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {dictionary.pages.about.timeline.title}
      </h1>
      <p className="text-lg">{dictionary.pages.about.timeline.description}</p>
    </div>
  )
}
