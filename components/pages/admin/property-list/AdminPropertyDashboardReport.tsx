'use client'

import { useGetPropertyDashboardDetailsQuery } from '@/api/dashboard/properties/propertiesApi'
import PropertyDetailsReports from '@/components/reusable/PropertyDetails/PropertyDetailsReports'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'

interface AdminPropertyDashboardReportProps {
  dashboardId: string
}

export default function AdminPropertyDashboardReport({
  dashboardId,
}: AdminPropertyDashboardReportProps) {
  const { data } = useGetPropertyDashboardDetailsQuery(dashboardId)

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
