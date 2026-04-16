'use client'

import { useGetPropertyDashboardDetailsQuery } from '@/api/dashboard/properties/propertiesApi'
import PropertyDetails from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'
import { useParams } from 'next/navigation'
import PropertyDetailsReports from './PropertyDetailsReports'

export function PropertyDashboardDetailTab() {
  const { dashboardId } = useParams<{ dashboardId: string }>()
  const { data } = useGetPropertyDashboardDetailsQuery(dashboardId, { skip: !dashboardId })

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


export function PropertyDashboardReportTab() {
  const { dashboardId } = useParams<{ dashboardId: string }>()
  const { data } = useGetPropertyDashboardDetailsQuery(dashboardId, { skip: !dashboardId })

  if (!data?.data) {
    return null
  }

  return (
    <PropertyDetailsReports
      dashboardId={dashboardId}
      headerRightContent={<PropertySharePopover />}
      data={data?.data}
    />
  )
}
