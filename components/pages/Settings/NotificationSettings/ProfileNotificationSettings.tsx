'use client'

import {
  useGetProfileQuery,
  useUpdateNotificationConfigMutation,
} from '@/api/profile/profileAccountApi'
import { getErrorMessage } from '@/lib/farmatters'
import { INotificationConfigPayload } from '@/types'
import { toast } from 'sonner'
import NotificationSettingList, { NotificationSettingsWrapper } from './NotificationSettingList'
import { ProfileNotificationSettingItem } from './profileNotificationSettings.config'

interface GeneralNotificationSettingsProps {
  settings: ProfileNotificationSettingItem[]
}

export default function ProfileNotificationSettings({
  settings,
}: GeneralNotificationSettingsProps) {
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
    <NotificationSettingsWrapper>
      <NotificationSettingList<INotificationConfigPayload>
        settings={settings}
        data={data}
        isLoading={isLoading}
        updating={updating}
        onToggle={handleToggle}
      />
    </NotificationSettingsWrapper>
  )
}
