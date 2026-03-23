import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { appRoutes } from '@/constant'
import { MenuItem } from '@/lib/menuConfig'

interface PropertyDetailPageProps extends React.PropsWithChildren {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailPage({ params, children }: PropertyDetailPageProps) {
  const { propertyId } = await params

  const menu: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Property Dashboard',
      checks: 'exectMatch',
      href: `${appRoutes.admin.propertyList}/${propertyId}`,
    },
    {
      id: 'browse',
      label: 'All reports',
      href: `${appRoutes.admin.propertyList}/${propertyId}/reports`,
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
