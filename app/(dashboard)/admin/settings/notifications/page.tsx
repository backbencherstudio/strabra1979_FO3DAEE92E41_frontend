import NotificationSettings from '@/components/pages/Settings/NotificationSettings/NotificationSettings'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'

export default function NotificationPage() {
  return (
    <div className="grid grid-cols-1 gap-4.5">
      <NotificationSettings>
        <SettingListItem title="New User Registration">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Due Inspection">
          <Switch />
        </SettingListItem>
        <SettingListItem title="New Inspection Report Update">
          <Switch />
        </SettingListItem>
      </NotificationSettings>
    </div>
  )
}
