'use client'

import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { PageContent } from '@/components/ui/page-content'
import { useLanguage } from '@/contexts/LanguageContext'

export function HomePageContent() {
  const { translation } = useLanguage()

  const personalitiesText = translation.pages.home.personalities
  const [beforePlaceholder, afterPlaceholder] =
    personalitiesText.split('{personality}')

  return (
    <PageContent className="gap-4">
      <div className="text-center text-2xl sm:text-left sm:text-4xl">
        {beforePlaceholder}
        <AnimatedTextCycle
          words={[
            translation.commons.experience,
            translation.commons.collaboration,
            translation.commons.leadership,
            translation.commons.communication,
            translation.commons.adaptability,
            translation.commons.innovation,
          ]}
          interval={2000}
        />
        {afterPlaceholder}
      </div>

      <p className="text-center text-4xl font-bold sm:text-left sm:text-5xl">
        {translation.pages.home.title}
      </p>
      <p className="text-center text-2xl font-semibold sm:text-left sm:text-4xl">
        {translation.pages.home.description}
      </p>
    </PageContent>
  )
}
