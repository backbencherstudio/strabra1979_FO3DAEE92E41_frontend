'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ReactNode } from 'react'

interface FormInputFieldProps<T> extends React.ComponentProps<'input'> {
  form: any
  name: Extract<keyof T, string>
  label: string
  placeholder?: string
  type?: string
  icon?: ReactNode
  rightElement?: ReactNode
  containerClass?: string
}

export default function FormInputField<T>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  icon,
  rightElement,
  containerClass,
  required,
  ...props
}: FormInputFieldProps<T>) {
  return (
    <form.Field name={name as string}>
      {(field: any) => (
        <Field
          className={containerClass}
          data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
        >
          <FieldLabel htmlFor={field.name}>
            {label}
            {required ? <span className="text-error-red-500">*</span> : null}
          </FieldLabel>

          <InputGroup>
            {icon && <InputGroupAddon>{icon}</InputGroupAddon>}

            <InputGroupInput
              {...props}
              required={required}
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
