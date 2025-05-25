'use client'

import { motion } from 'framer-motion'
import { Merriweather } from 'next/font/google'
import ReactMarkdown from 'react-markdown'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function PersonalManifestoPageContent() {
  const { translation } = useLanguage()

  return (
    <>
      <PageTitle
        title={translation.pages.about.personalManifesto.title}
        description={translation.pages.about.personalManifesto.description}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <PageContent
          className={`gap-2 text-justify ${merriweather.className} leading-relaxed`}
        >
          {translation.pages.about.personalManifesto.content.map(
            (paragraph, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ReactMarkdown>{paragraph}</ReactMarkdown>
              </motion.div>
            ),
          )}
        </PageContent>
      </motion.div>
    </>
  )
}
