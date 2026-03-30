import { MyBadgeVariant } from '@/components/ui/badge'
import { IRepairProgressStatus } from '@/types'
import { createStatusSystem, StatusBadge } from './StatusBadge'

export const repairPlanStatusSystem = createStatusSystem<IRepairProgressStatus, MyBadgeVariant>({
  config: {
    Urgent: {
      label: 'Urgent',
      variant: 'danger',
    },
    Maintenance: {
      label: 'Maintenance',
      variant: 'warning',
    },
    'Replacement Planning': {
      label: 'Replacement Planning',
      variant: 'info',
    },
  },
  defaultTheme: {
    variant: 'info',
  },
})

interface RepairPlanBadgeProps {
  status: IRepairProgressStatus
}

export default function RepairPlanStatusBadge({ status }: RepairPlanBadgeProps) {
  return <StatusBadge status={status} system={repairPlanStatusSystem} />
}
