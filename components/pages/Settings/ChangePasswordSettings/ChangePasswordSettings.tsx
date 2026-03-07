'use client'

import { useChangePasswordMutation } from '@/api/auth/authApi'
import FormInputField from '@/components/form/form-input-field'
import { SectionTitle, SettingSectionCard } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { Edit, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { z } from 'zod'

const changePasswordSettingsSchema = z
  .object({
    current_password: z.string().min(8, 'Password must be at least 8 characters'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ['confirm_new_password'],
    message: 'Passwords do not match',
  })

export type ChangePasswordSettingsSchemaFormValues = z.infer<typeof changePasswordSettingsSchema>

export default function ChangePasswordSettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [changePassword, { isLoading: changePasswordIsLoading }] = useChangePasswordMutation()
  const form = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validators: {
      onSubmit: changePasswordSettingsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await changePassword(value).unwrap()

        toast.success(res.message ?? 'Password changed successfully')
        form.reset()
      } catch (error) {
        toast.error('Failed to change password', {
          description: getErrorMessage(error),
        })
      }
    },
  })
  return (
    <SettingSectionCard>
      <SectionTitle className="text-lg">Change Password</SectionTitle>

      <form
        className="mt-4.5"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup className="grid gap-3 lg:grid-cols-2">
          <FormInputField<ChangePasswordSettingsSchemaFormValues>
            form={form}
            label="Current Password"
            name="current_password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your current password"
            rightElement={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            }
          />

          <FormInputField<ChangePasswordSettingsSchemaFormValues>
            form={form}
            label="New Password"
            name="new_password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<ChangePasswordSettingsSchemaFormValues>
            form={form}
            label="Confirm New Password"
            name="confirm_new_password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            rightElement={<Edit className="size-4" />}
          />
        </FieldGroup>

        <hr className="border-gray-black-50 my-6" />
        <div className="flex justify-end">
          <Button type="submit" disabled={changePasswordIsLoading} size="xl">
            {changePasswordIsLoading && <Spinner />}
            {changePasswordIsLoading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </SettingSectionCard>
  )
}
