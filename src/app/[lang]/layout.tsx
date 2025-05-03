import '../globals.css';
import { Navbar } from '@/components/ui/navbar';
import { getDictionary } from '../../../get-dictionary';
import { Locale } from '../../../i18n-config';

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
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar lang={lang} dictionary={dictionary} />
        {children}
      </body>
    </html>
  );
}
