import RepairPlanStatusBadge, {
  RepairProgressStatus,
} from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import InfoCard from '@/components/reusable/InfoCard/InfoCard'

interface PiorityRepairPlanItemProps {
  title: string
  description: string
  status: RepairProgressStatus
}

export function PiorityRepairPlanItem({ title, description, status }: PiorityRepairPlanItemProps) {
  return (
    <InfoCard title={title} description={description}>
      <RepairPlanStatusBadge status={status} />
    </InfoCard>
  )
}
