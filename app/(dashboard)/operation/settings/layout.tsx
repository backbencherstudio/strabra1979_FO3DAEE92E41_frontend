'use client'

import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import { Notification } from '@/components/icons/Notification'
import { User } from '@/components/icons/SideBarIcons'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
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
    <div className="flex flex-col gap-4.5 xl:flex-row">
      <div className="w-auto min-w-64">
        <SectionCard className="p-1.5 xl:border-none xl:bg-transparent xl:p-0">
          <NavMain
            linkClassName="justify-center xl:justify-start"
            className="flex-row *:flex-1 xl:flex-col"
            items={settingsMenu}
          />
        </SectionCard>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
