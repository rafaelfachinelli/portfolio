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

const OPTIONS = [
  { lang: 'en', flag: 'us' },
  { lang: 'pt', flag: 'br' },
] as const

export function LanguageSwitcher({
  className,
}: Readonly<{ className?: string }>) {
  const { lang, translation } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLang: string) => {
    router.push(pathname.replace(`/${lang}`, `/${newLang}`), { scroll: false })
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative cursor-pointer overflow-hidden rounded-full select-none"
          >
            <Image
              src={`https://flagcdn.com/w40/${lang.startsWith('en') ? 'us' : 'br'}.png`}
              alt={lang}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-cover"
            />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {OPTIONS.map(option => (
            <DropdownMenuItem
              key={option.lang}
              className="group flex w-full cursor-pointer items-center"
              onClick={() => handleLanguageChange(option.lang)}
            >
              <Image
                src={`https://flagcdn.com/w40/${option.flag}.png`}
                alt={option.lang}
                width={16}
                height={16}
                className="mr-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
              {
                translation.components.languageSwitcher.options[option.lang]
                  .title
              }
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
