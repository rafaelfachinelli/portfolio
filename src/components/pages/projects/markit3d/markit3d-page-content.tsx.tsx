'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function Markit3DPageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-4xl font-bold">{dictionary.pages.projects.title}</h1>
      <p className="text-lg">{dictionary.pages.projects.description}</p>
    </div>
  )
}
