'use client'

import React, { createContext, useContext } from 'react'

import { Translation } from '../../get-translation'
import { Locale } from '../../i18n-config'

type LanguageContextType = {
  lang: Locale
  translation: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export const LanguageProvider = ({
  lang,
  translation,
  children,
}: {
  lang: Locale
  translation: Translation
  children: React.ReactNode
}) => {
  const contextValue = React.useMemo(
    () => ({ lang, translation }),
    [lang, translation],
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
