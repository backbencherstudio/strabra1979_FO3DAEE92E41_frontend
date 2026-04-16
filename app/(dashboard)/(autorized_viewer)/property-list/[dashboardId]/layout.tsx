import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { routes } from '@/constant'
import { MenuItem } from '@/lib/menuConfig'

interface PropertyDetailPageProps extends React.PropsWithChildren {
  params: Promise<{
    dashboardId: string
  }>
}

export default async function PropertyDetailPage({ params, children }: PropertyDetailPageProps) {
  const { dashboardId } = await params

  const menu: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Property Dashboard',
      checks: 'exectMatch',
      href: `${routes.viewer.propertyList}/${dashboardId}`,
    },
    {
      id: 'browse',
      label: 'All reports',
      href: `${routes.viewer.propertyList}/${dashboardId}/reports`,
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
