import { useUpdateUserRoleMutation } from '@/api/userManagement/userManagementApi'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getErrorMessage } from '@/lib/farmatters'
import { cn } from '@/lib/utils'
import { IAuthUserRole, USER_ROLES } from '@/types'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'
import FormSelectField from '../form/form-select-field'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface EditInputFeildsProps extends React.ComponentProps<typeof Dialog> {
  initialData: {
    userId: string
    role: IAuthUserRole
  }
}

const userInfoScheme = z.object({
  role: z.enum(USER_ROLES, 'Please select a user role'),
})

export type UserInfoFormValues = z.infer<typeof userInfoScheme>

export function EditUserInfoDialog({ initialData, onOpenChange, ...props }: EditInputFeildsProps) {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation()

  const form = useForm({
    defaultValues: {
      role: initialData.role,
    },
    validators: {
      onSubmit: userInfoScheme,
    },
    onSubmit: async ({ value }) => {
      if (!initialData.userId) {
        toast.error('Missing user', {
          description: 'Unable to update role because the user ID is not available.',
        })
        return
      }

      try {
        await updateUserRole({
          id: initialData.userId,
          role: value.role,
        }).unwrap()

        toast.success('Role updated successfully', {
          description: `The user's role has been changed to "${value.role}".`,
        })
        onOpenChange?.(false)
      } catch (err) {
        toast.error('Failed to update role', {
          description: getErrorMessage(err) || 'Something went wrong. Please try again.',
        })
      }
    },
  })

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent className={cn('px-0 sm:max-w-156')} showCloseButton={false}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <DialogHeader className="px-6">
            <div className="flex items-center justify-between">
              <DialogTitle className={cn('text-foreground text-left text-xl font-medium')}>
                Change Usre Role
              </DialogTitle>
            </div>
            <DialogDescription className="sr-only">Change Usre Role</DialogDescription>
          </DialogHeader>

          <section className="slim-scrollbar flex max-h-[75svh] flex-col overflow-y-auto px-6 pt-3 pb-1">
            <FormSelectField<UserInfoFormValues, UserInfoFormValues['role']>
              containerClass=""
              form={form}
              name="role"
              label="User Role"
              placeholder="Select user role"
              options={[
                { label: 'Property Manager', value: 'PROPERTY_MANAGER' },
                { label: 'Authorized Viewer', value: 'AUTHORIZED_VIEWER' },
                { label: 'Operation', value: 'OPERATIONAL' },
                { label: 'Admin', value: 'ADMIN' },
              ]}
            />
          </section>

          <DialogFooter className="grid grid-cols-2 px-6 pt-2">
            <DialogClose asChild>
              <Button type="button" size="lg" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isLoading} size="lg">
              {isLoading ? <Spinner /> : null}
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
