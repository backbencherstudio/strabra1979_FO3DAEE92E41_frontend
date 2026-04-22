export type ITemplateActiveStatus = 'Active' | 'Inactive' | 'DELETED'

export type ITemplateListItem = {
  id: string
  name: string
  status: string
  criteriaId: string
  createdAt: string
  updatedAt: string
  sections: Array<{
    type: string
    label: string
    order: number
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
    nteConfig: {
      label: string
      placeholder: string
    }
    additionalNotesConfig: {
      label: string
      placeholder: string
    }
    repairPlanningConfig: {
      statuses: Array<string>
    }
    healthThresholdConfig: {
      fair: {
        maxScore: number
        minScore: number
        remainingLifeMaxYears: number
        remainingLifeMinYears: number
      }
      good: {
        maxScore: number
        minScore: number
        remainingLifeMaxYears: number
        remainingLifeMinYears: number
      }
      poor: {
        maxScore: number
        minScore: number
        remainingLifeMaxYears: number
        remainingLifeMinYears: number
      }
    }
  }
  _count: {
    properties: number
  }
}
