'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export function Navbar() {
  const { lang, dictionary } = useLanguage();

  return (
    <div className="flex sticky top-0 z-50 bg-background p-2 shadow-md">
      <Link href={`/${lang}`} className="flex items-center">
        <Image
          src="/logo_1024x1024.png"
          alt="RFL"
          width={40}
          height={40}
          className="mt-1 mr-2"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${lang}`} className={navigationMenuTriggerStyle()}>
                {dictionary.components.navbar.options.home.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {dictionary.components.navbar.options.about.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {Object.entries(
                  dictionary.components.navbar.options.about.items
                ).map(([key, item]) => (
                  <NavigationMenuLink asChild key={key}>
                    <Link
                      href={`/${lang}/about/${key}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {Object.entries(
                  dictionary.components.navbar.options.projects.items
                ).map(([key, project]) => (
                  <NavigationMenuLink asChild key={key}>
                    <Link
                      href={`/${lang}/projects/${key}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {project.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
    </div>
  );
}
