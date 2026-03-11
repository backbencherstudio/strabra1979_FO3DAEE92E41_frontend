'use client'
import DatePickerPopover from '@/components/reusable/DatePickerPopover/DatePickerPopover'
import { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import SortDropdown from '@/components/reusable/SortDropdown/SortDropdown'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { ReactNode } from 'react'
import { useSharedPropertyCardListContext } from './SharedPropertyCardListContext'

interface SharedPropertyCardListActionsProps {
  title: string
  titleClassName?: string
  showActionButton?: boolean
  showSearch?: boolean
  actionButtonText?: string | ReactNode
  onActionButtonClick?: () => void
  actionButtonClassName?: string
}

export default function SharedPropertyCardListActions({
  title,
  titleClassName,
  showActionButton = false,
  showSearch = false,
  actionButtonText = 'Action',
  onActionButtonClick,
  actionButtonClassName,
}: SharedPropertyCardListActionsProps) {
  const { sortOrder, setSortOrder, setDate, dateFrom } = useSharedPropertyCardListContext()

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
          <Button variant="default" className={actionButtonClassName} onClick={onActionButtonClick}>
            {actionButtonText}
          </Button>
        ) : null}
      </section>

      <section className="flex justify-end">
        <div className="flex items-center gap-3">
          {showSearch ? (
            <InputGroup className="h-10.5 bg-transparent">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          ) : null}
          <DatePickerPopover
            placeholder="Filter by Date"
            date={dateFrom?.raw ?? undefined}
            onChange={(v) => setDate({ dateFrom: v })}
          />

          <SortDropdown sortOrder={sortOrder} onChange={setSortOrder} />
        </div>
      </section>
    </div>
  )
}
