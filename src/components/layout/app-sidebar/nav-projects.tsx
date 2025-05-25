'use client'

import { BookUser, Eye, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

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
        {projects.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link
                href={item.url ?? '/'}
                className="flex items-center"
                onClick={toggleSidebar}
              >
                {item.icon && <item.icon />}
                <span>{item.name}</span>
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
                    href={item.url ?? '/'}
                    className="flex items-center"
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
                    href={item.url ?? '/'}
                    className="flex items-center"
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
          <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
            <Link
              href={`/${lang}/projects/more`}
              className="flex items-center"
              onClick={toggleSidebar}
            >
              <MoreHorizontal className="text-sidebar-foreground/70" />
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
