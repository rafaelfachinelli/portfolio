'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { SidebarOption } from './app-sidebar'

interface NavMainProps {
  readonly options: SidebarOption[]
}

export function NavMain({ options }: NavMainProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Rafael Fachinelli</SidebarGroupLabel>
      <SidebarMenu>
        {options.map(({ title, isActive, icon: Icon, items }) => (
          <Collapsible
            key={title}
            asChild
            defaultOpen={isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={title}>
                  {Icon && Icon}
                  <span>{title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items?.map(({ title, url, icon: Icon }) => (
                    <SidebarMenuSubItem key={title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={url ?? '#'}
                          className="flex items-center"
                          onClick={toggleSidebar}
                        >
                          {Icon && Icon}
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
