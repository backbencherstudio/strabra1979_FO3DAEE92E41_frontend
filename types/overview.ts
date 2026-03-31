import { InspectionProgressStatus } from '@/components/dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { IActivityLogListItem } from './activity'

export type IScheduledInspectionItem = {
  id: string
  status: InspectionProgressStatus
  scheduledAt: string
  time: string
  property: string
  address: string
  dashboardId: string
  assignee: {
    id: string
    name?: string
    avatar?: string
  }
}

export type IScheduledInspectionTabs = {
  all: number
  due: number
  inProgress: number
  complete: number
  assigned: number
}

export type IOverviewAdmin = {
  role: string
  stats: {
    totalProperties: number
    propertiesChangePercent: unknown
    totalUsers: number
    usersChangePercent: unknown
    pendingInspectionsThisMonth: number
  }
  chart: {
    year: number
    data: Array<{
      month: string
      count: number
    }>
  }
  scheduledInspections: {
    tabs: IScheduledInspectionTabs
    recent: Array<IScheduledInspectionItem>
  }
  activityLogs: IActivityLogListItem[]
  latestProperties: Array<{
    id: string
    name: string
    address: string
    propertyType?: string
    nextInspectionDate?: string
    dashboardId: string
    propertyManager?: {
      id: string
      name?: string
      avatar?: string
    }
    roofHealth?: {
      overallScore: number
      healthLabel: string
      remainingLife: string
    }
  }>
}
