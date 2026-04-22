'use client'

import { routes } from '@/constant'
import { useAuth } from '@/redux/features/auth/useAuth'
import { useForm } from '@tanstack/react-form'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import z from 'zod'
import FormInputField from '../form/form-input-field'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface DynamicFormProps {}

const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type SigninFormValues = z.infer<typeof signInSchema>

const SignInForm: React.FC<DynamicFormProps> = ({}) => {
  const { logIn, isLoading: isLoginLoading } = useAuth()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await logIn({
        email: value.email,
        password: value.password,
      })
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="mt-4.5 space-y-5">
        <FormInputField<SigninFormValues>
          form={form}
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MailIcon className="size-4" />}
        />

        <FormInputField<SigninFormValues>
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

        <Button disabled={isLoginLoading} size="xl" className="w-full">
          {isLoginLoading ? (
            <>
              <Spinner />
              Logging In
            </>
          ) : (
            <>Log In</>
          )}
        </Button>

        <p className="text-center">
          Don’t have an account?{' '}
          <Link href={routes.signup} className="font-medium text-[#0b2a3b] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignInForm
