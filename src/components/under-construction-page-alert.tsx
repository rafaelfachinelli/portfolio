'use client'

import { motion } from 'framer-motion'
import { Construction, Heart } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export function UnderConstructionPageAlert() {
  const { dictionary } = useLanguage()

  return (
    <Alert variant="warning" className="mx-auto w-fit select-none">
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
      <AlertDescription className="flex items-center">
        {dictionary.commons.underConstructionAlert.description}
        <Heart
          className="ml-1 inline h-4 w-4 animate-pulse text-red-800"
          fill="#9f0712"
        />
      </AlertDescription>
    </Alert>
  )
}
