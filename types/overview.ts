import { IActivityLogListItem } from './activity'
import { IScheduledInspectionTableItem } from './inspection'
import { IUserBasicInfo } from './user'

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
    recent: Array<IScheduledInspectionTableItem & { assignee?: IUserBasicInfo }>
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

export type IOverviewOperational = {
  role: string
  stats: {
    todayCount: number
    totalAssignedThisMonth: number
    completedThisMonth: number
  }
  todaysInspections: Array<IScheduledInspectionTableItem>
  recentInspections: Array<IScheduledInspectionTableItem>
}
