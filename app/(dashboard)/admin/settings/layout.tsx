'use client'

import { Notification } from '@/components/icons/Notification'
import { CheckmarkBadge, User } from '@/components/icons/SideBarIcons'
import SettngPageLayout from '@/components/pages/Settings/SettngPageLayout/SettngPageLayout'
import { MenuItem } from '@/lib/menuConfig'

const settingsMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Profile & Account',
    href: '/admin/settings',
    isActive: (item: MenuItem, pathname: string) => item.href === pathname,
    icon: User,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/admin/settings/notifications',
    icon: Notification,
  },
  {
    id: 'branding-settings',
    label: 'Branding Settings',
    href: '/admin/settings/branding',
    icon: CheckmarkBadge,
  },
]

export default function SettngLayout({ children }: React.PropsWithChildren) {
  return <SettngPageLayout menu={settingsMenu}>{children}</SettngPageLayout>
}
