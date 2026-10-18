'use client'

import { BookOpen, Contact, Home, Info, Presentation } from 'lucide-react'
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
import { Logo } from '../ui/logo'
import { SidebarTrigger } from '../ui/sidebar'

export function Navbar() {
  const { lang, translation } = useLanguage()

  return (
    <div className="bg-board/95 border-line-strong sticky top-0 z-50 flex w-full items-center justify-center border-b px-4 py-2">
      <div className="flex w-full max-w-[1024px] items-center justify-center">
        <SidebarTrigger className="flex cursor-pointer items-center justify-center border p-4 md:hidden" />
        <div className="flex w-full items-center justify-center md:w-fit md:justify-start">
          <Link href={`/${lang}`} className="flex items-center justify-center">
            <Logo size={40} className="md:mr-8" />
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
                  <Home className="text-season-accent mr-2 h-4 w-4" />
                  {translation.components.navbar.options.home.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Info className="text-season-accent mr-2 h-4 w-4" />
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
                <Presentation className="text-season-accent mr-2 h-4 w-4" />
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
                  href={`/${lang}/articles`}
                  className={navigationMenuTriggerStyle()}
                >
                  <BookOpen className="text-season-accent mr-2 h-4 w-4" />
                  {translation.components.navbar.options.articles.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${lang}/contact`}
                  className={navigationMenuTriggerStyle()}
                >
                  <Contact className="text-season-accent mr-2 h-4 w-4" />
                  {translation.components.navbar.options.contact.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <LanguageSwitcher className="mr-2 ml-auto flex" />
      </div>
    </div>
  )
}
