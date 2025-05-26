'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
  const { lang, translation } = useLanguage()
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
            className="cursor-pointer overflow-hidden rounded-full select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                <Image
                  src={`https://flagcdn.com/w160/${lang === 'en' ? 'us' : 'br'}.png`}
                  alt={lang}
                  width={120}
                  height={24}
                  className="h-full w-full rounded-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center"
            onClick={() => handleLanguageChange('en')}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="en"
                width={16}
                height={16}
                className="mr-2 inline-block"
              />
            </motion.div>
            {translation.components.languageSwitcher.options.en.title}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center"
            onClick={() => handleLanguageChange('pt')}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image
                src="https://flagcdn.com/w40/br.png"
                alt="pt"
                width={16}
                height={16}
                className="mr-2 inline-block"
              />
            </motion.div>
            {translation.components.languageSwitcher.options.pt.title}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
