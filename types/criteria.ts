import {
  AdditionalNotesConfig,
  IInspectionHealthThresholdConfig,
  IInspectionInputField,
  IInspectionMediaField,
  NteConfig,
  RepairPlanningConfig,
  ScoringCategory,
} from './inspectinForm'

export interface IInspectionCriteria {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  headerFields: IInspectionInputField[]
  scoringCategories: ScoringCategory[]
  mediaFields: IInspectionMediaField[]
  nteConfig: NteConfig
  additionalNotesConfig: AdditionalNotesConfig
  repairPlanningConfig: RepairPlanningConfig
  healthThresholdConfig: IInspectionHealthThresholdConfig
}

export interface ICreateHeaderFieldParams {
  criteriaId: string
  label: string
  placeholder: string
  required: boolean
  isDropdown?: boolean
  options?: string[]
}

export interface ICreateFieldFieldParams {
  criteriaId: string
  label: string
  maxPoints: number
}

export type EditTextAreaFieldType = 'NTE' | 'ADDITIONAL_NOTES'
export interface IEditTextAreaFieldParams {
  label: string
  placeholder: string
}
