export const i18n = {
    defaultLocale: "en-US",
    locales: ["en-US", "pt-BR"],
} as const;
  
export type Locale = (typeof i18n)["locales"][number];
