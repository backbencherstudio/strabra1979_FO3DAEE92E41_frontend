import { RootState } from '@/redux/store'
import { EditBoxSize, ITemplateSection } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const EDITABLE_FIELDS = ['label', 'width'] as const
export type EditableField = (typeof EDITABLE_FIELDS)[number]

export type EditableBoxType = ITemplateSection
export type EditableSection = {
  id: string
  changedFields: EditableField[]
  type: ITemplateSection
  label: string
  order: number
  style: {
    width: EditBoxSize
  }
}

export type CurrentSelectedBox = {
  data: EditableSection
}
export type OrderChangeState = 'idle' | 'dirty' | 'saved'

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
      if (state.currentBox) {
        state.currentBox.data.changedFields = []
      }
      state.sections = action.payload.sections.sort((a, b) => a.order - b.order)
    },
    updateSectionStyles: (
      state,
      action: PayloadAction<{
        type: ITemplateSection
        section: Partial<EditableSection>
      }>,
    ) => {
      const { type } = action.payload
      const index = state.sections.findIndex((item) => item.type === type)
      if (index < 0 || index >= state.sections.length) return

      state.sections[index] = {
        ...state.sections[index],
        ...action.payload.section,
        id: state.sections[index].id,
      }
      if (state.currentBox && state.currentBox.data.type === type) {
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
    // updateOrderChangeState: (state, action: PayloadAction<OrderChangeState>) => {
    //   state.orderChangeState = action.payload
    // },
  },
})

export const {
  setCurrentBox,
  setInitialTemplateData,
  updateSectionStyles,
  moveOrderUp,
  moveOrderDown,
} = templateSlice.actions

export default templateSlice.reducer

export const selectCurrentBox = (state: RootState) => state.template.currentBox
export const selectTemplateSections = (state: RootState) => state.template.sections
