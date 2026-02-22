'use client'
import { CalendarIcon } from '@/components/icons/Calender'
import { SortingIcon } from '@/components/icons/SortIcon'
import { DatePickerWrapper } from '@/components/reusable/DatePicker/DatePicker'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import React from 'react'

interface SharedPropertyCardListActionsProps {
  title: string
  titleClassName?: string
}

export default function SharedPropertyCardListActions({
  title,
  titleClassName,
}: SharedPropertyCardListActionsProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex justify-between gap-3 max-lg:flex-col lg:items-center">
      <SectionTitle className={cn('text-[#051218] md:text-2xl', titleClassName)}>
        {title}
      </SectionTitle>

      <div className="flex items-center gap-3">
        <InputGroup className="bg-transparen h-10.5">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <DatePickerWrapper
          placeholder="Select date"
          value={date?.toLocaleDateString()}
          open={open}
          setOpen={setOpen}
          trigger={
            <PopoverTrigger asChild>
              <Button variant="muted">
                <CalendarIcon className="size-5" />
                <span className="max-xl:hidden">Filter by Date</span>
              </Button>
            </PopoverTrigger>
          }
        >
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </DatePickerWrapper>

        {/* TODO: date picker same as the design */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="muted">
              <SortingIcon className="size-5" />
              <span className="max-xl:hidden">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-navy-300">
            <DropdownMenuGroup>
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
