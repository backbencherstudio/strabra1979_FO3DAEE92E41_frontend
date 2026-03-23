import ProgressStatusBadge, {
  InspectionProgressStatus,
} from '@/components/dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { Clock } from '@/components/icons/Clock'
import { LocationPin } from '@/components/icons/LocationPin'
import { Property } from '@/components/icons/SideBarIcons'
import { ReactNode } from 'react'

type InspectionListItemProps = {
  slug: string
  title: string
  time: string
  propertyName: string
  address: string
  status: InspectionProgressStatus
  actionButton: ReactNode
}

export default function InspectionListItem({
  title,
  time,
  status,
  propertyName,
  actionButton,
  address,
}: InspectionListItemProps) {
  return (
    <div className="@container/inspection-item">
      <div className="border-gray-black-50 flex flex-col justify-between gap-3 rounded-md border bg-white p-3 @2xl/inspection-item:flex-row">
        <section>
          <div className="flex gap-4">
            <h2 className="text-lg font-medium">{title}</h2>
            <ProgressStatusBadge status={status} />
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1 text-[#4988c4]">
              <Clock className="size-4" />
              <span className="text-sm leading-none font-medium">{time}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-x-4.5 gap-y-2 @lg/inspection-item:flex-row">
            <div className="text-foreground flex items-center gap-1">
              <Property className="-mt-1 size-5" />
              <span className="text-sm leading-none">{propertyName}</span>
            </div>

            <div className="text-foreground flex items-center gap-1">
              <LocationPin className="size-5" />
              <span className="text-sm leading-none">{address}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center">{actionButton}</section>
      </div>
    </div>
  )
}
