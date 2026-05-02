'use client'

import { useVerifyEmailWithOTPMutation } from '@/api/auth/authApi'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { config, routes } from '@/constant'
import { createQueryParams, getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '../ui/button'
import { Field, FieldError } from '../ui/field'
import { Spinner } from '../ui/spinner'

interface DynamicFormProps {}

const OTP_DIGIN_LENGHT = config.otpDiginLenght

const OTPSchema = z.object({
  otp: z.string().length(OTP_DIGIN_LENGHT, `OTP must be ${OTP_DIGIN_LENGHT} digits`),
})

export type OTPFormValues = z.infer<typeof OTPSchema>

const OTPForm: React.FC<DynamicFormProps> = ({}) => {
  const router = useRouter()
  const [verifyEmailWithOTP, { isLoading }] = useVerifyEmailWithOTPMutation()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const form = useForm({
    defaultValues: {
      otp: '',
    },
    validators: {
      onSubmit: OTPSchema,
    },
    onSubmit: async ({ value }) => {
      if (!email) {
        toast.error('Session expired', {
          description: 'Please request a new verification code.',
        })
        router.push(routes.forgotPassword)
        return
      }

      try {
        const res = await verifyEmailWithOTP({
          email,
          otp: value.otp,
        }).unwrap()

        if (!res.data.reset_token) {
          throw new Error('Invalid reset Token')
        }

        const query = createQueryParams({ email, reset_token: res.data.reset_token })
        router.push(`${routes.setNewPassword}${query}`)
        toast.success(res.message || 'OTP verified successfully. You can now reset your password.')
      } catch (err) {
        toast.error('Verification failed', {
          description: getErrorMessage(err) || 'Invalid or expired OTP. Please try again.',
        })
      }
    },
  })

  if (!email) {
    return null
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="space-y-5">
        <form.Field name="otp">
          {(field) => (
            <Field>
              <InputOTP
                pattern={REGEXP_ONLY_DIGITS}
                maxLength={OTP_DIGIN_LENGHT}
                value={field.state.value}
                onChange={(value) => field.setValue(value)}
              >
                <InputOTPGroup className="w-full *:h-14 *:flex-1">
                  {Array.from({ length: OTP_DIGIN_LENGHT }).map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <FieldError errors={field.state.meta.errors || field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            isField: state.values.otp.length === OTP_DIGIN_LENGHT,
          })}
        >
          {({ isField }) => (
            <Button disabled={isLoading || !isField} size="xl" className="w-full">
              {isLoading ? <Spinner /> : null}
              {isLoading ? 'Verifing...' : 'Verify'}
            </Button>
          )}
        </form.Subscribe>

        <p className="text-center">
          Didn’t receive code?{' '}
          <Link href="#" className="font-medium text-[#0b2a3b] hover:underline">
            Resend Code
          </Link>
        </p>
      </div>
    </form>
  )
}

export default OTPForm
