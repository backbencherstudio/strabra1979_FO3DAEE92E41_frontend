import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import { IRepairProgressStatus } from '@/types'

export interface PiorityRepairPlanItemProps extends React.ComponentProps<typeof InfoCard> {
  title: string
  description: string
  status: IRepairProgressStatus
}

export function PiorityRepairPlanItem({
  title,
  description,
  status,
  children,
  ...props
}: PiorityRepairPlanItemProps) {
  return (
    <InfoCard title={title} description={description} {...props} headerWrapperClass="items-start">
      <div className="flex items-center gap-2">
        <RepairPlanStatusBadge status={status} />
        {children}
      </div>
    </InfoCard>
  )
}
