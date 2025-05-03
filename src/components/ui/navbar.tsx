import Link from 'next/link';

export function Navbar({
  lang,
  dictionary,
}: Readonly<{
  lang: string;
  dictionary: {
    navbar: {
      title: string;
      home: string;
      about: string;
      works: string;
      contact: string;
    };
  };
}>) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">{dictionary.navbar.title}</div>
      <ul className="flex space-x-4">
        <li>
          <Link href={`/${lang}`} className="hover:underline">
            {dictionary.navbar.home}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/about`} className="hover:underline">
            {dictionary.navbar.about}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/works`} className="hover:underline">
            {dictionary.navbar.works}
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/contact`} className="hover:underline">
            {dictionary.navbar.contact}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
