import { IAuthUserRole } from './auth'
import { IPropertyInspectionFolderItem } from './folder'
import { IDashboardInspectionListItem } from './inspection'
import { EditBoxSize, ITemplateSection } from './template'
import { IPropertyManager } from './user'

export const PropertyTypeObj = {
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential',
  INDUSTRIAL: 'Industrial',
  MIXED_USE: 'Mixed Use',
} as const

export type IPropertyType = (typeof PropertyTypeObj)[keyof typeof PropertyTypeObj]

export interface IAssignUserParams {
  dashboardId: string
  userId: string
  expiresAt?: string
}
export interface IProperty {
  id: string
  name: string
  address: string
  propertyType: string
  nextInspectionDate: string
  propertyManagerId: string
  activeTemplateId: string
  status: string
  createdAt: string
  updatedAt: string
}
export interface AssignUserResponse extends IProperty {}

export type IPropertyListItem = {
  id: string
  name: string
  address: string
  propertyType: IPropertyType
  nextInspectionDate: string
  propertyManagerId: string
  activeTemplateId: string
  status: string
  createdAt: string
  updatedAt: string
  propertyManager: IPropertyManager
  dashboard: {
    id: string
    updatedAt: string
    propertyId: string
    latestInspection?: {
      id?: string
      overallScore: number
      healthLabel: string
    }
  }
}

export interface ICreatePropertyPayload {
  name: string
  address: string
  propertyType?: string
  nextInspectionDate?: string
  assignedTo?: string
  propertyManagerId?: string
}

export interface IAccessUser {
  id: string
  username: string
  email: string
  avatar: string | null
  role: IAuthUserRole
}

export interface IDashboardAccessItem {
  accessId: string
  grantedAt: string
  expiresAt: string | null
  user: IAccessUser
}

export interface IPropertyDashboardAccessResponse {
  propertyId: string
  address: string
  propertyType: string
  dashboardId: string
  propertyManager: IPropertyManager
  accessList: IDashboardAccessItem[]
}
export interface IRevokeDashboardAccessPayload {
  dashboardId: string
  targetUserId: string
}

export interface IScheduleInspectionParams {
  dashboardId: string
  scheduledAt: string
  assignedTo: string
}

export interface IScheduleInspectionResponse {
  id: string
  dashboardId: string
  assignedTo: string
  scheduledAt: string
  status: string
  inspectionId: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type ITemplateSnapshotItem = {
  type: ITemplateSection
  label: string
  order: number
  style: {
    width?: EditBoxSize
  }
  config: {
    fields?: Array<string>
    showHealthLabel?: boolean
    showAverageScore?: boolean
    showOverallScore?: boolean
    showRemainingLife?: boolean
    layout?: string
    maxVisible?: number
    allowedTypes?: Array<string>
    embedType?: string
    placeholder?: string
    showNotes?: boolean
    showMaxPoints?: boolean
    nteCurrency?: string
    pageSize?: number
    showVersion?: boolean
    showFileSize?: boolean
    showUploadDate?: boolean
    allowInBrowserView?: boolean
  }
}

export type IPropertyDashboardDetails = {
  id: string
  propertyId: string
  templateId: string
  templateSnapshot: Array<ITemplateSnapshotItem>
  createdAt: string
  updatedAt: string
  property: {
    id: string
    name: string
    accessExpiresAt?: string
    address: string
    propertyType?: string
    nextInspectionDate?: string
    propertyManagerId?: string
    activeTemplateId: string
    status: string
    createdAt: string
    updatedAt: string
    propertyManager?: IPropertyManager
    activeTemplate: {
      id: string
      name: string
      status: string
      criteriaId: string
      createdAt: string
      updatedAt: string
      sections: Array<{
        type: string
        label: string
        order: number
        config: {
          fields?: Array<string>
          showHealthLabel?: boolean
          showAverageScore?: boolean
          showOverallScore?: boolean
          showRemainingLife?: boolean
          layout?: string
          maxVisible?: number
          allowedTypes?: Array<string>
          embedType?: string
          placeholder?: string
          showNotes?: boolean
          showMaxPoints?: boolean
          nteCurrency?: string
          pageSize?: number
          showVersion?: boolean
          showFileSize?: boolean
          showUploadDate?: boolean
          allowInBrowserView?: boolean
        }
      }>
    }
  }
  inspections: Array<IDashboardInspectionListItem>
  folders: Array<IPropertyInspectionFolderItem>
}

export type INOAccessReason = 'NO_ACCESS' | 'REVOKED' | 'EXPIRED'
export type ICheckPropertyAccessResponse =
  | { hasAccess: true }
  | { hasAccess: false; reason: INOAccessReason }

export interface SetAccessExpirationPayload {
  dashboardId: string
  userId: string
  accessExpiresAt: string
}

export interface SetAccessExpirationResponse {
  id: string
  dashboardId: string
  userId: string
  accessExpiresAt: string
  updatedAt: string
}

export interface IShareDashboardParams {
  dashboardId: string
  emailOrUserId: string
  expiresAt?: string
}
