'use client'

import { useResetPasswordMutation } from '@/api/auth/authApi'
import { routes } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import FormInputField from '../form/form-input-field'
import { Button } from '../ui/button'

interface DynamicFormProps {}

const newPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>

const SetNewPasswordForm: React.FC<DynamicFormProps> = () => {
  const router = useRouter()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [showPassword, setShowPassword] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const reset_token = searchParams.get('reset_token')

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: newPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      if (!email || !reset_token) {
        toast.error('Session expired', { description: 'Please request a new verification code.' })
        router.push(routes.forgotPassword)
        return
      }

      try {
        const res = await resetPassword({
          email: email,
          new_password: value.password,
          reset_token: reset_token,
        }).unwrap()

        router.push(routes.signin)
        toast.success('Password updated successfully. Please sign in.')
      } catch (err) {
        toast.error('Password reset failed', {
          description:
            getErrorMessage(err) || 'Your reset link may have expired. Please request a new one.',
        })
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="space-y-5">
        <FormInputField<NewPasswordFormValues>
          form={form}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          icon={<LockIcon className="size-4" />}
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

        <FormInputField<NewPasswordFormValues>
          form={form}
          name="confirmPassword"
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          icon={<LockIcon className="size-4" />}
        />

        <form.Subscribe
          selector={(state) => ({
            hasPassword: !!state.values.password,
            hasConfirmPassword: !!state.values.confirmPassword,
          })}
        >
          {({ hasConfirmPassword, hasPassword }) => (
            <Button
              disabled={isLoading || !hasPassword || !hasConfirmPassword}
              type="submit"
              size="xl"
              className="w-full"
            >
              Update Password
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

export default SetNewPasswordForm
