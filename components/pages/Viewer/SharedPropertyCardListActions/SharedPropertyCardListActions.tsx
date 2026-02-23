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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns'

interface SharedPropertyCardListActionsProps {
  title: string
  titleClassName?: string
  showActionButton?: boolean
  actionButtonText?: string
  onActionButtonClick?: () => void
  actionButtonClassName?: string
}

export default function SharedPropertyCardListActions({
  title,
  titleClassName,
  showActionButton = false,
  actionButtonText = 'Action',
  onActionButtonClick,
  actionButtonClassName,
}: SharedPropertyCardListActionsProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      {showActionButton ? (
        /* Layout when button exists: Title - Button (justified between) */
        <>
          <div className="flex justify-between items-center mb-4">
            <SectionTitle className={cn('text-[#051218] md:text-2xl', titleClassName)}>
              {title}
            </SectionTitle>
            
            <Button 
              variant="default" 
              className={actionButtonClassName}
              onClick={onActionButtonClick}
            >
              {actionButtonText}
            </Button>
          </div>
          
          {/* Filter options - right aligned */}
          <div className="flex justify-end">
            <div className="flex items-center gap-3">
              <InputGroup className="h-10.5 bg-transparent">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>

              {/* Date Picker */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="muted" className="gap-2">
                    <CalendarIcon className="size-5" />
                    <span className="max-xl:hidden">
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="muted" className="gap-2">
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
        </>
      ) : (
        /* Layout when no button: Title left, Filter options right */
        <div className="flex justify-between items-center gap-3 max-lg:flex-col lg:items-center">
          <SectionTitle className={cn('text-[#051218] md:text-2xl', titleClassName)}>
            {title}
          </SectionTitle>

          <div className="flex items-center gap-3">
            <InputGroup className="h-10.5 bg-transparent">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            {/* Date Picker */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="muted" className="gap-2">
                  <CalendarIcon className="size-5" />
                  <span className="max-xl:hidden">
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate)
                    setOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="muted" className="gap-2">
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
      )}
    </div>
  )
}