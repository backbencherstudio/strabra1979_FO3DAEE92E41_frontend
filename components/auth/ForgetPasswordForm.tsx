'use client'

import { useForgotPasswordMutation } from '@/api/auth/authApi'
import { routes } from '@/constant'
import { createQueryParams, getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'
import FormInputField from '../form/form-input-field'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface DynamicFormProps {}

const forgetPasswordSchema = z.object({
  email: z.email('Enter a valid email address'),
})

export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>

const ForgetPasswordForm: React.FC<DynamicFormProps> = ({}) => {
  const router = useRouter()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await forgotPassword({
          email: value.email,
        }).unwrap()

        router.push(`${routes.varifyEmail}${createQueryParams({ email: value.email })}`)
        toast.success(res.message || 'Success message')
      } catch (err) {
        toast.error('Error title', {
          description: getErrorMessage(err),
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
        <div className="flex flex-col">
          <FormInputField<ForgetPasswordFormValues>
            form={form}
            name="email"
            label="Email"
            placeholder="Email"
            icon={<MailIcon className="size-4" />}
          />
        </div>

        <form.Subscribe selector={(state) => ({ email: state.values.email })}>
          {({ email }) => (
            <Button disabled={isLoading || !email} type="submit" size="xl" className="w-full">
              {isLoading ? <Spinner /> : null}
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

export default ForgetPasswordForm
