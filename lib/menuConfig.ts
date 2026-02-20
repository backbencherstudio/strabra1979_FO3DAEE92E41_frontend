import {
    Archive02,
  DashboardSquare03,
  Property,
  PropertyNew,
  Settings02,
  Users,
} from '@/components/icons/SideBarIcons'

import { ComponentType } from 'react'
type MatchType = 'exectMatch' | 'startsWith'
export interface MenuItem {
  id: string
  label: string
  href: string
  icon?: ComponentType<{ className?: string }>
  isActive?: (item: MenuItem, pathname: string) => boolean
  checks?: MatchType
}

export type UserRole = 'admin' | 'manager' | 'operation' | 'viewer'

export const adminMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    checks: 'exectMatch',
    href: '/admin',
    icon: DashboardSquare03,
  },
  {
    id: 'properties-list',
    label: 'Properties List',
    href: '/admin/properties-list',
    icon: PropertyNew,
  },
  {
    id: 'templates',
    label: 'Templates',
    href: '/admin/templates',
    icon: Archive02,
  },
  {
    id:'user-management',
    label: 'User Management',
    href: '/admin/user-management',
    icon:  Users,
  }
]

export const managerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/manager',
    icon: DashboardSquare03,
  },
  {
    id: 'team',
    label: 'Team',
    href: '/manager/team',
    icon: DashboardSquare03,
  },
]

export const operationMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/operation',
    isActive: (item: MenuItem, pathname: string) =>
      item.href === pathname || pathname.startsWith('/operation/inspection-report'),
    icon: DashboardSquare03,
  },
  {
    id: 'tasks',
    label: 'Inspection List',
    href: '/operation/inspection-list',
    icon: Property,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/operation/settings',
    icon: Settings02,
  },
]

export const viewerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    isActive: (item: MenuItem, pathname: string) =>
      item.href === pathname || pathname.startsWith('/property'),
    icon: DashboardSquare03,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings02,
  },
]

export const roleMenus = {
  admin: adminMenu,
  manager: managerMenu,
  operation: operationMenu,
  viewer: viewerMenu,
}

export const getMenuByRole = (role: string): MenuItem[] => {
  return roleMenus[role as keyof typeof roleMenus] || []
}
