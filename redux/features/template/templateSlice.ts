import { RootState } from '@/redux/store'
import { ITemplateSection, EditBoxSize } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type EditableBoxType = ITemplateSection
export type EditableSection = {
  id: string
  type: ITemplateSection
  label: string
  order: number
  size: EditBoxSize
}

export type CurrentSelectedBox = {
  index: number
  data: EditableSection
}

interface EditTemplateState {
  currentBox: CurrentSelectedBox | null
  sections: EditableSection[]
}

const initialState: EditTemplateState = {
  currentBox: null,
  sections: [],
}

const templateSlice = createSlice({
  name: 'template',
  initialState: initialState,
  reducers: {
    setCurrentBox: (state, action: PayloadAction<CurrentSelectedBox | null>) => {
      state.currentBox = action.payload
    },
    setInitialTemplateData: (state, action: PayloadAction<{ sections: EditableSection[] }>) => {
      state.sections = action.payload.sections
    },
    updateSectionByIndex: (
      state,
      action: PayloadAction<{ index: number; section: Partial<EditableSection> }>,
    ) => {
      const { index } = action.payload
      if (index < 0 || index >= state.sections.length) return
      state.sections[index] = {
        ...state.sections[index],
        ...action.payload.section,
        id: state.sections[index].id,
      }
    },
  },
})

export const { setCurrentBox, setInitialTemplateData, updateSectionByIndex } = templateSlice.actions

export default templateSlice.reducer

export const selectCurrentBox = (state: RootState) => state.template.currentBox
export const selectTemplateSections = (state: RootState) => state.template.sections
