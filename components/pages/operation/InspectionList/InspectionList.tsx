'use client'
import { InspectionProgressStatus } from '@/components/dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { CalendarIcon } from '@/components/icons/Calender'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { ReactNode, useState } from 'react'
import InspectionListItem from './InspectionListItem'

interface InspectionListProps {
  title: string
  subTitle?: ReactNode
  actionButton: ReactNode
}

export default function InspectionList({ title, subTitle, actionButton }: InspectionListProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4 py-5">
      <section className="flex items-center justify-between">
        <h3 className="text-foreground text-xl font-medium">{title}</h3>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="size-5" />
              <hr className="border-gray-black-50 h-4 border max-xl:hidden" />
              <span className="max-xl:hidden">{date ? format(date, 'PPP') : 'Pick a date'}</span>
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
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </section>

      {subTitle}

      <section className="mt-4 space-y-3">
        {mockInspections.map((inspection) => (
          <InspectionListItem
            slug="123"
            status={inspection.status as InspectionProgressStatus}
            key={inspection.id}
            title={inspection.title}
            time={inspection.time}
            propertyName={inspection.propertyName}
            address={inspection.address}
            actionButton={actionButton}
          />
        ))}
      </section>
    </div>
  )
}

export const mockInspections = [
  {
    id: '1',
    title: 'Private Residence',
    time: '8:45 AM',
    propertyName: 'Riverside Apartments',
    address: '1234 Sunset Blvd, CA 90028',
    status: 'DUE',
  },
  {
    id: '2',
    title: 'Commercial Building',
    time: '10:30 AM',
    propertyName: 'Downtown Plaza',
    address: '5678 Main Street, CA 90012',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Warehouse Inspection',
    time: '1:15 PM',
    propertyName: 'West Coast Storage',
    address: '890 Industrial Rd, CA 90210',
    status: 'ASSIGNED',
  },
  {
    id: '4',
    title: 'Summit Heights Apartments',
    time: '1:15 PM',
    propertyName: 'West Coast Storage',
    address: '890 Industrial Rd, CA 90210',
    status: 'COMPLETED',
  },
]
