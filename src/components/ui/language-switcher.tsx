'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

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
  const pathname = usePathname()
  const router = useRouter()

  const getNewPath = (newLang: string) => {
    return pathname.replace(`/${lang}`, `/${newLang}`)
  }

  const handleLanguageChange = (newLang: string) => {
    const newPath = getNewPath(newLang)
    router.push(newPath, { scroll: false })
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full select-none"
          >
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
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center"
            onClick={() => handleLanguageChange('en')}
          >
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="en"
              width={16}
              height={16}
              className="mr-2 inline-block"
            />
            {dictionary.components.languageSwitcher.options.en.title}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center"
            onClick={() => handleLanguageChange('pt')}
          >
            <Image
              src="https://flagcdn.com/w40/br.png"
              alt="pt"
              width={16}
              height={16}
              className="mr-2 inline-block"
            />
            {dictionary.components.languageSwitcher.options.pt.title}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
