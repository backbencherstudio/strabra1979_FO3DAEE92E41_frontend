import { RootState } from '@/redux/store'
import {
  IDashboardInspectionListItem,
  IInspectionFieldValues,
  IInspectionScoreCheckboxValue,
  IPiorityRepairPlanItem,
} from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InspectionFormState {
  headerData: IInspectionFieldValues

  scores: Record<string, IInspectionScoreCheckboxValue>

  repairItems?: Array<IPiorityRepairPlanItem>

  nteValue: number
  additionalComments: string

  mediaFiles: File[]
}

const initialState: InspectionFormState = {
  headerData: {},
  scores: {},
  repairItems: [],
  nteValue: 0,
  additionalComments: '',
  mediaFiles: [],
}

const inspectionFormSlice = createSlice({
  name: 'inspectionForm',
  initialState: initialState,
  reducers: {
    setHeaderData: (state, action: PayloadAction<IInspectionFieldValues>) => {
      state.headerData = action.payload
    },
    updateHeaderField: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.headerData[action.payload.key] = action.payload.value
    },
    clearHeaderData: (state) => {
      state.headerData = {}
    },

    setScores: (state, action: PayloadAction<Record<string, IInspectionScoreCheckboxValue>>) => {
      state.scores = action.payload
    },
    updateScore: (
      state,
      action: PayloadAction<{
        key: string
        value: IInspectionScoreCheckboxValue
      }>,
    ) => {
      state.scores[action.payload.key] = action.payload.value
    },
    updateScoreValue: (
      state,
      action: PayloadAction<{
        key: string
        score: number
      }>,
    ) => {
      if (!state.scores[action.payload.key]) {
        state.scores[action.payload.key] = { notes: '', score: 0 }
      }
      state.scores[action.payload.key].score = action.payload.score
    },
    updateScoreNote: (
      state,
      action: PayloadAction<{
        key: string
        note: string
      }>,
    ) => {
      if (!state.scores[action.payload.key]) {
        state.scores[action.payload.key] = { notes: '', score: 0 }
      }
      state.scores[action.payload.key].notes = action.payload.note
    },
    clearScores: (state) => {
      state.scores = {}
    },

    setRepairItems: (state, action: PayloadAction<Array<IPiorityRepairPlanItem>>) => {
      state.repairItems = action.payload
    },
    addRepairItem: (state, action: PayloadAction<IPiorityRepairPlanItem>) => {
      state.repairItems?.push(action.payload)
    },
    updateRepairItem: (
      state,
      action: PayloadAction<{ id: string; item: Partial<IPiorityRepairPlanItem> }>,
    ) => {
      const index = state.repairItems?.findIndex((item) => item.id === action.payload.id)
      if (index !== undefined && index !== -1 && state.repairItems) {
        state.repairItems[index] = {
          ...state.repairItems[index],
          ...action.payload.item,
        }
      }
    },
    removeRepairItem: (state, action: PayloadAction<string>) => {
      state.repairItems = state.repairItems?.filter((item) => item.id !== action.payload)
    },
    clearRepairItems: (state) => {
      state.repairItems = []
    },

    setNteValue: (state, action: PayloadAction<number>) => {
      state.nteValue = action.payload
    },
    clearNteValue: (state) => {
      state.nteValue = 0
    },

    setAdditionalComments: (state, action: PayloadAction<string>) => {
      state.additionalComments = action.payload
    },
    clearAdditionalComments: (state) => {
      state.additionalComments = ''
    },

    setMediaFiles: (state, action: PayloadAction<File[]>) => {
      state.mediaFiles = action.payload
    },
    addMediaFile: (state, action: PayloadAction<File>) => {
      state.mediaFiles.push(action.payload)
    },
    removeMediaFile: (state, action: PayloadAction<number>) => {
      state.mediaFiles.splice(action.payload, 1)
    },
    clearMediaFiles: (state) => {
      state.mediaFiles = []
    },

    clearInspectionForm: (state) => {
      state.headerData = {}
      state.scores = {}
      state.repairItems = []
      state.nteValue = 0
      state.additionalComments = ''
      state.mediaFiles = []
    },
    setDefaultInspectionFormData: (state, action: PayloadAction<IDashboardInspectionListItem>) => {
      state.headerData = action.payload.headerData ?? {}
      state.scores = action.payload.scores ?? {}
      state.repairItems = action.payload.repairItems ?? []
      state.nteValue = action.payload.nteValue ?? ''
      state.additionalComments = action.payload.additionalComments ?? ''
      state.mediaFiles = []
    },
  },
})

export const {
  setHeaderData,
  updateHeaderField,
  clearHeaderData,

  setScores,
  updateScore,
  updateScoreValue,
  updateScoreNote,
  clearScores,

  setRepairItems,
  addRepairItem,
  updateRepairItem,
  removeRepairItem,
  clearRepairItems,

  setNteValue,
  clearNteValue,
  setAdditionalComments,
  clearAdditionalComments,

  setMediaFiles,
  addMediaFile,
  removeMediaFile,
  clearMediaFiles,

  clearInspectionForm,
  setDefaultInspectionFormData,
} = inspectionFormSlice.actions

export default inspectionFormSlice.reducer

export const selectInspectionHeaderData = (state: RootState) => state.inspectionForm.headerData
export const selectInspectionScores = (state: RootState) => state.inspectionForm.scores
export const selectInspectionRepairItems = (state: RootState) => state.inspectionForm.repairItems
export const selectInspectionNteValue = (state: RootState) => state.inspectionForm.nteValue
export const selectInspectionAdditionalComments = (state: RootState) =>
  state.inspectionForm.additionalComments
export const selectInspectionMediaFiles = (state: RootState) => state.inspectionForm.mediaFiles
