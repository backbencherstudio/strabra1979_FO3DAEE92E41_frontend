'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

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

const OTPForm: React.FC<DynamicFormProps> = ({
  values = DEFAULT_VALUES,
  onChange = DEFAULT_ONCHANGE,
}) => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <div className="space-y-5">
        <InputOTP
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          maxLength={4}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="w-full *:h-14 *:flex-1">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <Button size="xl" className="w-full">
          Verify
        </Button>
        <p className="text-center">
          Didn’t receive code?{' '}
          <Link href="#" className="font-medium text-[#0b2a3b] hover:underline">
            Resend Code
          </Link>
        </p>
      </div>
    </div>
  )
}

export default OTPForm
