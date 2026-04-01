import { IRepairProgressStatus } from './inspection'

// -------------------- Reusable Base Interfaces --------------------
interface BaseField {
  key: string
  label: string
  order: number
  isSystem: boolean
}

// shared input props
interface BaseInputProps {
  required?: boolean
  placeholder?: string
}
// Text field
interface TextField extends BaseField, BaseInputProps {
  type: 'text'
}
// Dropdown field
interface DropdownField extends BaseField, BaseInputProps {
  type: 'dropdown'
  options: string[]
}

export type IInspectionInputField = TextField | DropdownField

export interface IInspectionMediaField extends BaseField {
  type: string
  accept?: string[]
  placeholder?: string
}

// -------------------- Scoring & Health --------------------
export interface ScoringCategory extends BaseField {
  maxPoints: number
}

export interface InspectionHealthScoreRange {
  maxScore: number
  minScore: number
  remainingLifeMaxYears: number
  remainingLifeMinYears: number
}

export interface IInspectionHealthThresholdConfig {
  fair: InspectionHealthScoreRange
  good: InspectionHealthScoreRange
  poor: InspectionHealthScoreRange
}

// -------------------- Configs --------------------
export interface RepairPlanningConfig {
  statuses: IRepairProgressStatus[]
}

export interface NteConfig {
  label: string
  placeholder: string
}

export interface AdditionalNotesConfig {
  label: string
  placeholder: string
}

// -------------------- Form & Main Interface --------------------
export interface IInspectionFormData {
  headerFields: IInspectionInputField[]
  scoringCategories: ScoringCategory[]
  mediaFields: IInspectionMediaField[]
  repairPlanningConfig: RepairPlanningConfig
  nteConfig: NteConfig
  additionalNotesConfig: AdditionalNotesConfig
  healthThresholdConfig: IInspectionHealthThresholdConfig
}

export interface IPropertyInspectionFormData {
  dashboardId: string
  criteriaId: string
  form: IInspectionFormData
}
