import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EditableBoxType, EditableSection } from '@/redux/features/template/templateSlice'
import { useTemplateProperties } from '@/redux/features/template/useTemplateProperties'
import { EditBoxSize, getBoxWidth } from '@/types'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface EditBoxProps extends Omit<React.ComponentProps<'div'>, 'onSelect'> {
  box?: EditableBoxType
  boxSize: EditBoxSize
  checked: boolean
  index: number
  onSelect: () => void
  data: EditableSection
  isEditMode?: boolean
}

export function EditBox({
  index,
  checked,
  onSelect,
  data,
  boxSize = 'full',
  children,
  className,
  isEditMode,
  ...props
}: EditBoxProps) {
  return (
    <div
      onClick={isEditMode ? onSelect : undefined}
      className={cn(
        'relative flex items-center gap-2 rounded-2xl',
        className,
        getBoxWidth(boxSize),
        {
          'ring-offset-normal-25 cursor-pointer ring-2 ring-blue-100 ring-offset-4 hover:ring-blue-300': isEditMode,
          'ring-blue-500 hover:ring-blue-500': checked && isEditMode,
        },
      )}
      {...props}
    >
      {/* <EditBoxTool data={data} index={index} /> */}
      {isEditMode && checked ? <EditBoxTool data={data} index={index} /> : null}
      <div className="size-full *:size-full">{children}</div>
    </div>
  )
}

interface EditBoxToolProps {
  index: number
  data: EditableSection
}

export function EditBoxTool({ index, data }: EditBoxToolProps) {
  const { moveOrderUp, moveOrderDown } = useTemplateProperties()

  return (
    <div className="toolbox absolute -top-1 left-2 -translate-y-full rounded-xs bg-blue-500 px-1 pt-1">
      <div className="space-x-">
        <Button
          size="icon-xs"
          className="hover:text-primary bg-transparent hover:bg-transparent"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            moveOrderUp({ order: data.order })
          }}
        >
          <ArrowUp className="size-4" />
        </Button>

        <Button
          size="icon-xs"
          className="hover:text-primary bg-transparent hover:bg-transparent"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            moveOrderDown({ order: data.order })
          }}
        >
          <ArrowDown className="size-4" />
        </Button>

        {/* <span className="text-xs text-white">{data.order}</span> */}
      </div>
    </div>
  )
}
