'use client'

import {
  useGetProfileQuery,
  useUpdateGeneralSettingMutation,
} from '@/api/profile/profileAccountApi'
import FormInputField from '@/components/form/form-input-field'
import { SectionTitle, SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { Edit } from 'lucide-react'
import { toast } from 'sonner'

import { z } from 'zod'

const generalSettingsSchema = z.object({
  first_name: z
    .string()
    .min(3, 'First name must be at least 3 characters long')
    .max(50, 'First name must be less than 50 characters'),

  last_name: z
    .string()
    .min(3, 'Last name must be at least 3 characters long')
    .max(50, 'Last name must be less than 50 characters'),

  email: z.email('Please enter a valid email address'),
})

export type GeneralSettingsSchemeFormValues = z.infer<typeof generalSettingsSchema>

export default function GeneralSettings() {
  const [updateGeneralSetting, { isLoading: savingChanges }] = useUpdateGeneralSettingMutation()
  const { data, isLoading: profileIsLoading } = useGetProfileQuery()
  const dataFetching = profileIsLoading

  const form = useForm({
    defaultValues: {
      email: dataFetching ? 'Fetching data...' : (data?.email ?? ''),
      first_name: dataFetching ? 'Fetching data...' : (data?.first_name ?? ''),
      last_name: dataFetching ? 'Fetching data...' : (data?.last_name ?? ''),
    },
    validators: {
      onSubmit: generalSettingsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await updateGeneralSetting(value).unwrap()
        toast.message(res.message)
      } catch (error) {
        toast.error('Failed to update settings', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <SettingSectionCard>
      <SectionTitle className="text-lg">General Settings</SectionTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="mt-4.5"
      >
        <FieldGroup className="grid gap-3 lg:grid-cols-2">
          <FormInputField<GeneralSettingsSchemeFormValues>
            form={form}
            name="first_name"
            label="First Name"
            placeholder="Enter your first name"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<GeneralSettingsSchemeFormValues>
            form={form}
            name="last_name"
            label="Last Name"
            placeholder="Enter your last name"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<GeneralSettingsSchemeFormValues>
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email"
            rightElement={<Edit className="size-4" />}
          />
        </FieldGroup>

        <hr className="border-gray-black-50 my-6" />
        <div className="flex justify-end">
          <Button type="submit" disabled={savingChanges || dataFetching} size="xl">
            {savingChanges && <Spinner />}
            {savingChanges ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </SettingSectionCard>
  )
}
