'use client'

import {
  BookOpen,
  Contact,
  ExternalLink,
  File,
  FlagTriangleRight,
  Github,
  Home,
  Info,
  Instagram,
  Linkedin,
  Presentation,
  Scroll,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { NavMain } from '@/components/layout/app-sidebar/nav-main'
import { NavProjects } from '@/components/layout/app-sidebar/nav-projects'
import { Logo } from '@/components/ui/logo'
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
  icon?: React.ReactNode
  isActive?: boolean
  items?: {
    icon?: React.ReactNode
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
          icon: <Info className="!text-season-accent" />,
          isActive: true,
          items: [
            {
              icon: <Info className="!text-season-accent" />,
              title: translation.components.navbar.options.about.items.me.title,
              url: `/${lang}/about/me`,
            },
            {
              icon: <File className="!text-season-accent" />,
              title:
                translation.components.navbar.options.about.items.resume.title,
              url: `/${lang}/about/resume`,
            },
            {
              icon: <FlagTriangleRight className="!text-season-accent" />,
              title:
                translation.components.navbar.options.about.items.timeline
                  .title,
              url: `/${lang}/about/timeline`,
            },
            {
              icon: <Scroll className="!text-season-accent" />,
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
          icon: <Presentation className="!text-season-accent" />,
          name: translation.components.navbar.options.projects.items[
            'instalacoes-e-reformas'
          ].title,
          url: `/${lang}/projects/instalacoes-e-reformas`,
        },
        {
          icon: <Presentation className="!text-season-accent" />,
          name: translation.components.navbar.options.projects.items[
            'flex-sewing-machine'
          ].title,
          url: `/${lang}/projects/flex-sewing-machine`,
        },
        {
          icon: <Presentation className="!text-season-accent" />,
          name: translation.components.navbar.options.projects.items['markit3d']
            .title,
          url: `/${lang}/projects/markit3d`,
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
          <Logo size={40} className="md:mr-2" />
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
                  <Home className="text-season-accent" />
                  <span>
                    {translation.components.navbar.options.home.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain options={getData().navMain} />
        <NavProjects projects={getData().projects} />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={translation.components.navbar.options.articles.title}
                asChild
              >
                <Link
                  href={`/${lang}/articles`}
                  className="flex items-center"
                  onClick={toggleSidebar}
                >
                  <BookOpen className="text-season-accent" />
                  <span>
                    {translation.components.navbar.options.articles.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
                  <Contact className="text-season-accent" />
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
                <Linkedin className="text-season-accent" />
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
                <Instagram className="text-pink-500" />
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
