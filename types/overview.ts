import { IActivityLogListItem } from './activity'
import { IScheduledInspectionTableItem } from './inspection'
import { IPropertyType } from './property'
import { IPropertyManager, IUserBasicInfo } from './user'

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
      label: string
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
    propertyType?: IPropertyType
    nextInspectionDate?: string
    dashboardId: string
    propertyManager?: IPropertyManager
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

export type IOverviewManager = {
  role: string
  stats: {
    totalProperties: number
    avgRoofHealthPercent: number
    urgentRepairs: number
  }
  properties: Array<{
    id: string
    name: string
    address: string
    propertyType?: string
    nextInspectionDate?: string
    dashboardId?: string
    roofHealth?: {
      overallScore: number
      healthLabel: string
      remainingLife: string
    }
  }>
  recentReports: Array<{
    id: string
    propertyName: string
    address: string
    inspectedAt: string
    healthLabel: string
    overallScore: number
    inspector: IUserBasicInfo
  }>
}
