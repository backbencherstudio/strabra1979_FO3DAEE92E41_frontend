import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  EditableBoxType,
  EditableSection,
  updateSectionByIndex,
} from '@/redux/features/template/templateSlice'
import { useAppDispatch } from '@/redux/store'
import { EDIT_BOX_SIZES, EditBoxSize } from '@/types'
import { ArrowDown, ArrowUp, RulerDimensionLine } from 'lucide-react'

interface EditBoxProps extends Omit<React.ComponentProps<'div'>, 'onSelect'> {
  box?: EditableBoxType
  boxSize: EditBoxSize
  checked: boolean
  index: number
  onSelect: () => void
  data: EditableSection
}

export function EditBox({
  index,
  checked,
  onSelect,
  boxSize = 'full',
  children,
  className,
  ...props
}: EditBoxProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'ring-offset-normal-25 relative col-span-4 flex cursor-pointer items-center gap-2 rounded-2xl ring-2 ring-blue-100 ring-offset-4 hover:ring-blue-300',
        className,
        EDIT_BOX_SIZES[boxSize],
        {
          'ring-orange-500 hover:ring-orange-500': checked,
        },
      )}
      {...props}
    >
      {checked ? <EditBoxTool index={index} /> : null}
      <div className="size-full *:size-full">{children}</div>
    </div>
  )
}

interface EditBoxToolProps {
  index: number
}

export function EditBoxTool({ index }: EditBoxToolProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="toolbox absolute -top-1 left-2 -translate-y-full rounded-xs bg-orange-500 px-1 pt-1">
      <div className="space-x-">
        <Button
          size="icon-xs"
          className="hover:text-primary bg-transparent hover:bg-transparent"
          type="button"
        >
          <ArrowUp className="size-4" />
        </Button>

        <Button
          size="icon-xs"
          className="hover:text-primary bg-transparent hover:bg-transparent"
          type="button"
        >
          <ArrowDown className="size-4" />
        </Button>

        <Button
          size="icon-xs"
          className="hover:text-primary bg-transparent hover:bg-transparent"
          type="button"
          onClick={() => dispatch(updateSectionByIndex({ index, section: { size: '1/2' } }))}
        >
          <RulerDimensionLine className="size-4" />
        </Button>
      </div>
    </div>
  )
}
