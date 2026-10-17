'use client'

import { BookUser, Eye, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useLanguage } from '@/contexts/LanguageContext'
import { capitalizeFirstLetter } from '@/lib/utils'

import { SidebarOption } from './app-sidebar'

interface NavProjectsProps {
  readonly projects: SidebarOption[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { isMobile, toggleSidebar } = useSidebar()
  const { lang, translation } = useLanguage()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        {translation.components.navbar.options.projects.title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(({ name, url, icon: Icon }) => (
          <SidebarMenuItem key={name}>
            <SidebarMenuButton asChild>
              <Link
                href={url ?? '#'}
                className="flex items-center"
                onClick={toggleSidebar}
              >
                {Icon && Icon}
                <span>{name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    href={url ?? '#'}
                    className="hover:bg-foreground/10 flex items-center"
                    onClick={toggleSidebar}
                  >
                    <Eye className="text-muted-foreground" />
                    <span>
                      {capitalizeFirstLetter(translation.commons.brief)}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    href={url ?? '#'}
                    className="hover:bg-foreground/10 flex items-center"
                    onClick={toggleSidebar}
                  >
                    <BookUser className="text-muted-foreground" />
                    <span>
                      {capitalizeFirstLetter(translation.commons.details)}
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={`/${lang}/projects/more`}
              className="flex items-center"
              onClick={toggleSidebar}
            >
              <MoreHorizontal className="text-blue-500" />
              <span>
                {
                  translation.components.navbar.options.projects.items.more
                    .title
                }
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
