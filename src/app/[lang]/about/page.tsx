import { Locale } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';

export default async function About({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold">{dictionary.about.title}</h1>
      <p className="text-lg">{dictionary.about.description}</p>
    </div>
  );
}
