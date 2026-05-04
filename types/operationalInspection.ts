import { InspectionProgressStatus, IScheduledInspectionTableItem } from './inspection'

export interface IOperationalDashboardOverview {
  role: 'OPERATIONAL'
  stats: IOperationalOverviewStats
  todaysInspections: IScheduledInspectionTableItem[]
  recentInspections: IOperationalRecentInspectionTableItem[]
}

export interface IOperationalOverviewStats {
  todayCount: number
  totalAssignedThisMonth: number
  completedThisMonth: number
}

export interface IOperationalRecentInspectionTableItem {
  id: string
  status: string
  scheduledAt: string
  dashboardId: string
  time: string
  property: string
  address: string
}

export interface IOperationalInspectionTableItem {
  id: string
  status: InspectionProgressStatus
  scheduledAt: string
  dashboardId: string
  inspectionId?: string
  scheduledInspectionId?: string
  propertyName: string
  address: string
  propertyType: string
  createdAt: string
}

export type IInspectionPropertyDetail = {
  dashboardId: string
  property: {
    id: string
    name: string
    address: string
    propertyType: string
    status: string
    createdAt: string
  }
}
