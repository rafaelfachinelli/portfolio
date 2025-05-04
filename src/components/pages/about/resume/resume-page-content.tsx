'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function ResumePageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {dictionary.pages.about.resume.title}
      </h1>
      <p className="text-lg">{dictionary.pages.about.resume.description}</p>
    </div>
  )
}
