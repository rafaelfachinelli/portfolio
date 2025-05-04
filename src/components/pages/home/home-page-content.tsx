'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function HomePageContent() {
  const { dictionary } = useLanguage()

  return (
    <div>
      <h1 className="text-center text-4xl font-bold tracking-[-.01em] sm:text-left sm:text-6xl">
        {dictionary.pages.home.title}
      </h1>
      <p className="text-center text-2xl font-semibold tracking-[-.01em] sm:text-left sm:text-4xl">
        {dictionary.pages.home.description}
      </p>
    </div>
  )
}
