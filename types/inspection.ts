import { IUserBasicInfo } from './user'

export type IRepairProgressStatus = 'Urgent' | 'Maintenance' | 'Replacement Planning'

export type InspectionProgressStatus =
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DUE'
  | 'PUBLISHED'

export type IPiorityRepairPlanItem = {
  id: string
  title: string
  status: IRepairProgressStatus
  description: string
}

// export interface IInspectionFieldValue {
//   propertyType: string
//   inspectionTitle: string
// }
export type IInspectionFieldValues = Record<string, string>
export interface IInspectionScoreCheckboxValue {
  notes: string
  score: number
}

export type IInspectionMediaFileItem = {
  id: string
  inspectionId: string
  fileName: string
  fileType: 'PHOTO' | 'VIDEO'
  url: string
  size: number
  mediaFieldKey: string
  category?: string
  uploadedAt: string
}

export type IDashboardInspectionListItem = {
  id: string
  dashboardId: string
  inspectorId: string

  inspectedAt: string
  createdAt: string
  updatedAt: string

  headerData: IInspectionFieldValues

  healthLabel: string
  overallScore: number
  remainingLife: string

  scores: Record<string, IInspectionScoreCheckboxValue>

  repairItems?: Array<IPiorityRepairPlanItem>

  nteValue: number
  additionalComments: string

  mediaFiles: Array<IInspectionMediaFileItem>
}

export type IAdminScheduledInspectinListItem = {
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
