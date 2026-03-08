import NotificationSettingList from '@/components/pages/Settings/NotificationSettings/NotificationSettingList'
import { authorizedViewerNotificationSettings } from '@/components/pages/Settings/NotificationSettings/notificationSettings.config'

export default function NotificationPage() {
  return <NotificationSettingList settings={authorizedViewerNotificationSettings} />
}
