import ChangePasswordSettings from '@/components/pages/Settings/ChangePasswordSettings/ChangePasswordSettings'
import GeneralSettings from '@/components/pages/Settings/GeneralSettings/GeneralSettings'
import TimeZoneSettings from '@/components/pages/Settings/TimeZoneSettings/TimeZoneSettings'

export default function SettingsPage() {
  return (
    <div className="space-y-4.5">
      <GeneralSettings />
      <ChangePasswordSettings />
      <TimeZoneSettings />
    </div>
  )
}
