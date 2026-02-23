'use client'
// components/DynamicForm.tsx
import Link from 'next/link'
import React from 'react'
import { LockIcon } from '../icons/LockIcon'
import { MessageIcon } from '../icons/MessageIcon'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

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

const DynamicForm: React.FC<DynamicFormProps> = ({
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE,
}) => {
  return (
    <div>
      <div className="mt-4.5 space-y-5">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 text-base text-[#4a4c56]">
            Username
          </label>
          <InputGroup>
            <InputGroupInput
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={values.username ?? ''}
              onChange={onChange}
            />
          </InputGroup>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-base text-[#4a4c56]">
            Email
          </label>
          <div className="relative">
            <InputGroup>
              <InputGroupAddon>
                <MessageIcon />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email ?? ''}
                onChange={onChange}
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
                <LockIcon />
              </InputGroupAddon>
              <InputGroupInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password ?? ''}
                onChange={onChange}
              />
            </InputGroup>
          </div>
        </div>

        <button className="my-3.5 w-full rounded-xl bg-[#0b2a3b] py-3.5 font-medium text-white">
          Sign up
        </button>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="#" className="font-medium text-[#0b2a3b] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default DynamicForm
