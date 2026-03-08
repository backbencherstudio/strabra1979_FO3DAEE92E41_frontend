'use client'

import FormInputField from '@/components/form/form-input-field'
import { Edit } from '@/components/icons/Edit'
import { NotificationSettingsWrapper } from '@/components/pages/Settings/NotificationSettings/NotificationSettingList'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import z from 'zod'

export const brandingSettingsSceme = z.object({})

export type BrandingSettingsFormValues = z.infer<typeof brandingSettingsSceme>

export default function BrandingPageSettings() {
  const [color, setColor] = useState('#ff0000')

  const form = useForm({
    defaultValues: {},
    validators: {
      onSubmit: brandingSettingsSceme,
    },
    onSubmit: async ({ value }) => {},
  })

  return (
    <NotificationSettingsWrapper className="@container" title="Platform Branding Settings">
      <form>
        <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          <Field>
            <FieldLabel htmlFor="name">Platform Name</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Enter platform name" />
              <InputGroupAddon align="inline-end">
                <Edit />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Platform Logo</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Select platform logo" />
              <InputGroupAddon align="inline-end">
                <Edit />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Signup Onboarding Image</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Select signup onboarding image" />
              <InputGroupAddon align="inline-end">
                <Edit />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Login Onboarding Image</FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Select login onboarding image" />
              <InputGroupAddon align="inline-end">
                <Edit />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field className="col-span-full">
            <FieldLabel htmlFor="name">Primary Color</FieldLabel>
            <InputGroup className="">
              <InputGroupAddon>
                <div style={{ backgroundColor: color }} className="size-8 rounded-full" />
              </InputGroupAddon>
              <InputGroupInput
                value={color}
                onChange={(v) => setColor(v.target.value)}
                className="opacity-0"
                type="color"
                placeholder="Select primary color"
              />
              <InputGroupAddon align="inline-end">
                <Edit />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </form>
    </NotificationSettingsWrapper>
  )
}
