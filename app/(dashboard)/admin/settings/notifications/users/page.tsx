import NotificationSettings from '@/components/pages/Settings/NotificationSettings/NotificationSettings'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'

export default function AdminUsersSettings() {
  return (
    <div className="grid grid-cols-1 gap-0">
      <NotificationSettings
        className="rounded-b-none"
        title="Property Manager Notification Settings"
      >
        <SettingListItem title="New Property Dashboard Assigned">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Property Dashboard Access Request">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Property Dashboard Update">
          <Switch />
        </SettingListItem>
      </NotificationSettings>

      <div className="bg-normal-25 px-8">
        <hr className="border-input" />
      </div>

      <NotificationSettings
        className="rounded-none"
        title="Authorized Viewer Notification Settings"
      >
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

      <div className="bg-normal-25 px-8">
        <hr className="border-input" />
      </div>

      <NotificationSettings
        className="rounded-t-none"
        title="Operational Team Notification Settings"
      >
        <SettingListItem title="New Inspection Assigned">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Due Inspection">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Incomplete Inspection Report">
          <Switch />
        </SettingListItem>
      </NotificationSettings>
    </div>
  )
}
