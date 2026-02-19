'use client'

import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { MenuItem } from '@/lib/menuConfig'

export default function SettngPageLayout({
  menu,
  children,
}: React.PropsWithChildren & { menu: MenuItem[] }) {
  return (
    <div className="flex flex-col gap-4.5 xl:flex-row">
      <div className="w-auto min-w-64">
        <SectionCard className="p-1.5 xl:border-none xl:bg-transparent xl:p-0">
          <NavMain
            linkClassName="justify-center xl:justify-start"
            className="flex-row *:flex-1 xl:flex-col"
            items={menu}
          />
        </SectionCard>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
