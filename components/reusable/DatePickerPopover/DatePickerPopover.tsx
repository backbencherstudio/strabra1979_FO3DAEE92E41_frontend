'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from '@/components/icons/Calender'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  date?: Date
  onChange: (date?: Date | null) => void
  placeholder?: string
}

export default function DatePickerPopover({ date, onChange, placeholder = 'Pick a date' }: Props) {
  const [open, setOpen] = useState(false)
  const hasDate = date != undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button variant="muted" className="gap-2">
            <CalendarIcon className="size-5" />
            <span className={cn('max-xl:hidden', { 'pr-5': hasDate })}>
              {hasDate ? format(date, 'PPP') : placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        {hasDate ? (
          <div className="absolute top-1/2 right-1 -translate-y-1/2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                onChange(null)
              }}
              variant="ghost"
              className="rounded-full"
              size="icon-xs"
            >
              <X />
            </Button>
          </div>
        ) : null}
      </div>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onChange(newDate)
            setOpen(false)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
