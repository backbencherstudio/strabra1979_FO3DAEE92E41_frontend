'use client'

import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
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

const SetNewPasswordForm: React.FC<DynamicFormProps> = ({
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="password" className="text-foreground mb-2 text-base">
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

        <div className="flex flex-col">
          <label htmlFor="password" className="text-foreground mb-2 text-base">
            Confirm Password
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
                placeholder="Confirm Password"
                // value={values.password ?? ''}
                // onChange={onChange}
              />
            </InputGroup>
          </div>
        </div>

        <Button size="xl" className="w-full">
          Update Password
        </Button>
      </div>
    </div>
  )
}

export default SetNewPasswordForm
