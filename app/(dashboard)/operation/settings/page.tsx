import { Edit } from '@/components/icons/Edit'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import SettingListItem from '@/components/reusable/SettingListItem/SettingListItem'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className="space-y-4.5">
      <SectionCard className="border-none p-8">
        <SectionTitle className="text-lg">General Settings</SectionTitle>

        <form className="mt-4.5">
          <FieldGroup className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="Enter your first name" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="Enter your last name" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field className="col-span-2">
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="Enter your email" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>

          <hr className="border-gray-black-50 my-6" />
          <div className="flex justify-end">
            <Button size="xl">Save Change</Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard className="border-none p-8">
        <SectionTitle className="text-lg">Change Password</SectionTitle>

        <form className="mt-4.5">
          <FieldGroup className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <InputGroup>
                <InputGroupInput type="password" placeholder="Enter your current password" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>New Password</FieldLabel>
              <InputGroup>
                <InputGroupInput type="password" placeholder="Enter your new password" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field className="col-span-2">
              <FieldLabel>Confirm New Password</FieldLabel>
              <InputGroup>
                <InputGroupInput type="password" placeholder="Confirm your new password" />
                <InputGroupAddon align="inline-end">
                  <Edit />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>

          <hr className="border-gray-black-50 my-6" />
          <div className="flex justify-end">
            <Button size="xl">Change Password</Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard className="border-none p-8">
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
          titleClassName="text-forground tex-base"
        >
          <Select defaultValue="UTC-06:00">
            <SelectTrigger id="time-zone">
              <SelectValue placeholder="Select your time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="UTC-12:00">(UTC-12:00) International Date Line West</SelectItem>
                <SelectItem value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</SelectItem>
                <SelectItem value="UTC-07:00">(UTC-07:00) Mountain Time (US & Canada)</SelectItem>
                <SelectItem value="UTC-06:00">
                  (UTC-06:00) Central Time / Central America
                </SelectItem>
                <SelectItem value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</SelectItem>
                <SelectItem value="UTC-04:00">(UTC-04:00) Atlantic Time / Venezuela</SelectItem>
                <SelectItem value="UTC-03:00">
                  (UTC-03:00) Brazil / Argentina / Greenland
                </SelectItem>
                <SelectItem value="UTC+00:00">(UTC+00:00) London / Dublin / Lisbon</SelectItem>
                <SelectItem value="UTC+01:00">
                  (UTC+01:00) Paris / Berlin / Rome / Madrid
                </SelectItem>
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
      </SectionCard>

      <SectionCard className="border-none p-8">
        <SectionTitle className="text-lg">Delete Account</SectionTitle>
        <p className="mt-3 text-base">
          This account owns 2 Property Dashboards. Deleting your account will remove all the content
          associated with it.
        </p>

        <hr className="border-gray-black-50 my-6" />
        <div className="flex justify-end">
          <Button variant="destructive" size="xl">
            Delete Account
          </Button>
        </div>
      </SectionCard>
    </div>
  )
}
