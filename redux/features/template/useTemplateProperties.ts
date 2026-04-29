import { useAppDispatch } from '@/redux/store'
import { EDIT_BOX_SIZES, EditBoxSize } from '@/types'
import {
  CurrentSelectedBox,
  EditableField,
  moveOrderDown as moveOrderDownAction,
  moveOrderUp as moveOrderUpAction,
  updateSectionStyles,
} from './templateSlice'

export function useTemplateProperties() {
  const dispatch = useAppDispatch()

  async function updateWidth({
    currentBox,
    newWidth,
  }: {
    currentBox: CurrentSelectedBox
    newWidth: EditBoxSize
  }) {
    if (!(newWidth in EDIT_BOX_SIZES)) {
      return
    }

    const isPropertyMarkedAsChange = currentBox.data.changedFields.includes('width')
    let changedFields: EditableField[] = [...currentBox.data.changedFields]

    if (!isPropertyMarkedAsChange) {
      changedFields = [...new Set([...currentBox.data.changedFields, 'width' as EditableField])]
    }

    dispatch(
      updateSectionStyles({
        type: currentBox.data.type,
        section: {
          changedFields,
          style: {
            width: newWidth,
          },
        },
      }),
    )
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
