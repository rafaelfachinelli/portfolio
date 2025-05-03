import { Locale } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-.01em] text-center sm:text-left">
          {dictionary.home.welcome}
        </h1>
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-.01em] text-center sm:text-left">
          {dictionary.home.description}
        </h2>
      </main>
    </div>
  );
}
