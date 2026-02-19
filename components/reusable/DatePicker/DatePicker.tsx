import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps extends React.PropsWithChildren {
  open: boolean
  value?: string
  setOpen: (v: boolean) => void
  placeholder?: string
  trigger?: React.ReactNode
}

export function DatePickerWrapper({
  open,
  value,
  setOpen,
  placeholder = '',
  children,
  trigger,
}: DatePickerProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {trigger ? (
        trigger
      ) : (
        <PopoverTrigger asChild className="squircle h-14 justify-start font-normal">
          <Button variant="outline" id="date">
            {value ?? placeholder}
          </Button>
        </PopoverTrigger>
      )}

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {children}
      </PopoverContent>
    </Popover>
  )
}
