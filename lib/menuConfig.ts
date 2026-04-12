import { FileText } from '@/components/icons/File'
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
import { routes } from '@/constant'

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
    href: routes.admin.propertyList,
    icon: PropertyNew,
  },
  {
    id: 'templates',
    label: 'Templates',
    href: routes.admin.templates,
    icon: Archive02,
  },
  {
    id: 'user-management',
    label: 'User Management',
    href: routes.admin.userManagement,
    icon: Users,
  },
  {
    id: 'activity-log',
    label: 'Activity Log',
    href: routes.admin.activityLog,
    icon: Activity,
  },
  {
    id: 'inspection-criteria',
    label: 'Inspection Criteria',
    href: routes.admin.inspectionCriteria,
    icon: FileSearch,
  },
  {
    id: 'inspection-list',
    label: 'Inspection List',
    href: routes.admin.inspectionList,
    icon: FileText,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: routes.admin.settings,
    icon: Settings02,
  },
]

export const managerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: routes.manager.home,
    checks: 'exectMatch',
    icon: DashboardSquare03,
  },
  {
    id: 'property-list',
    label: 'Property List',
    href: routes.manager.propertyList,
    icon: Property,
  },
  {
    id: 'report',
    label: 'Reports',
    href: routes.manager.report,
    icon: ReportFile,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: routes.manager.settings,
    icon: Settings02,
  },
]

export const operationMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: routes.operational.home,
    isActive: (item: MenuItem, pathname: string) =>
      item.href === pathname || pathname.startsWith('/operation/inspection-report'),
    icon: DashboardSquare03,
  },
  {
    id: 'tasks',
    label: 'Inspection List',
    href: routes.operational.inspectionList,
    icon: Property,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: routes.operational.settings,
    icon: Settings02,
  },
]

export const viewerMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: routes.viewer.home,
    isActive: (item: MenuItem, pathname: string) =>
      item.href === pathname || pathname.startsWith('/property'),
    icon: DashboardSquare03,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: routes.viewer.settings,
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
