'use client'

import { motion } from 'framer-motion'
import { Contact, Home, Info, Presentation } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useLanguage } from '@/contexts/LanguageContext'

import { LanguageSwitcher } from '../ui/language-switcher'
import { SidebarTrigger } from '../ui/sidebar'
import { ThemeSwitcher } from '../ui/theme-switcher'

export function Navbar() {
  const { lang, translation } = useLanguage()
  const [homeAnimationKey, setHomeAnimationKey] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === `/${lang}`) {
      setHomeAnimationKey(prevKey => prevKey + 1)
    }
  }, [pathname, lang])

  return (
    <div className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center px-4 py-2 backdrop-blur transition-colors duration-500 lg:backdrop-blur-sm dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="flex w-full max-w-[1024px] items-center justify-center">
        <SidebarTrigger className="flex cursor-pointer items-center justify-center border p-4 md:hidden" />
        <div className="flex w-full items-center justify-center md:w-fit md:justify-start">
          <Link href={`/${lang}`} className="flex items-center justify-center">
            <motion.div
              key={homeAnimationKey}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 360 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                repeat: 0,
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <Image
                src="/logo_1024x1024.png"
                alt="RFL"
                width={40}
                height={40}
                className="min-h-9 min-w-9 md:mr-8 md:block"
              />
            </motion.div>
          </Link>
        </div>
        <NavigationMenu delayDuration={0} className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${lang}`}
                  className={navigationMenuTriggerStyle()}
                >
                  <Home className="mr-2 h-4 w-4 text-blue-500" />
                  {translation.components.navbar.options.home.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Info className="mr-2 h-4 w-4 text-blue-500" />
                {translation.components.navbar.options.about.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {Object.entries(
                    translation.components.navbar.options.about.items,
                  ).map(([key, item]) => (
                    <NavigationMenuLink asChild key={key}>
                      <Link
                        href={`/${lang}/about/${key}`}
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                      >
                        <div className="text-sm leading-none font-medium">
                          {item.title}
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Presentation className="mr-2 h-4 w-4 text-blue-500" />
                {translation.components.navbar.options.projects.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {Object.entries(
                    translation.components.navbar.options.projects.items,
                  ).map(([key, project]) => (
                    <NavigationMenuLink asChild key={key}>
                      <Link
                        href={`/${lang}/projects/${key}`}
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                      >
                        <div className="text-sm leading-none font-medium">
                          {project.title}
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          {project.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${lang}/contact`}
                  className={navigationMenuTriggerStyle()}
                >
                  <Contact className="mr-2 h-4 w-4 text-blue-500" />
                  {translation.components.navbar.options.contact.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <LanguageSwitcher className="mr-2 ml-auto flex" />
        <ThemeSwitcher className="flex" />
      </div>
    </div>
  )
}
