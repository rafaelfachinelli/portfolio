'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { useLanguage } from '@/contexts/LanguageContext'

export function HomePageContent() {
  const { translation } = useLanguage()

  const personalitiesText = translation.pages.home.personalities
  const [beforePlaceholder, afterPlaceholder] =
    personalitiesText.split('{personality}')

  return (
    <PageContent className="gap-4 pb-16">
      <div className="mt-10 text-center text-2xl sm:text-left sm:text-4xl">
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

      <p className="mt-16 text-center text-4xl font-bold sm:text-left sm:text-5xl">
        {translation.pages.home.title}
      </p>
      <p className="mt-8 mb-16 text-center text-2xl font-semibold sm:text-left sm:text-4xl">
        {translation.pages.home.description}
      </p>

      <div className="flex w-full flex-col items-center gap-18">
        {/* New Projects Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <Card className="flex w-full flex-col items-center gap-4 p-6 sm:items-start">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {translation.pages.home.projectsTitle}
            </h2>
            <p className="text-center text-xl sm:text-left sm:text-2xl">
              {translation.pages.home.projectsOverview}
            </p>
            <Link href="/projects/more">
              <Button className="cursor-pointer">
                {translation.pages.home.viewProjectsButton}
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* New About Me Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <Card className="flex w-full flex-col items-center gap-4 p-6 sm:items-start">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {translation.pages.home.aboutMeTitle}
            </h2>
            <p className="text-center text-xl sm:text-left sm:text-2xl">
              {translation.pages.home.aboutMeOverview}
            </p>
            <Link href="/about/me">
              <Button className="cursor-pointer">
                {translation.pages.home.viewAboutButton}
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* New Contact Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <Card className="flex w-full flex-col items-center gap-4 p-6 sm:items-start">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {translation.pages.home.contactTitle}
            </h2>
            <p className="text-center text-xl sm:text-left sm:text-2xl">
              {translation.pages.home.contactOverview}
            </p>
            <Link href="/contact">
              <Button className="cursor-pointer">
                {translation.pages.home.contactButton}
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </PageContent>
  )
}
