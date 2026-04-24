import { useAppDispatch } from '@/redux/store'
import {
  updateSectionByIndex,
  moveOrderUp as moveOrderUpAction,
  moveOrderDown as moveOrderDownAction,
} from './templateSlice'
import { EDIT_BOX_SIZES, EditBoxSize } from '@/types'

export function useTemplateProperties() {
  const dispatch = useAppDispatch()

  function updateWidth({ index, size }: { index: number; size: EditBoxSize }) {
    if (size in EDIT_BOX_SIZES) {
      dispatch(updateSectionByIndex({ index, section: { size } }))
    }
  }

  function moveOrderUp({ order }: { order: number }) {
    dispatch(moveOrderUpAction({ order }))
  }

  function moveOrderDown({ order }: { order: number }) {
    dispatch(moveOrderDownAction({ order }))
  }

  return {
    updateWidth,
    moveOrderUp,
    moveOrderDown,
  }
}

