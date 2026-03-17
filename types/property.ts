import { IAuthUserRole } from './auth'

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
  propertyManager: {
    id: string
    username: string
    email: string
    avatar?: string
  }
  dashboard: {
    id: string
    updatedAt: string
    propertyId: string
    latestInspection: {
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

export interface IPropertyManager {
  id: string
  username: string
  email: string
  avatar: string | null
  role: 'PROPERTY_MANAGER'
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
