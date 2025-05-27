'use client'

import { motion } from 'framer-motion'
import { Scroll } from 'lucide-react'
import { Merriweather } from 'next/font/google'
import ReactMarkdown from 'react-markdown'

import { Card } from '@/components/ui/card'
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
        icon={Scroll}
        title={translation.pages.about.personalManifesto.title}
        description={translation.pages.about.personalManifesto.description}
      />

      <PageContent
        className={`gap-2 text-justify ${merriweather.className} leading-relaxed`}
      >
        <Card className="mb-4 border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {translation.pages.about.personalManifesto.content.map(
              (paragraph, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ReactMarkdown>{paragraph}</ReactMarkdown>
                </motion.div>
              ),
            )}
          </motion.div>
        </Card>
      </PageContent>
    </>
  )
}
