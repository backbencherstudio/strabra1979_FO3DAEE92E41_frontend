import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'
import { IRepairProgressStatus } from '@/types'

export interface PiorityRepairPlanItemProps {
  title: string
  description: string
  status: IRepairProgressStatus
}

export function PiorityRepairPlanItem({ title, description, status }: PiorityRepairPlanItemProps) {
  return (
    <InfoCard title={title} description={description}>
      <RepairPlanStatusBadge status={status} />
    </InfoCard>
  )
}
