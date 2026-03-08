'use client'

import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export type NotificationSettingItem<T> = {
  title: string
  key: keyof T
}

interface Props<T extends Record<string, boolean>> {
  settings: NotificationSettingItem<T>[]
  data?: T
  isLoading?: boolean
  updating?: boolean
  onToggle: (key: keyof T, checked: boolean) => void
}

export default function NotificationSettingList<T extends Record<string, boolean>>({
  settings,
  data,
  isLoading,
  updating,
  onToggle,
}: Props<T>) {
  return (
    <>
      {settings.map((setting) => (
        <SettingListItem key={String(setting.key)} title={setting.title}>
          <Switch
            checked={Boolean(data?.[setting.key])}
            disabled={isLoading || updating}
            onCheckedChange={(checked) => onToggle(setting.key, checked)}
          />
        </SettingListItem>
      ))}
    </>
  )
}

interface NotificationSettingsProps extends React.ComponentProps<'div'> {
  title?: string
}

export function NotificationSettingsWrapper({
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
