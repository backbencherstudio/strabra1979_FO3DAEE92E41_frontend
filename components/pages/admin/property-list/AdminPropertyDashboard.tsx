'use client'

import { useGetPropertyDashboardDetailsQuery } from '@/api/dashboard/properties/propertiesApi'
import PropertyDetails from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'

interface AdminPropertyDashboard {
  dashboardId: string
}

export default function AdminPropertyDashboard({ dashboardId }: AdminPropertyDashboard) {
  const { data } = useGetPropertyDashboardDetailsQuery(dashboardId)

  if (!data?.data) {
    return null
  }

  return (
    <PropertyDetails
      dashboardId={dashboardId}
      headerRightContent={<PropertySharePopover />}
      data={data?.data}
    />
  )
}
