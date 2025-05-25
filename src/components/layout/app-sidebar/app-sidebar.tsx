'use client'

import {
  Contact,
  ExternalLink,
  Github,
  Home,
  Info,
  Instagram,
  Linkedin,
  type LucideIcon,
  Presentation,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { NavMain } from '@/components/layout/app-sidebar/nav-main'
import { NavProjects } from '@/components/layout/app-sidebar/nav-projects'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useLanguage } from '@/contexts/LanguageContext'

export type SidebarOption = {
  title?: string
  name?: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { lang, translation } = useLanguage()
  const { toggleSidebar } = useSidebar()

  const getData = (): {
    navMain: SidebarOption[]
    projects: SidebarOption[]
  } => {
    return {
      navMain: [
        {
          title: translation.components.navbar.options.about.title,
          icon: Info,
          isActive: true,
          items: [
            {
              title: translation.components.navbar.options.about.items.me.title,
              url: `/${lang}/about/me`,
            },
            {
              title:
                translation.components.navbar.options.about.items.resume.title,
              url: `/${lang}/about/resume`,
            },
            {
              title:
                translation.components.navbar.options.about.items.timeline
                  .title,
              url: `/${lang}/about/timeline`,
            },
            {
              title:
                translation.components.navbar.options.about.items[
                  'personal-manifesto'
                ].title,
              url: `/${lang}/about/personal-manifesto`,
            },
          ],
        },
      ],
      projects: [
        {
          name: translation.components.navbar.options.projects.items[
            'leroy-merlin-instala'
          ].title,
          url: `/${lang}/projects/leroy-merlin-instala`,
          icon: Presentation,
        },
        {
          name: translation.components.navbar.options.projects.items[
            'flex-sewing-machine'
          ].title,
          url: `/${lang}/projects/flex-sewing-machine`,
          icon: Presentation,
        },
        {
          name: translation.components.navbar.options.projects.items['markit3d']
            .title,
          url: `/${lang}/projects/markit3d`,
          icon: Presentation,
        },
      ],
    }
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href={`/${lang}`}
          className="flex items-center justify-center"
          onClick={toggleSidebar}
        >
          <Image
            src="/logo_1024x1024.png"
            alt="RFL"
            width={40}
            height={40}
            className="min-h-9 min-w-9 md:mr-2 md:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={translation.components.navbar.options.home.title}
                asChild
              >
                <Link
                  href={`/${lang}`}
                  className="flex items-center"
                  onClick={toggleSidebar}
                >
                  <Home />
                  <span>
                    {translation.components.navbar.options.home.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain items={getData().navMain} />
        <NavProjects projects={getData().projects} />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={translation.components.navbar.options.contact.title}
                asChild
              >
                <Link
                  href={`/${lang}/contact`}
                  className="flex items-center"
                  onClick={toggleSidebar}
                >
                  <Contact />
                  <span>
                    {translation.components.navbar.options.contact.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Github" asChild>
              <Link
                href="https://github.com/rafaelfachinelli"
                className="flex items-center"
                onClick={toggleSidebar}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <span>Github</span>
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="LinkedIn" asChild>
              <Link
                href="https://www.linkedin.com/in/rafaelfachinelli/"
                className="flex items-center"
                onClick={toggleSidebar}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
                <span>LinkedIn</span>
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Instagram" asChild>
              <Link
                href="https://www.instagram.com/rafaelfachinelli/"
                className="flex items-center"
                onClick={toggleSidebar}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
                <span>Instagram</span>
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
