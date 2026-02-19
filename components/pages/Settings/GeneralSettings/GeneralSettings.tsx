import { SectionTitle, SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Edit } from 'lucide-react'

export default function GeneralSettings() {
  return (
    <SettingSectionCard>
      <SectionTitle className="text-lg">General Settings</SectionTitle>

      <form className="mt-4.5">
        <FieldGroup className="grid gap-3 lg:grid-cols-2">
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

          <Field className="col-span-full">
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
    </SettingSectionCard>
  )
}
