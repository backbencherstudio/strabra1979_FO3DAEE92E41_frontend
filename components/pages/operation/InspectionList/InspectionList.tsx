'use client'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { isArrayEmpty } from '@/lib/utils'
import { IScheduledInspectionItem } from '@/types/overview'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import InspectionListItem from './InspectionListItem'
import { routes } from '@/constant'

interface InspectionListProps {
  title: string
  subTitle?: ReactNode
  actionButton: ReactNode
  isLoading: boolean
  data?: IScheduledInspectionItem[]
}

export default function InspectionList({
  title,
  subTitle,
  actionButton,
  isLoading,
  data,
}: InspectionListProps) {
  // const [date, setDate] = useState<Date | undefined>(undefined)
  // const [open, setOpen] = useState(false)

  return (
    <SectionCard className="">
      <section className="flex items-center justify-between">
        <SectionTitle>{title}</SectionTitle>

        <Button asChild variant="link" size="link" theme="text">
          <Link href={routes.admin.inspectionList}>
            View All <ChevronRight />
          </Link>
        </Button>

        {/* <Popover open={open} onOpenChange={setOpen}> */}
        {/*   <PopoverTrigger asChild> */}
        {/*     <Button variant="outline" className="gap-2"> */}
        {/*       <CalendarIcon className="size-5" /> */}
        {/*       <hr className="border-gray-black-50 h-4 border max-xl:hidden" /> */}
        {/*       <span className="max-xl:hidden">{date ? format(date, 'PPP') : 'Pick a date'}</span> */}
        {/*     </Button> */}
        {/*   </PopoverTrigger> */}
        {/*   <PopoverContent className="w-auto p-0" align="end"> */}
        {/*     <Calendar */}
        {/*       mode="single" */}
        {/*       selected={date} */}
        {/*       onSelect={(newDate) => { */}
        {/*         setDate(newDate) */}
        {/*         setOpen(false) */}
        {/*       }} */}
        {/*       autoFocus */}
        {/*     /> */}
        {/*   </PopoverContent> */}
        {/* </Popover> */}
      </section>

      {subTitle}

      {isLoading || isArrayEmpty(data) ? (
        <section className="grid size-full place-items-center">
          <p className="loading-text">
            {isLoading ? 'Loading data...' : 'No Recent Inspections found'}
          </p>
        </section>
      ) : (
        <section className="mt-4 space-y-3">
          {data?.map((inspection) => (
            <InspectionListItem
              key={inspection.id}
              slug={inspection.dashboardId}
              status={inspection.status}
              title={inspection.property}
              time={inspection.time}
              propertyName={inspection.property}
              address={inspection.address}
              actionButton={actionButton}
            />
          ))}
        </section>
      )}
    </SectionCard>
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
