export type IPropertyListItem = {
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
  propertyManager: {
    id: string
    name?: string
    email?: string
    avatar?: string
    inspections: Array<string>
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
