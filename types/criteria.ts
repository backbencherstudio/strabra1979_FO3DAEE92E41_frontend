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
  label: string
  placeholder: string
  required: boolean
  isDropdown?: boolean
  options?: string[]
  criteriaId: string
}
