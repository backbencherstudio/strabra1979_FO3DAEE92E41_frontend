'use client'

import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import { Notification } from '@/components/icons/Notification'
import { User } from '@/components/icons/SideBarIcons'
import { SidebarContent } from '@/components/ui/sidebar'
import { MenuItem } from '@/lib/menuConfig'

const settingsMenu: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Profile & Account',
    href: '/operation/settings',
    isActive: (item: MenuItem, pathname: string) => item.href === pathname,
    icon: User,
  },
  {
    id: 'browse',
    label: 'Notifications',
    href: '/operation/settings/notifications',
    icon: Notification,
  },
]

export default function SettngPageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-4.5">
      <div className="w-auto min-w-64">
        <SidebarContent>
          <NavMain items={settingsMenu} />
        </SidebarContent>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
