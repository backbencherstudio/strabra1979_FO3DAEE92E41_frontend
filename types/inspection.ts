import { IInspectionMediaFileItem } from './inspectinForm'
import { IUserBasicInfo } from './user'

export const REPAIR_PROGRESS_STATUSES = ['Urgent', 'Maintenance', 'Replacement Planning'] as const
export type IRepairProgressStatus = (typeof REPAIR_PROGRESS_STATUSES)[number]

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

export type IScheduledInspectionTableItem = {
  id: string
  status: InspectionProgressStatus
  scheduledAt: string
  time: string
  property: string
  address: string
  dashboardId: string
  inspectionId?: string
}

export type IAdminScheduledInspectinTableItem = {
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
