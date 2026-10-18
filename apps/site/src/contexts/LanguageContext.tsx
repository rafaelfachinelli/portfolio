'use client'

import React, { createContext, useContext } from 'react'

import { Translation } from '../../get-translation'
import { Locale } from '../../i18n-config'

/**
 * The texts shared by the layout's client components (navbar, sidebar,
 * language switcher). Page texts are passed as props from each server page, so
 * the whole dictionary is not serialized into every page.
 */
export type ClientTranslation = Pick<Translation, 'commons' | 'components'>

type LanguageContextType = {
  lang: Locale
  translation: ClientTranslation
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
  translation: ClientTranslation
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
