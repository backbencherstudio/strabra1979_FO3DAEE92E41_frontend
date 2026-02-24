import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { cn } from '@/lib/utils'

interface NotificationSettingsProps extends React.ComponentProps<'div'> {
  title?: string
}

export default function NotificationSettings({
  children,
  title = 'Notification Settings',
  className,
}: NotificationSettingsProps) {
  return (
    <SectionCard className={cn('border-none p-8', className)}>
      <SectionTitle className="text-lg">{title}</SectionTitle>

      <div className="mt-4.5 space-y-2">{children}</div>
    </SectionCard>
  )
}
