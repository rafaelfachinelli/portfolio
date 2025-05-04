'use client';

import React, { createContext, useContext } from 'react';

import { Dictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';

type LanguageContextType = {
  lang: Locale;
  dictionary: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  lang,
  dictionary,
  children,
}: {
  lang: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) => {
  const contextValue = React.useMemo(
    () => ({ lang, dictionary }),
    [lang, dictionary]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
