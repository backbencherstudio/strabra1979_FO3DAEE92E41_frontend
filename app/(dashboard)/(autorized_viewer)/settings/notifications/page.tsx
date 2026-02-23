import NotificationSettings from '@/components/pages/Settings/NotificationSettings/NotificationSettings'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'

export default function NotificationPage() {
  return (
    <div className="space-y-4.5">
      <NotificationSettings>
        <SettingListItem title="New Property Dashboard Invitation">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Access Request update">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Property Dashboard Update">
          <Switch />
        </SettingListItem>
      </NotificationSettings>
    </div>
  )
}
