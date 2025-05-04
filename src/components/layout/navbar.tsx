'use client'

import Image from 'next/image'
import Link from 'next/link'

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
import { ThemeSwitcher } from '../ui/theme-switcher'

export function Navbar() {
  const { lang, dictionary } = useLanguage()

  return (
    <div className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-center border-b p-2 backdrop-blur transition-colors duration-500 lg:backdrop-blur-sm dark:border-b-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="flex w-full max-w-[1024px] items-center justify-center">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/logo_1024x1024.png"
            alt="RFL"
            width={40}
            height={40}
            className="mt-1 mr-2 min-h-9 min-w-9"
          />
        </Link>
        <NavigationMenu delayDuration={0}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${lang}`}
                  className={navigationMenuTriggerStyle()}
                >
                  {dictionary.components.navbar.options.home.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {dictionary.components.navbar.options.about.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {Object.entries(
                    dictionary.components.navbar.options.about.items,
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
                {dictionary.components.navbar.options.projects.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {Object.entries(
                    dictionary.components.navbar.options.projects.items,
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
                  {dictionary.components.navbar.options.contact.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <LanguageSwitcher className="mr-4 ml-auto" />
        <ThemeSwitcher />
      </div>
    </div>
  )
}
