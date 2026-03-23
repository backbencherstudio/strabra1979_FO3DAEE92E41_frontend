import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { FilePdf, FileText } from '@/components/icons/File'
import {
  Activity,
  Archive02,
  DashboardSquare03,
  FileSearch,
  Property,
  PropertyNew,
  ReportFile,
  Settings02,
  Users,
} from '@/components/icons/SideBarIcons'
import { appRoutes } from '@/constant'

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
    href: appRoutes.admin.propertyList,
    icon: PropertyNew,
  },
  {
    id: 'templates',
    label: 'Templates',
    href: '/admin/templates',
    icon: Archive02,
  },
  {
    id: 'user-management',
    label: 'User Management',
    href: '/admin/user-management',
    icon: Users,
  },
  {
    id: 'activity-log',
    label: 'Activity Log',
    href: '/admin/activity-log',
    icon: Activity,
  },
  {
    id: 'inspection-criteria',
    label: 'Inspection Criteria',
    href: '/admin/inspection-criteria',
    icon: FileSearch,
  },
  {
    id: 'inspection-list',
    label: 'Inspection List',
    href: '/admin/inspection-list',
    icon: FileText,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings02,
  },
]

export const managerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/manager',
    checks: 'exectMatch',
    icon: DashboardSquare03,
  },
  {
    id: 'property-list',
    label: 'Property List',
    href: '/manager/property-list',
    icon: Property,
  },
  {
    id: 'report',
    label: 'Reports',
    href: '/manager/report',
    icon: ReportFile,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/manager/settings',
    icon: Settings02,
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
