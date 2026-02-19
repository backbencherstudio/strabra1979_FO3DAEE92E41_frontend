'use client'

import { SidebarFooter, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { getMenuByRole, MenuItem } from '@/lib/menuConfig'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function DashBoardSidebr({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 data-[slot=sidebar-menu-button]:p-1.5!">
              <div>
                <Image
                  className="size-10"
                  width={40}
                  height={40}
                  alt="app logo"
                  src="/app-logo.png"
                />
                <span className="text-2xl font-medium">Liberty Shield</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getMenuByRole('operation')} />
      </SidebarContent>

      <SidebarFooter>
        <Button>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export function NavMain({ items }: { items: MenuItem[] }) {
  const pathName = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              typeof item?.isActive == 'function'
                ? item?.isActive(item, pathName)
                : pathName === item.href || pathName.startsWith(item.href + '/')

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  className="text-foreground h-12 px-3"
                  asChild
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <span>{item.icon && <item.icon className="size-6" />}</span>
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
