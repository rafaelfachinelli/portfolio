'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
  const { dictionary } = useLanguage();

  return (
    <div>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-[-.01em] text-center sm:text-left">
        {dictionary.pages.home.title}
      </h1>
      <p className="text-2xl sm:text-4xl font-semibold tracking-[-.01em] text-center sm:text-left">
        {dictionary.pages.home.description}
      </p>
    </div>
  );
}
