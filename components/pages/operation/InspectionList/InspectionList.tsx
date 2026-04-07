'use client'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { isArrayEmpty } from '@/lib/utils'
import { IScheduledInspectionTableItem, RoleUtils } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import InspectionListItem from './InspectionListItem'
import { useAuth } from '@/redux/features/auth/useAuth'

interface InspectionListProps {
  title: string
  subTitle?: ReactNode
  actionButton?: (inspection: IScheduledInspectionTableItem) => React.ReactElement
  isLoading: boolean
  data?: IScheduledInspectionTableItem[]
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
  const { role } = useAuth()

  return (
    <SectionCard className="">
      <section className="flex items-center justify-between">
        <SectionTitle>{title}</SectionTitle>

        <Button asChild variant="link" size="link" theme="text">
          <Link
            href={
              RoleUtils.isAdmin(role)
                ? routes.admin.inspectionList
                : routes.operational.inspectionList
            }
          >
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
            >
              {actionButton?.(inspection)}
            </InspectionListItem>
          ))}
        </section>
      )}
    </SectionCard>
  )
}
