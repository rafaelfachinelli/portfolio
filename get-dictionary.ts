import 'server-only';
import type { Locale } from './i18n-config';
import type enUS from './dictionaries/en-US.json';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types

export type Dictionary = typeof enUS;

type Dictionaries = {
  [key in Locale]: () => Promise<Dictionary>;
};

const dictionaries: Dictionaries = {
  'en-US': () =>
    import('./dictionaries/en-US.json').then((module) => module.default),
  en: () =>
    import('./dictionaries/en-US.json').then((module) => module.default),
  pt: () =>
    import('./dictionaries/pt-BR.json').then((module) => module.default),
  'pt-BR': () =>
    import('./dictionaries/pt-BR.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries['en']();
