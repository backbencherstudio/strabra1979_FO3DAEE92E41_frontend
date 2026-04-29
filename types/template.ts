import {
  AdditionalNotesConfig,
  IInspectionHealthThresholdConfig,
  InspectionHealthScoreRange,
  NteConfig,
  RepairPlanningConfig,
} from './inspectinForm'

export type ITemplateActiveStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export const EDIT_BOX_SIZES = {
  full: 'col-span-full',
  '1/2': 'col-span-6',
  '1/3': 'col-span-4',
  '2/3': 'col-span-8',
} as const

export type EditBoxSize = keyof typeof EDIT_BOX_SIZES

export function getBoxWidth(width: EditBoxSize = 'full') {
  return EDIT_BOX_SIZES[width]
}

export const TEMPLATE_SECTIONS = [
  'header_info',
  'health_snapshot',
  'media_grid',
  'aerial_map',
  'tour_3d',
  'repair_planning',
  'roof_health_rating',
  'additional_info',
  'documents',
] as const
export type ITemplateSection = (typeof TEMPLATE_SECTIONS)[number]

export type IDashboardTemplate = {
  id: string
  name: string
  status: ITemplateActiveStatus
  criteriaId: string
  createdAt: string
  updatedAt: string
  sections: Array<{
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
  }>
  criteria: {
    id: string
    name: string
    description: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    headerFields: Array<{
      key: string
      type: string
      label: string
      order: number
      options?: Array<string>
      isSystem: boolean
      required: boolean
      placeholder: string
    }>
    scoringCategories: Array<{
      key: string
      label: string
      order: number
      isSystem: boolean
      maxPoints: number
    }>
    mediaFields: Array<{
      key: string
      type: string
      label: string
      order: number
      accept?: Array<string>
      isSystem: boolean
      placeholder: string
    }>
    nteConfig: NteConfig
    additionalNotesConfig: AdditionalNotesConfig
    repairPlanningConfig: RepairPlanningConfig
    healthThresholdConfig: IInspectionHealthThresholdConfig
  }
  _count: {
    properties: number
  }
}

export type IDashboardTemplateListItem = {
  id: string
  name: string
  status: ITemplateActiveStatus
}

export type IUpdateSectionStylePayload = {
  order: number
  width?: EditBoxSize
  label?: string
}
