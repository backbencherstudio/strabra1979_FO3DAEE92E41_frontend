'use client'

import { MailIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

interface DynamicFormProps {
  values?: {
    email?: string
  }
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DEFAULT_VALUES = {
  email: '',
}

const DEFAULT_ONCHANGE = () => {}

const ForgetPasswordForm: React.FC<DynamicFormProps> = ({
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE,
}) => {
  return (
    <div>
      <div className="space-y-5">
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
                value={values.email ?? ''}
                onChange={onChange}
              />
            </InputGroup>
          </div>
        </div>

        <Button size="xl" className="w-full">
          Send
        </Button>
      </div>
    </div>
  )
}

export default ForgetPasswordForm
