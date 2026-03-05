'use client'

import { Field, FieldError } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ReactNode } from 'react'

interface FormInputFieldProps<T> {
  form: any
  name: keyof T
  label: string
  placeholder?: string
  type?: string
  icon?: ReactNode
  rightElement?: ReactNode
}

export default function FormInputField<T>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  icon,
  rightElement,
}: FormInputFieldProps<T>) {
  return (
    <form.Field name={name as string}>
      {(field: any) => (
        <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
          <label className="text- mb-2 text-base" htmlFor={field.name}>
            {label}
          </label>

          <InputGroup>
            {icon && <InputGroupAddon>{icon}</InputGroupAddon>}

            <InputGroupInput
              id={field.name}
              name={field.name}
              type={type}
              placeholder={placeholder}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />

            {rightElement && <InputGroupAddon align="inline-end">{rightElement}</InputGroupAddon>}
          </InputGroup>

          <FieldError errors={field.state.meta.errors} />
        </Field>
      )}
    </form.Field>
  )
}
