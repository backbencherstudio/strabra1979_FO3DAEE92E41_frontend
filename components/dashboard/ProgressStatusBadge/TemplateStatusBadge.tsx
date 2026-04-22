import { MyBadgeVariant } from '@/components/ui/badge'
import { ITemplateActiveStatus } from '@/types/template'
import { createStatusSystem, StatusBadge } from './StatusBadge'

export const inspectionStatusSystem = createStatusSystem<ITemplateActiveStatus, MyBadgeVariant>({
  config: {
    DELETED: {
      label: 'Due',
      variant: 'danger',
    },
    INACTIVE: {
      label: 'In Progress',
      variant: 'warning',
    },
    ACTIVE: {
      label: 'Assigned',
      variant: 'info',
    },
  },
  defaultTheme: {
    variant: 'default',
  },
})

interface TemplateStatusBadgeProps {
  status: ITemplateActiveStatus
}

export default function TemplateStatusBadge({ status }: TemplateStatusBadgeProps) {
  return <StatusBadge status={status} system={inspectionStatusSystem} />
}
