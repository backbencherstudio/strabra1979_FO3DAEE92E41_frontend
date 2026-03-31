import { IUserBasicInfo } from './user'

export type IRepairProgressStatus = 'Urgent' | 'Maintenance' | 'Replacement Planning'

export type IPiorityRepairPlanItem = {
  id: string
  title: string
  status: IRepairProgressStatus
  description: string
}

export interface IScoreCheckBoxItem {
  notes: string
  score: number
}

export type IDashboardInspectionListItem = {
  id: string
  dashboardId: string
  inspectorId: string
  headerData: {
    propertyType: string
    inspectionTitle: string
  }
  scores: Record<string, IScoreCheckBoxItem>
  overallScore: number
  healthLabel: string
  remainingLife: string
  repairItems?: Array<IPiorityRepairPlanItem>
  nteValue: number
  additionalComments: string
  inspectedAt: string
  createdAt: string
  updatedAt: string
  mediaFiles: Array<{
    id: string
    inspectionId: string
    fileName: string
    fileType: 'PHOTO' | 'VIDEO'
    url: string
    size: number
    mediaFieldKey: string
    category?: string
    uploadedAt: string
  }>
}

export type IScheduledInspectinListItem = {
  id: string
  status: string
  scheduledAt: string
  dashboardId: string
  inspectionId?: string
  propertyName: string
  propertyType: string
  address: string
  assignee: IUserBasicInfo
  createdBy: {
    id: string
    name: string
    username: string
  }
  createdAt: string
  nextInspectionDate: string
}
