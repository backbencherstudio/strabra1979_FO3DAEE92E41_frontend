'use client'

import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import Building3Icon from '@/components/icons/Building3Icon'
import PlusIcon from '@/components/icons/PlusIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import { AddNewDialog } from '@/components/pages/admin/property-list/AddNewDialog'
import { properties } from '@/app/(dashboard)/(autorized_viewer)/mock'
import { useGetPropertiesQuery } from '@/api/dashboard/properties/propertiesApi'
import { formatDate, naIfEmpty } from '@/lib/farmatters'
import { notAvailableLabel } from '@/constant'
import { Button } from '@/components/ui/button'

export default function PropertyHome() {
  const handleSchedule = (propertyId: string) => {
    // Handle schedule action
    console.log('Schedule inspection for property:', propertyId)
  }

  const handleAssign = (propertyId: string) => {
    // Handle assign action
    console.log('Assign inspector to property:', propertyId)
  }

  const handleViewAccess = (propertyId: string) => {
    // Handle view access action
    console.log('View access details for property:', propertyId)
  }

  const handleAddNew = (data: any) => {
    console.log('Create new property:', data)
    // Add your logic here to create a new property
    // For example: router.push('/manager/property-list/new')
    // Or make an API call
  }

  const { data: { data = [] } = {}, isLoading } = useGetPropertiesQuery()

  return (
    <div className="rounded-3xl bg-[#f6f8fa] p-4">
      <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center justify-center rounded-[12px] border border-[#e9e9ea] bg-[#ffffff]">
          <div className="flex flex-col items-center justify-center py-24">
            <Building3Icon />
            <h2 className="mt-3 text-center text-base font-medium text-[#4a4c56]">
              Create New Property Dashboard
            </h2>
            <p className="mt-1.5 text-center text-sm text-[#5f6166]">
              Set up a dashboard to manage <br /> inspections, and all property reports.
            </p>

            <AddNewDialog
              onAdd={handleAddNew}
              trigger={
                <Button variant="outline" size="xl" className="px-12! mt-4">
                  <PlusIcon /> Create New
                </Button>
              }
            />
          </div>
        </div>
        {data.map((p) => (
          <PropertyCard
            hasAccess
            key={p.id}
            slug={`/admin/properties-list/${p.id}`}
            isAdmin={true}
            onSchedule={() => handleSchedule(p.id)}
            onAssign={() => handleAssign(p.id)}
            onViewAccess={() => handleViewAccess(p.id)}
            title={p.name}
            property={p.name}
            id={p.id}
            address={naIfEmpty(p.address)}
            score={p?.dashboard?.latestInspection?.overallScore}
            // previewImageUrl={'/images/property-card/property-01.png'}
            // p?.dashboard?.latestInspection?.healthLabel
          >
            <PropertyCardInfoList
              items={[
                { label: 'Type', value: naIfEmpty(p.propertyType) },
                { label: 'Next Inspection', value: naIfEmpty(formatDate(p.nextInspectionDate)) },
                { label: 'Property Manager', value: naIfEmpty(p.propertyManager.username) },
              ]}
            />
          </PropertyCard>
        ))}
      </div>
    </div>
  )
}
