import { operatorNotificationSettings } from '@/components/pages/Settings/NotificationSettings/profileNotificationSettings.config'
import ProfileNotificationSettings from '@/components/pages/Settings/NotificationSettings/ProfileNotificationSettings'

export default function NotificationPage() {
  return <ProfileNotificationSettings settings={operatorNotificationSettings} />
}
