'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function MePageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-4xl font-bold">{dictionary.pages.about.title}</h1>
      <p className="text-lg">{dictionary.pages.about.description}</p>
    </div>
  )
}
