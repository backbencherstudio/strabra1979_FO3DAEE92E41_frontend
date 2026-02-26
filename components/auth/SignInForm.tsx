'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Button } from '../ui/button'

interface DynamicFormProps {
  values?: {
    username?: string
    email?: string
    password?: string
  }
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DEFAULT_VALUES = {
  username: '',
  email: '',
  password: '',
}

const DEFAULT_ONCHANGE = () => {}

const SignInForm: React.FC<DynamicFormProps> = ({
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="mt-4.5 space-y-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-base text-[#4a4c56]">
            Email
          </label>
          <div className="relative">
            <InputGroup>
              <InputGroupAddon>
                <MailIcon className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                // value={values.email ?? ''}
                // onChange={onChange}
              />
            </InputGroup>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-base text-[#4a4c56]">
            Password
          </label>
          <div className="relative">
            <InputGroup>
              <InputGroupAddon>
                <LockIcon className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password"
                // value={values.password ?? ''}
                // onChange={onChange}
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
        </div>

        <button className="my-3.5 w-full rounded-xl bg-[#0b2a3b] py-3.5 font-medium text-white">
          Log In
        </button>
        <p className="text-center">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-[#0b2a3b] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
