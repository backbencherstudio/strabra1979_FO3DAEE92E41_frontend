'use client'

import { useRegisterUserMutation } from '@/api/auth/authApi'
import { routes } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { IAuthRegisterResponse, IAuthUserRole, USER_ROLES, WithApiStatus } from '@/types'
import { useForm } from '@tanstack/react-form'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import FormInputField from '../form/form-input-field'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export const signupSchema = z
  .object({
    username: z.string().min(2, 'Full name is required'),
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    // .regex(/[A-Z]/, 'Must contain an uppercase letter')
    // .regex(/[a-z]/, 'Must contain a lowercase letter')
    // .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
    role: z.enum(USER_ROLES, 'Please select a user role'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type SignupFormValues = z.infer<typeof signupSchema>

interface SignUpFormProps {
  role: IAuthUserRole
}

interface RegerterUserFormOptions {
  role?: IAuthUserRole
  onSubmit?: (data: WithApiStatus<IAuthRegisterResponse>) => void
}

export function useRegerterUserForm({ role, onSubmit }: RegerterUserFormOptions) {
  const [registerUser, { isLoading: registerUserIsLoading }] = useRegisterUserMutation()

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: role ?? '',
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await registerUser({
          role: role ?? (value.role as IAuthUserRole),
          username: value.username,
          email: value.email,
          password: value.password,
        }).unwrap()

        if (typeof onSubmit === 'function') {
          onSubmit(data)
        }

        toast.message(data.message ?? 'Sugnn up succefuull')
        form.reset()
      } catch (error) {
        toast.error('Signup Failed — please try again.', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return { form, registerUserIsLoading }
}

const SignUpForm: React.FC<SignUpFormProps> = ({ role }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { form, registerUserIsLoading } = useRegerterUserForm({ role })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="mt-4.5 space-y-5">
        {/* Usernae */}
        <FormInputField<SignupFormValues>
          form={form}
          name="username"
          label="Username"
          placeholder="Username"
          icon={<UserIcon className="size-4" />}
        />

        <FormInputField<SignupFormValues>
          form={form}
          name="email"
          label="Email"
          placeholder="Email"
          icon={<MailIcon className="size-4" />}
        />

        <FormInputField<SignupFormValues>
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

        <FormInputField<SignupFormValues>
          form={form}
          name="confirmPassword"
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          icon={<LockIcon className="size-4" />}
        />

        {/* Submit */}
        <Button size="xl" className="w-full">
          {registerUserIsLoading && <Spinner />}
          {registerUserIsLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        <p className="text-center">
          Already have an account?{' '}
          <Link href={routes.signin} className="font-medium text-[#0b2a3b] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignUpForm
