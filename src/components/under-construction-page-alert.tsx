'use client'

import { Construction } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export function UnderConstructionPageAlert() {
  const { dictionary } = useLanguage()

  return (
    <Alert variant="warning">
      <Construction className="mr-2 h-4 w-4" />
      <AlertTitle>{dictionary.commons.underConstructionAlert.title}</AlertTitle>
      <AlertDescription>
        {dictionary.commons.underConstructionAlert.description}
      </AlertDescription>
    </Alert>
  )
}
