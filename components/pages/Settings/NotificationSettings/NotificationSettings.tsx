import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Switch } from '@/components/ui/switch'

export default function NotificationSettings() {
  return (
    <SectionCard className="border-none p-8">
      <SectionTitle className="text-lg">Notification Settings</SectionTitle>

      <div className="mt-4.5 space-y-2">
        <SettingListItem title="New Inspection Assigned">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Due Inspection">
          <Switch />
        </SettingListItem>
        <SettingListItem title="Incomplete Inspection Report">
          <Switch />
        </SettingListItem>
      </div>
    </SectionCard>
  )
}
