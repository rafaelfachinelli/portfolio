'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function ContactPageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-4xl font-bold">{dictionary.pages.contact.title}</h1>
      <p className="text-lg">{dictionary.pages.contact.description}</p>
    </div>
  )
}
