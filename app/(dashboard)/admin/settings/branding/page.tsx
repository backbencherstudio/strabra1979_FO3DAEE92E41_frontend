'use client'

import {
  useGetAdminBrandingSettingsQuery,
  useUpdateBrandingMutation,
} from '@/api/profile/profileAccountApi'
import FormInputField from '@/components/form/form-input-field'
import { Edit } from '@/components/icons/Edit'
import { NotificationSettingsWrapper } from '@/components/pages/Settings/NotificationSettings/NotificationSettingList'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import z from 'zod'

const brandingSettingsSceme = z.object({
  platform_name: z.string().min(3, 'Platform name is required'),
  platform_logo_url: z.url('Invalid URL'),
  signup_onboarding_image_url: z.url('Invalid URL'),
  login_onboarding_image_url: z.url('Invalid URL'),
  primary_color: z.string().min(7, 'Invalid color format'),
  primary_color_label: z.string().min(3, 'Color label is required'),
})

export type BrandingSettingsFormValues = z.infer<typeof brandingSettingsSceme>

export default function BrandingPageSettings() {
  const { data, isLoading } = useGetAdminBrandingSettingsQuery()
  const [updateBranding, { isLoading: updating }] = useUpdateBrandingMutation()

  const form = useForm({
    defaultValues: {
      platform_name: data?.platform_name ?? '',
      platform_logo_url: data?.platform_logo_url ?? '',
      signup_onboarding_image_url: data?.signup_onboarding_image_url ?? '',
      login_onboarding_image_url: data?.login_onboarding_image_url ?? '',
      primary_color: data?.primary_color ?? '#00000',
      primary_color_label: data?.primary_color_label ?? '',
    },
    validators: {
      onSubmit: brandingSettingsSceme,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await updateBranding(value).unwrap() // Call the mutation
        toast.success(res.message ?? 'Branding updated successfully')
      } catch (error) {
        toast.error('Failed to update branding', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <NotificationSettingsWrapper className="@container" title="Platform Branding Settings">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup className="grid grid-cols-1 gap-3 @3xl:grid-cols-2 @3xl:gap-4">
          <FormInputField<BrandingSettingsFormValues>
            form={form}
            name="platform_name"
            label="Platform Name"
            placeholder="Enter platform name"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<BrandingSettingsFormValues>
            form={form}
            name="platform_logo_url"
            label="Platform Logo"
            placeholder="Select platform logo"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<BrandingSettingsFormValues>
            form={form}
            name="signup_onboarding_image_url"
            label="Signup Onboarding Image"
            placeholder="Select signup onboarding image"
            rightElement={<Edit className="size-4" />}
          />

          <FormInputField<BrandingSettingsFormValues>
            form={form}
            name="login_onboarding_image_url"
            label="Login Onboarding Image"
            placeholder="Select login onboarding image"
            rightElement={<Edit className="size-4" />}
          />

          <form.Field name="primary_color">
            {(fieldColor) => (
              <form.Field name="primary_color_label">
                {(fieldLabel) => (
                  <Field className="col-span-full">
                    <FieldLabel htmlFor="primary_color">Primary Color</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon className="">
                        {/* color input */}
                        <InputGroupInput
                          value={fieldColor.state.value}
                          onChange={(e) => fieldColor.handleChange(e.target.value)} // Sync color with form state
                          className="peer absolute size-8 p-0 opacity-0"
                          type="color"
                          placeholder="Select primary color"
                          id={fieldColor.name}
                          name={fieldColor.name}
                          onBlur={fieldColor.handleBlur}
                        />
                        <div
                          style={{
                            backgroundColor: fieldColor.state.value,
                          }}
                          className="pointer-events-none size-8 rounded-full ring-blue-500/50 peer-focus-visible:ring-3"
                        />
                      </InputGroupAddon>

                      {/* color label input */}
                      <InputGroupInput
                        id={fieldLabel.name}
                        name={fieldLabel.name}
                        value={fieldLabel.state.value}
                        onBlur={fieldLabel.handleBlur}
                        onChange={(e) => fieldLabel.handleChange(e.target.value)}
                        className=""
                        placeholder="Enter primary color label"
                      />
                      <InputGroupAddon align="inline-end">
                        <Edit />
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldError
                      errors={fieldLabel.state.meta.errors || fieldColor.state.meta.errors}
                    />
                  </Field>
                )}
              </form.Field>
            )}
          </form.Field>
        </FieldGroup>

        <hr className="border-gray-black-50 my-6" />
        <div className="flex justify-end">
          <Button type="submit" disabled={updating || isLoading} size="xl">
            {updating && <Spinner />}
            {updating ? 'Updating Branding...' : 'Update Branding'}
          </Button>
        </div>
      </form>
    </NotificationSettingsWrapper>
  )
}
