import { NavMain } from '@/components/dashboard/Sidebar/DashboardSidebr'
import PropertyDetails from '@/components/reusable/PropertyDetails/PropertyDetails'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { MenuItem } from '@/lib/menuConfig'

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = await params

  const menu: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Property Dashboard',
      href: `/property/${propertyId}`,
    },
    {
      id: 'browse',
      label: 'All reports',
      href: `/property/${propertyId}/reports`,
    },
  ]

  return (
    <div>
      <SectionCard className="p-1.5">
        <NavMain
          linkClassName="justify-center data-[active=true]:text-[#284B6C] data-[active=true]:bg-foundation-light-blue"
          className="flex flex-row *:flex-1"
          items={menu}
        />
      </SectionCard>
      <div className="mt-4">
        <PropertyDetails />
      </div>
    </div>
  )
}
