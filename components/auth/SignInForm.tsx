'use client'

import { useAuth } from '@/redux/features/auth/useAuth'
import { useForm } from '@tanstack/react-form'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import z from 'zod'
import { Button } from '../ui/button'
import { Field, FieldError } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Spinner } from '../ui/spinner'

interface DynamicFormProps {}

const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const SignInForm: React.FC<DynamicFormProps> = ({}) => {
  const router = useRouter()

  const { logIn, isLoading: isLoginLoading, logOut } = useAuth()

  const form = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
      password: '12345678',
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
        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
              <label htmlFor={field.name} className="text-gray-black-400 mb-2 text-base">
                Email
              </label>
              <div className="relative">
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Email"
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>

              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
              <label htmlFor={field.name} className="text-gray-black-400 mb-2 text-base">
                Password
              </label>
              <div className="relative">
                <InputGroup>
                  <InputGroupAddon>
                    <LockIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  <InputGroupAddon align="inline-end">
                    <Button onClick={() => setShowPassword((v) => !v)} variant="ghost" size="icon">
                      {showPassword ? (
                        <EyeOffIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </Field>
          )}
        </form.Field>

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

        <Button type="button" onClick={logOut}>
          Logout
        </Button>

        <p className="text-center">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-[#0b2a3b] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignInForm
