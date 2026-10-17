import 'server-only'

import type { Locale } from './i18n-config'
import type enUS from './translations/en-US.json'

// We enumerate all translations here for better linting and typescript support
// We also get the default import for cleaner types

export type Translation = typeof enUS

type Translations = {
  [key in Locale]: () => Promise<Translation>
}

const translations: Translations = {
  'en-US': () =>
    import('./translations/en-US.json').then(module => module.default),
  en: () => import('./translations/en-US.json').then(module => module.default),
  pt: () => import('./translations/pt-BR.json').then(module => module.default),
  'pt-BR': () =>
    import('./translations/pt-BR.json').then(module => module.default),
}

export const getTranslation = async (locale: Locale): Promise<Translation> =>
  translations[locale]?.() ?? translations['en']()
