'use client'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Option<V extends string> = {
  label: string
  value: V
}

interface FormSelectFieldProps<T, V extends string> {
  form: any
  name: keyof T
  label?: string
  required?: boolean
  placeholder?: string
  options: Option<V>[]
  containerClass?: string
}

export default function FormSelectField<T, V extends string>({
  form,
  name,
  label,
  placeholder,
  required,
  options,
  containerClass,
}: FormSelectFieldProps<T, V>) {
  return (
    <form.Field name={name as string}>
      {(field: any) => (
        <Field className={containerClass}>
          {label ? (
            <FieldLabel htmlFor={field.name}>
              {label}
              {required ? <span className="text-error-red-500">*</span> : null}
            </FieldLabel>
          ) : null}

          <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
            <SelectTrigger className="h-auto w-full rounded-[12px] border border-[#e9e9ea] px-5 py-3.5">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FieldError errors={field.state.meta.errors} />
        </Field>
      )}
    </form.Field>
  )
}
