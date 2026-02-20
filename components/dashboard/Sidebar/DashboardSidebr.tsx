'use client'

import { SidebarFooter, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { getMenuByRole, MenuItem, UserRole } from '@/lib/menuConfig'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function useGetRoleFromPathName(): UserRole {
  const pathname = usePathname()
  if (pathname.startsWith('/operation')) {
    return 'operation'
  }

  if (pathname.startsWith('/manager')) {
    return 'manager'
  }

  if (pathname.startsWith('/admin')) {
    return 'admin'
  }

  return 'viewer'
}

export default function DashBoardSidebr({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = useGetRoleFromPathName()

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
        <SidebarGroup>
          <NavMain items={getMenuByRole(role)} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

interface NavMainProps extends React.ComponentProps<'div'> {
  replaceRoute?: boolean
  items: MenuItem[]
  linkClassName?: string
}

function checkIsActive(item: MenuItem, pathName: string) {
  if (item.checks && item.checks == 'exectMatch') {
    return pathName === item.href
  }
  if (item.checks && item.checks == 'startsWith') {
    return pathName.startsWith(item.href + '/')
  }
  return pathName === item.href || pathName.startsWith(item.href + '/')
}

export function NavMain({ items, replaceRoute, className, linkClassName }: NavMainProps) {
  const pathName = usePathname()
  const router = useRouter()
  const handleOnClick = (href: string) => {
    if (replaceRoute) {
      router.replace(href)
      return
    }
    router.push(href)
  }

  return (
    <SidebarGroupContent className="flex flex-col gap-2">
      <SidebarMenu className={cn(className)}>
        {items.map((item) => {
          const isActive =
            typeof item?.isActive == 'function'
              ? item?.isActive(item, pathName)
              : checkIsActive(item, pathName)

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={isActive}
                className={cn('text-foreground h-12 px-3', linkClassName)}
                asChild
                tooltip={item.label}
              >
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    handleOnClick(item.href)
                  }}
                  href={item.href}
                >
                  <span>{item.icon && <item.icon className="size-6" />}</span>
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  )
}
