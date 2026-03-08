'use client'

import {
  useGetUserLevelNotificationSettingsQuery,
  useUpdateUserLevelNotificationSettingsMutation,
} from '@/api/profile/profileAccountApi'
import { getErrorMessage } from '@/lib/farmatters'
import { IUserLevelNotificationSettings } from '@/types'
import { toast } from 'sonner'
import NotificationSettingList, { NotificationSettingsWrapper } from './NotificationSettingList'
import {
  adminUserLevelAuthorizedViewerNotificationSettings,
  adminUserLevelManagerNotificationSettings,
  AdminUserLevelNotificationSettingItem,
  adminUserLevelOperatorNotificationSettings,
} from './adminUserLevlNotificationSettings.config'

interface AdminUserLevlNotificationSettingsProps {}

type Section = {
  title: string
  className?: string
  settings: AdminUserLevelNotificationSettingItem[]
}

const sections: Section[] = [
  {
    title: 'Property Manager Notification Settings',
    className: 'rounded-b-none',
    settings: adminUserLevelManagerNotificationSettings,
  },
  {
    title: 'Authorized Viewer Notification Settings',
    className: 'rounded-none',
    settings: adminUserLevelAuthorizedViewerNotificationSettings,
  },
  {
    title: 'Operational Team Notification Settings',
    className: 'rounded-t-none',
    settings: adminUserLevelOperatorNotificationSettings,
  },
]

export default function AdminUserLevlNotificationSettings({}: AdminUserLevlNotificationSettingsProps) {
  const { data, isLoading } = useGetUserLevelNotificationSettingsQuery()

  const [updateNotificationConfig, { isLoading: updating }] =
    useUpdateUserLevelNotificationSettingsMutation()

  const handleToggle = async (key: keyof IUserLevelNotificationSettings, checked: boolean) => {
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
    <div className="grid grid-cols-1 gap-0">
      {sections.map((section, index) => (
        <div key={section.title}>
          <NotificationSettingsWrapper className={section.className} title={section.title}>
            <NotificationSettingList<IUserLevelNotificationSettings>
              settings={section.settings}
              data={data}
              isLoading={isLoading}
              updating={updating}
              onToggle={handleToggle}
            />
          </NotificationSettingsWrapper>

          {index !== sections.length - 1 && (
            <div className="bg-normal-25 px-8">
              <hr className="border-input" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
