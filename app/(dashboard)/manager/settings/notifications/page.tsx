import NotificationSettingList from '@/components/pages/Settings/NotificationSettings/NotificationSettingList'
import { managerNotificationSettings } from '@/components/pages/Settings/NotificationSettings/notificationSettings.config'

export default function NotificationPage() {
  return <NotificationSettingList settings={managerNotificationSettings} />
}
