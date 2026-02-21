import NotificationSettings from '@/components/pages/Settings/NotificationSettings/NotificationSettings'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'

export default function NotificationPage() {
  return (
    <div className="space-y-4.5">
      <NotificationSettings>
        <SettingListItem title="New Inspection Assigned">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Due Inspection">
          <Switch />
        </SettingListItem>
      </NotificationSettings>
    </div>
  )
}
