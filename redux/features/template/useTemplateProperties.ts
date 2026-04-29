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

  async function updateLabel({
    currentBox,
    newLablel,
  }: {
    currentBox: CurrentSelectedBox
    newLablel: string
  }) {
    if (!newLablel || newLablel.trim() === '' || newLablel === currentBox.data.label) return

    const isPropertyMarkedAsChange = currentBox.data.changedFields.includes('label')
    let changedFields: EditableField[] = [...currentBox.data.changedFields]

    if (!isPropertyMarkedAsChange) {
      changedFields = [...new Set([...currentBox.data.changedFields, 'label' as EditableField])]
    }

    dispatch(
      updateSectionStyles({
        type: currentBox.data.type,
        section: { changedFields, label: newLablel },
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
    updateLabel,
    updateWidth,
    moveOrderUp,
    moveOrderDown,
  }
}
