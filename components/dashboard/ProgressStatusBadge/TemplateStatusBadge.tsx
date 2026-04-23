import { MyBadgeVariant } from '@/components/ui/badge'
import { ITemplateActiveStatus } from '@/types/template'
import { createStatusSystem, StatusBadge } from './StatusBadge'

export const inspectionStatusSystem = createStatusSystem<ITemplateActiveStatus, MyBadgeVariant>({
  config: {
    DELETED: {
      label: 'Deleted',
      variant: 'danger',
    },
    INACTIVE: {
      label: 'Inactive',
      variant: 'warning',
    },
    ACTIVE: {
      label: 'Active',
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
  return (
    <StatusBadge
      className="rounded-full py-0.5"
      status={status}
      system={inspectionStatusSystem}
    />
  )
}
