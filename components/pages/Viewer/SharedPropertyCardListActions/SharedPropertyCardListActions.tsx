'use client'
import DatePickerPopover from '@/components/reusable/DatePickerPopover/DatePickerPopover'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import SortDropdown from '@/components/reusable/SortDropdown/SortDropdown'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { CalendarIcon, Search, X } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useSharedPropertyCardListContext } from './SharedPropertyCardListContext'
import { format } from 'date-fns'
import { PopoverTrigger } from '@/components/ui/popover'

interface SharedPropertyCardListActionsProps extends React.PropsWithChildren {
  title: string
  titleClassName?: string
  actionButtonText?: string | ReactNode
  onActionButtonClick?: () => void
  actionButtonClassName?: string
  showActionButton?: boolean
  showSearch?: boolean
  showDateFilter?: boolean
  showSortOrder?: boolean
  searchPlaceholder?: string
}

export default function SharedPropertyCardListActions({
  title,
  titleClassName,
  actionButtonText = 'Action',
  onActionButtonClick,
  actionButtonClassName,
  showActionButton = false,
  showSearch = false,
  showDateFilter = false,
  showSortOrder = false,
  children,
  searchPlaceholder = 'Search...',
}: SharedPropertyCardListActionsProps) {
  const { sortOrder, search, setSearch, setSortOrder, setDate, dateFrom } =
    useSharedPropertyCardListContext()

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const date = dateFrom?.raw ?? undefined
  const hasDate = date != undefined

  return (
    <div
      className={cn('flex items-center justify-between gap-4', {
        'flex-col items-stretch': showActionButton,
      })}
    >
      <section className="flex items-center justify-between">
        <SectionTitle className={cn('text-[#051218] md:text-2xl', titleClassName)}>
          {title}
        </SectionTitle>

        {showActionButton ? (
          <Button
            size="lg"
            variant="default"
            className={actionButtonClassName}
            onClick={onActionButtonClick}
          >
            {actionButtonText}
          </Button>
        ) : null}
      </section>

      <section className="flex justify-end">
        <div className="flex items-center gap-3">
          {showSearch ? (
            <InputGroup className="h-10.5 bg-transparent">
              <InputGroupInput
                value={search}
                onChange={(v) => setSearch(v.target.value)}
                placeholder={searchPlaceholder}
              />
              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>

              <InputGroupAddon align="inline-end">
                <Button
                  onClick={() => setSearch('')}
                  className={cn('rounded-full', { 'pointer-events-none opacity-0': !search })}
                  size="icon-xs"
                  variant="ghost"
                >
                  <X className="size-4" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          ) : null}

          {showDateFilter ? (
            <DatePickerPopover
              date={dateFrom?.raw ?? undefined}
              onSelect={(v) => setDate({ dateFrom: v })}
              open={openDatePicker}
              onOpenChange={setOpenDatePicker}
            >
              <div className="relative">
                <PopoverTrigger asChild>
                  <Button variant="muted" className="gap-2">
                    <CalendarIcon className="size-5" />
                    <span className={cn('max-xl:hidden', { 'pr-5': hasDate })}>
                      {hasDate ? format(date, 'PPP') : 'Filter by Date'}
                    </span>
                  </Button>
                </PopoverTrigger>

                {hasDate ? (
                  <div className="absolute top-1/2 right-1 -translate-y-1/2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setOpenDatePicker(false)
                        setDate({ dateFrom: null })
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
            </DatePickerPopover>
          ) : null}

          {children}

          {showSortOrder ? <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} /> : null}
        </div>
      </section>
    </div>
  )
}
