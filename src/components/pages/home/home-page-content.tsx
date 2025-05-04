'use client'

import React from 'react'

import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { useLanguage } from '@/contexts/LanguageContext'

export function HomePageContent() {
  const { dictionary } = useLanguage()

  const personalitiesText = dictionary.pages.home.personalities
  const [beforePlaceholder, afterPlaceholder] =
    personalitiesText.split('{personality}')

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 sm:gap-8 sm:p-8">
      <h1 className={'text-center text-2xl sm:text-left sm:text-4xl'}>
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
      </h1>

      <p className="text-center text-4xl font-bold sm:text-left sm:text-5xl">
        {dictionary.pages.home.title}
      </p>
      <p className="text-center text-2xl font-semibold sm:text-left sm:text-4xl">
        {dictionary.pages.home.description}
      </p>
    </div>
  )
}
