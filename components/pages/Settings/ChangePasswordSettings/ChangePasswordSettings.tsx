import { SectionTitle, SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import { Edit } from 'lucide-react'

export default function ChangePasswordSettings() {
  return (
    <SettingSectionCard>
      <SectionTitle className="text-lg">Change Password</SectionTitle>

      <form className="mt-4.5">
        <FieldGroup className="grid gap-3 lg:grid-cols-2">
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

          <Field className="col-span-full">
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
    </SettingSectionCard>
  )
}
