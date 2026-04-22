import { InspectionProgressStatus, IRepairProgressStatus } from './inspection'

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
  key: MediaFieldKeyType
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
export type EmbedFieldsData = { [key: string]: string }

export const MEDIA_FIELD_KEY_TYPES = ['mediaFiles', 'aerialMap', 'tour3d', 'documents'] as const
export type MediaFieldKeyType = (typeof MEDIA_FIELD_KEY_TYPES)[number]
export type MediaFieldItem = LocalMediaFile | RemoteMediaFile

export type LocalMediaFile = {
  kind: 'local'
  key: MediaFieldKeyType
  file: File
}

export type RemoteMediaFile = {
  kind: 'remote'
  key: MediaFieldKeyType
  file: IInspectionMediaFileItem
}

export type MediaFileType = 'PHOTO' | 'VIDEO' | 'EMBED' | 'PDF'
export const PHOTO_AND_VIDEO_FILETYPES: MediaFileType[] = ['PHOTO', 'VIDEO'] as const
export type IInspectionMediaFileItem = {
  id: string
  inspectionId: string
  fileName: string
  fileType: 'PHOTO' | 'VIDEO' | 'EMBED' | 'PDF'
  url: string
  size: number
  mediaFieldKey: MediaFieldKeyType
  category?: string
  uploadedAt: string
}

export type TableRow = {
  name: string
  status: InspectionProgressStatus
  lastUpdate: string
  size: number
  url: string
}

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
