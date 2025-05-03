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

type NavigationMenuOption = {
  title: string;
  href: string;
  description: string;
};

const projects: NavigationMenuOption[] = [
  {
    title: 'Leroy Merlin Instala',
    href: 'projects/leroy-merlin-instala',
    description:
      'A web application for managing and scheduling installations of products sold by Leroy Merlin.',
  },
  {
    title: 'Markit3D',
    href: 'projects/markit3d',
    description:
      'Landing page for a 3D printing service that offers a wide range of products.',
  },
  {
    title: 'FLEX Sewing Machine',
    href: 'projects/flex-sewing-machine',
    description:
      'A project showcasing a sewing machine with advanced features and capabilities.',
  },
  {
    title: 'More projects...',
    href: 'projects',
    description: 'A collection of various projects and applications.',
  },
];

const about: NavigationMenuOption[] = [
  {
    title: 'About Me',
    href: 'about',
    description:
      'A detailed overview of my professional experience, skills, and education.',
  },
  {
    title: 'Resume',
    href: 'about/resume',
    description:
      'A brief introduction about myself, my background, and my interests.',
  },
  {
    title: 'Timeline',
    href: 'about/timeline',
    description:
      'A visual representation of my journey, showcasing key milestones and achievements.',
  },
];

export function Navbar() {
  const { lang, dictionary } = useLanguage();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${lang}`} className={navigationMenuTriggerStyle()}>
              {dictionary.components.navbar.home}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {dictionary.components.navbar.about}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {about.map((item) => (
                <NavigationMenuLink asChild key={item.title}>
                  <Link
                    href={`/${lang}/${item.href}`}
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
            {dictionary.components.navbar.projects}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {projects.map((project) => (
                <NavigationMenuLink asChild key={project.title}>
                  <Link
                    href={`/${lang}/${project.href}`}
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
              {dictionary.components.navbar.contact}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
