'use client'

import {
  useGetProfileQuery,
  useUpdateNotificationConfigMutation,
} from '@/api/profile/profileAccountApi'
import NotificationSettings from '@/components/pages/Settings/NotificationSettings/NotificationSettings'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'
import { getErrorMessage } from '@/lib/farmatters'
import { NotificationSettingItem } from '@/components/pages/Settings/NotificationSettings/notificationSettings.config'
import { INotificationConfigPayload } from '@/types'
import { toast } from 'sonner'

interface Props {
  settings: NotificationSettingItem[]
}

export default function NotificationSettingList({ settings }: Props) {
  const { data, isLoading } = useGetProfileQuery()

  const [updateNotificationConfig, { isLoading: updating }] = useUpdateNotificationConfigMutation()

  const handleToggle = async (key: keyof INotificationConfigPayload, checked: boolean) => {
    try {
      const res = await updateNotificationConfig({ [key]: checked }).unwrap()

      toast.success(res?.message ?? 'Notification setting updated')
    } catch (error) {
      toast.error('Failed to update notification setting', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4.5">
      <NotificationSettings>
        {settings.map((setting) => (
          <SettingListItem key={setting.key} title={setting.title}>
            <Switch
              checked={data?.[setting.key]}
              disabled={isLoading || updating}
              onCheckedChange={(checked) => handleToggle(setting.key, checked)}
            />
          </SettingListItem>
        ))}
      </NotificationSettings>
    </div>
  )
}
