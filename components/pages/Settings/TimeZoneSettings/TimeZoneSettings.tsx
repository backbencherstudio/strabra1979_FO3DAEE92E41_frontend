import { SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function TimeZoneSettings() {
  return (
    <SettingSectionCard>
      <SettingListItem
        title="Set the time zone automatically"
        className="border-none bg-transparent"
        titleClassName="text-forground tex-base"
      >
        <Switch />
      </SettingListItem>

      <hr className="border-gray-black-50 my-1" />

      <SettingListItem
        title="Time zone"
        className="border-none bg-transparent"
        titleClassName="text-forground tex-base text-nowrap"
        // flex-col items-start
      >
        <Select defaultValue="UTC-06:00">
          <SelectTrigger className="min-w-0" id="time-zone">
            <SelectValue placeholder="Select your time zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="UTC-12:00">(UTC-12:00) International Date Line West</SelectItem>
              <SelectItem value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</SelectItem>
              <SelectItem value="UTC-07:00">(UTC-07:00) Mountain Time (US & Canada)</SelectItem>
              <SelectItem value="UTC-06:00">(UTC-06:00) Central Time / Central America</SelectItem>
              <SelectItem value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</SelectItem>
              <SelectItem value="UTC-04:00">(UTC-04:00) Atlantic Time / Venezuela</SelectItem>
              <SelectItem value="UTC-03:00">(UTC-03:00) Brazil / Argentina / Greenland</SelectItem>
              <SelectItem value="UTC+00:00">(UTC+00:00) London / Dublin / Lisbon</SelectItem>
              <SelectItem value="UTC+01:00">(UTC+01:00) Paris / Berlin / Rome / Madrid</SelectItem>
              <SelectItem value="UTC+02:00">(UTC+02:00) Cairo / Johannesburg / Athens</SelectItem>
              <SelectItem value="UTC+03:00">(UTC+03:00) Moscow / Nairobi / Riyadh</SelectItem>
              <SelectItem value="UTC+05:30">(UTC+05:30) India (Mumbai / Delhi)</SelectItem>
              <SelectItem value="UTC+06:00">(UTC+06:00) Bangladesh / Kazakhstan</SelectItem>
              <SelectItem value="UTC+07:00">(UTC+07:00) Bangkok / Jakarta / Hanoi</SelectItem>
              <SelectItem value="UTC+08:00">(UTC+08:00) Beijing / Singapore / Manila</SelectItem>
              <SelectItem value="UTC+09:00">(UTC+09:00) Tokyo / Seoul</SelectItem>
              <SelectItem value="UTC+10:00">(UTC+10:00) Sydney / Melbourne</SelectItem>
              <SelectItem value="UTC+12:00">(UTC+12:00) Auckland / Fiji</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SettingListItem>
    </SettingSectionCard>
  )
}
