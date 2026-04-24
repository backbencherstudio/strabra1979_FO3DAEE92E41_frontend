import { RootState } from '@/redux/store'
import { EditBoxSize, ITemplateSection } from '@/types'
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
      state.sections = action.payload.sections.sort((a, b) => a.order - b.order)
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
      if (state.currentBox && state.currentBox.index === index) {
        state.currentBox.data = state.sections[index]
      }
    },
    moveOrderUp: (state, action: PayloadAction<{ order: number }>) => {
      const { order } = action.payload
      const current = state.sections.find((s) => s.order === order)
      if (!current) return
      const prevSibling = state.sections
        .filter((s) => s.order < order)
        .sort((a, b) => b.order - a.order)[0]
      if (!prevSibling) return
      const currentOrder = current.order
      const prevOrder = prevSibling.order
      current.order = prevOrder
      prevSibling.order = currentOrder

      if (state.currentBox && state.currentBox.data.order === order) {
        state.currentBox.data.order = prevOrder
      } else if (state.currentBox && state.currentBox.data.order === prevOrder) {
        state.currentBox.data.order = currentOrder
      }
    },
    moveOrderDown: (state, action: PayloadAction<{ order: number }>) => {
      const { order } = action.payload
      const current = state.sections.find((s) => s.order === order)
      if (!current) return
      const nextSibling = state.sections
        .filter((s) => s.order > order)
        .sort((a, b) => a.order - b.order)[0]
      if (!nextSibling) return
      const currentOrder = current.order
      const nextOrder = nextSibling.order
      current.order = nextOrder
      nextSibling.order = currentOrder

      if (state.currentBox && state.currentBox.data.order === order) {
        state.currentBox.data.order = nextOrder
      } else if (state.currentBox && state.currentBox.data.order === nextOrder) {
        state.currentBox.data.order = currentOrder
      }
    },
  },
})

export const {
  setCurrentBox,
  setInitialTemplateData,
  updateSectionByIndex,
  moveOrderUp,
  moveOrderDown,
} = templateSlice.actions

export default templateSlice.reducer

export const selectCurrentBox = (state: RootState) => state.template.currentBox
// export const selectTemplateSections = (state: RootState) => state.template.sections
export const selectTemplateSectionsWithSorted = (state: RootState) =>
  state.template.sections.toSorted((a, b) => a.order - b.order)
