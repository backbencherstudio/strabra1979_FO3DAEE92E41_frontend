import { MyBadgeVariant } from '@/components/ui/badge'
import { createStatusSystem, StatusBadge } from './StatusBadge'

export type RepairProgressStatus = 'URGENT' | 'MAINTENANCE' | 'REPLACEMENT_PLANNING'

export const repairPlanStatusSystem = createStatusSystem<RepairProgressStatus, MyBadgeVariant>({
  config: {
    URGENT: {
      label: 'Urgent',
      variant: 'danger',
    },
    MAINTENANCE: {
      label: 'Maintenance',
      variant: 'warning',
    },
    REPLACEMENT_PLANNING: {
      label: 'Replacement Planning',
      variant: 'info',
    },
  },
  defaultTheme: {
    variant: 'info',
  },
})

interface RepairPlanBadgeProps {
  status: RepairProgressStatus
}

export default function RepairPlanStatusBadge({ status }: RepairPlanBadgeProps) {
  return <StatusBadge status={status} system={repairPlanStatusSystem} />
}
