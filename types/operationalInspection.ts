export interface IOperationalDashboardOverview {
  role: 'OPERATIONAL'
  stats: IOperationalOverviewStats
  todaysInspections: any[]
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
  status: string
  scheduledAt: string
  dashboardId: string
  inspectionId: string
  propertyName: string
  address: string
  propertyType: string
  createdAt: string
}
