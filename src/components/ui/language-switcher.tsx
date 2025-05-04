'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/contexts/LanguageContext'

import { Button } from './button'

export function LanguageSwitcher({
  className,
}: Readonly<{ className?: string }>) {
  const { lang, dictionary } = useLanguage()

  const getNewPath = (newLang: string) => {
    const currentPath = window.location.pathname
    return currentPath.replace(`/${lang}`, `/${newLang}`)
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <Image
              src={`https://flagcdn.com/w40/${lang === 'en' ? 'us' : 'br'}.png`}
              alt={lang}
              width={16}
              height={16}
            />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <Link href={getNewPath('en')} className="flex items-center">
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="en"
                width={16}
                height={16}
                className="mr-2 inline-block"
              />
              {dictionary.components.languageSwitcher.options.en.title}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href={getNewPath('pt')} className="flex items-center">
              <Image
                src="https://flagcdn.com/w40/br.png"
                alt="pt"
                width={16}
                height={16}
                className="mr-2 inline-block"
              />
              {dictionary.components.languageSwitcher.options.pt.title}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
