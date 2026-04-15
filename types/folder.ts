export type IPropertyInspectionFolderItem = {
  id: string
  dashboardId: string
  parentId: null | string
  name: string
  createdAt: string
  updatedAt: string
  items: Array<{
    inspectionId: string
  }>
}

export type IFolderItem = {
  id: string
  name: string
  dashboardId: string
  createdAt: string
  updatedAt: string
  inspectionCount: number
  fileCount: number
  totalSizeBytes: number
  totalSizeLabel: string
}
export type IFolderInspectionReportSelectItem = {
  id: string
  title: string
  createdAt: string
}

export type ICreateNewFolderWithInspectionPayload = {
  name: string
  inspectionIds: Array<string>
}

export interface ISingleFolderInfo {
  id: string
  name: string
  dashboardId: string
  createdAt: string
  inspections: IFolderInspectionReportSelectItem[]
}
