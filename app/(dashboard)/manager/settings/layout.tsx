'use client'

import { Notification } from '@/components/icons/Notification'
import { User } from '@/components/icons/SideBarIcons'
import SettngPageLayout from '@/components/pages/Settings/SettngPageLayout/SettngPageLayout'
import { MenuItem } from '@/lib/menuConfig'

const settingsMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Profile & Account',
    href: '/manager/settings',
    isActive: (item: MenuItem, pathname: string) => item.href === pathname,
    icon: User,
  },
  {
    id: 'Notifications',
    label: 'Notifications',
    href: '/manager/settings/notifications',
    icon: Notification,
  },
]

export default function SettngLayout({ children }: React.PropsWithChildren) {
  return <SettngPageLayout menu={settingsMenu}>{children}</SettngPageLayout>
}
