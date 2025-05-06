'use client'

import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export function UnderConstructionPageAlert() {
  const { dictionary } = useLanguage()

  return (
    <Alert variant="warning">
      <Construction className="mr-2 h-4 w-4" />
      <AlertTitle>
        {dictionary.commons.underConstructionAlert.title}
        <motion.span
          className="ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          ...
        </motion.span>
      </AlertTitle>
      <AlertDescription>
        {dictionary.commons.underConstructionAlert.description}
      </AlertDescription>
    </Alert>
  )
}
