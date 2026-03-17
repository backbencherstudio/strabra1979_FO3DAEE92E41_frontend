'use client'

import { SelectUserDropdown } from '@/components/reusable/SelectUserDropdown/SelectUserDropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { IAuthUserRole } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

interface AssignUserDialogDialogProps extends React.ComponentProps<typeof Dialog> {
  onSelect: (userId?: string) => void
  selectedUserId?: string
  label: React.ReactNode
  userType?: IAuthUserRole
  placeholder?: string
  dialogTitle: string
}

const assignUserSchema = z.object({
  userId: z.string().min(1, 'Select an Inspector'),
})

export function AssignUserDialog({
  open,
  onOpenChange,
  onSelect,
  selectedUserId,
  dialogTitle,
  placeholder,
  label,
  userType,
}: AssignUserDialogDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const form = useForm({
    defaultValues: {
      userId: '',
    },
    validators: {
      onChange: assignUserSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value?.userId) {
        toast.error('Please select an user')
        return
      }

      handleOpenChange(false)
      form.reset()
      onSelect?.(value.userId)
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-gray-black-400 text-center text-2xl font-medium">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="sr-only text-center text-[#5f6166]">
            Select an user to assign to this property
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="userId">
              {(field) => (
                <Field
                  className="col-span-full"
                  data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                >
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                  <SelectUserDropdown
                    placeholder={placeholder}
                    onSelect={(user) => field.handleChange(user.id)}
                    selectedUserId={field.state.value}
                    userType={userType}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 *:flex-1">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                handleOpenChange(false)
                onSelect(undefined)
                form.reset()
              }}
              size="xl"
            >
              Cancel
            </Button>

            <Button type="submit" size="xl">
              Assign Inspector
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
