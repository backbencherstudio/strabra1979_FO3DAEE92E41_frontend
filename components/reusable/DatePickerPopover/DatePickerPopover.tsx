'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent } from '@/components/ui/popover'

interface Props extends React.ComponentProps<typeof Popover> {
  date?: Date
  onSelect: (newDate: Date | undefined) => void
  renderTrigger?: boolean
}

export default function DatePickerPopover({
  date,
  onSelect,
  onOpenChange,
  open,
  children,
  ...props
}: Props) {
  return (
    <Popover open={open} onOpenChange={onOpenChange} {...props}>
      {children}
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="single" selected={date} onSelect={onSelect} autoFocus />
      </PopoverContent>
    </Popover>
  )
}
