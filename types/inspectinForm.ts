// -------------------- Reusable Base Interfaces --------------------
interface BaseField {
  key: string
  label: string
  order: number
  isSystem: boolean
}

interface InputField extends BaseField {
  type: string
  required?: boolean
  placeholder?: string
  options?: string[]
}

interface MediaField extends BaseField {
  type: string
  accept?: string[]
  placeholder?: string
}

// -------------------- Scoring & Health --------------------
export interface ScoringCategory extends BaseField {
  maxPoints: number
}

export interface ScoreRange {
  maxScore: number
  minScore: number
  remainingLifeMaxYears: number
  remainingLifeMinYears: number
}

export interface HealthThresholdConfig {
  fair: ScoreRange
  good: ScoreRange
  poor: ScoreRange
}

// -------------------- Configs --------------------
export interface RepairPlanningConfig {
  statuses: string[]
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
  headerFields: InputField[]
  scoringCategories: ScoringCategory[]
  mediaFields: MediaField[]
  repairPlanningConfig: RepairPlanningConfig
  nteConfig: NteConfig
  additionalNotesConfig: AdditionalNotesConfig
  healthThresholdConfig: HealthThresholdConfig
}

export interface IPropertyInspectionFormData {
  dashboardId: string
  criteriaId: string
  form: IInspectionFormData
}
