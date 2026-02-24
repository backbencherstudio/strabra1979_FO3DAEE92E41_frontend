import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { MenuItem } from '@/lib/menuConfig'

interface PropertyDetailPageProps extends React.PropsWithChildren {}

export default function PropertyDetailPage({ children }: PropertyDetailPageProps) {
  const menu: MenuItem[] = [
    {
      id: 'my-notification',
      label: 'My Notification',
      checks: 'exectMatch',
      href: `/admin/settings/notifications`,
    },
    {
      id: 'user-level-notification-settings',
      label: 'User Level Notification Settings',
      href: `/admin/settings/notifications/users`,
    },
  ]

  return (
    <div>
      <SectionCard className="p-1.5">
        <NavMain
          replaceRoute
          linkClassName="justify-center data-[active=true]:text-[#284B6C] data-[active=true]:bg-foundation-light-blue"
          className="flex flex-row *:flex-1"
          items={menu}
        />
      </SectionCard>

      <div className="mt-4">{children}</div>
    </div>
  )
}
