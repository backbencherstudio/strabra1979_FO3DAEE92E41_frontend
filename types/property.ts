export const PropertyTypeObj = {
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential',
  INDUSTRIAL: 'Industrial',
  MIXED_USE: 'Mixed Use',
} as const

export type IPropertyType = (typeof PropertyTypeObj)[keyof typeof PropertyTypeObj]

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
