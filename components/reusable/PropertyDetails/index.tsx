'use client'

import { useGetPropertyDashboardDetailsQuery } from '@/api/dashboard/properties/propertiesApi'
import PropertyDetails from '@/components/reusable/PropertyDetails/PropertyDetails'
import PropertyDetailsReports from '@/components/reusable/PropertyDetails/PropertyDetailsReports'
import PropertySharePopover from '@/components/reusable/PropertyDetails/PropertySharePopover'
import { useAuth } from '@/redux/features/auth/useAuth'
import { RoleUtils } from '@/types'
import { useParams } from 'next/navigation'
import { AccessExpirationInfo } from './AccessExpirationInfo'

export function PropertyDashboardDetailTab() {
  const { dashboardId } = useParams<{ dashboardId: string }>()
  const { data: { data } = {} } = useGetPropertyDashboardDetailsQuery(dashboardId, {
    skip: !dashboardId,
  })
  const { role } = useAuth()

  if (!data) {
    return null
  }

  return (
    <PropertyDetails
      dashboardId={dashboardId}
      headerRightContent={
        RoleUtils.hasRole(role, ['ADMIN', 'PROPERTY_MANAGER']) ? (
          <PropertySharePopover />
        ) : RoleUtils.isAuthorizedViewer(role) ? (
          <AccessExpirationInfo accessExpiresAt={data?.property?.accessExpiresAt} />
        ) : null
      }
      data={data}
    />
  )
}

export function PropertyDashboardReportTab() {
  const { dashboardId } = useParams<{ dashboardId: string }>()
  const { data: { data } = {} } = useGetPropertyDashboardDetailsQuery(dashboardId, {
    skip: !dashboardId,
  })
  const { role } = useAuth()

  if (!data) {
    return null
  }

  return (
    <PropertyDetailsReports
      role={role}
      dashboardId={dashboardId}
      headerRightContent={
        RoleUtils.isAuthorizedViewer(role) ? (
          <AccessExpirationInfo accessExpiresAt={data?.property?.accessExpiresAt} />
        ) : null
      }
      data={data}
    />
  )
}
