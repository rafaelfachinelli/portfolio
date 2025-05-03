import '@/app/globals.css';
import { getDictionary } from '../../../get-dictionary';
import { Locale } from '../../../i18n-config';
import { Navbar } from '@/components/layout/navbar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { MainContent } from '@/components/layout/content';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="min-h-screen antialiased">
        <LanguageProvider lang={lang} dictionary={dictionary}>
          <Navbar />
          <MainContent>{children}</MainContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
