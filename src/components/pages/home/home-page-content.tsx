'use client'

import React from 'react'

import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { PageContent } from '@/components/ui/page-content'
import { useLanguage } from '@/contexts/LanguageContext'

export function HomePageContent() {
  const { dictionary } = useLanguage()

  const personalitiesText = dictionary.pages.home.personalities
  const [beforePlaceholder, afterPlaceholder] =
    personalitiesText.split('{personality}')

  return (
    <PageContent>
      <div className="text-center text-2xl sm:text-left sm:text-4xl">
        {beforePlaceholder}
        <AnimatedTextCycle
          words={[
            dictionary.commons.experience,
            dictionary.commons.collaboration,
            dictionary.commons.leadership,
            dictionary.commons.communication,
            dictionary.commons.adaptability,
            dictionary.commons.innovation,
          ]}
          interval={2000}
        />
        {afterPlaceholder}
      </div>

      <p className="text-center text-4xl font-bold sm:text-left sm:text-5xl">
        {dictionary.pages.home.title}
      </p>
      <p className="text-center text-2xl font-semibold sm:text-left sm:text-4xl">
        {dictionary.pages.home.description}
      </p>
    </PageContent>
  )
}
