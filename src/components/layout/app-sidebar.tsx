'use client'

import { Contact, Home, Info, Presentation } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useLanguage } from '@/contexts/LanguageContext'

export function AppSidebar() {
  const { lang, dictionary } = useLanguage()
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar>
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
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem onClick={toggleSidebar}>
                <Link href={`/${lang}`}>
                  <SidebarMenuButton className="cursor-pointer">
                    <Home className="h-4 w-4" />
                    {dictionary.components.navbar.options.home.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem onClick={toggleSidebar}>
                <Link href={`/${lang}/about/me`}>
                  <SidebarMenuButton className="cursor-pointer">
                    <Info className="h-4 w-4" />
                    {dictionary.components.navbar.options.about.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem onClick={toggleSidebar}>
                <Link href={`/${lang}/projects/more`}>
                  <SidebarMenuButton className="cursor-pointer">
                    <Presentation className="h-4 w-4" />
                    {dictionary.components.navbar.options.projects.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem onClick={toggleSidebar}>
                <Link href={`/${lang}/contact`}>
                  <SidebarMenuButton className="cursor-pointer">
                    <Contact className="h-4 w-4" />
                    {dictionary.components.navbar.options.contact.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
