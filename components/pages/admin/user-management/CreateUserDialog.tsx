'use client'

import { SignupFormValues, useRegerterUserForm } from '@/components/auth/SignUpForm'
import FormInputField from '@/components/form/form-input-field'
import FormSelectField from '@/components/form/form-select-field'
import { LockIcon } from '@/components/icons/LockIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const { form, registerUserIsLoading } = useRegerterUserForm({
    onSubmit: () => {
      onOpenChange(false)
    },
  })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 sm:max-w-[940px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium text-[#4a4c56]">
            Create New User
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Usernae */}
          <FormInputField<SignupFormValues>
            form={form}
            name="username"
            label="Username"
            placeholder="Username"
            icon={<UserIcon className="size-4" />}
          />

          <FormInputField<SignupFormValues>
            form={form}
            name="email"
            label="Email"
            placeholder="Email"
            icon={<MailIcon className="size-4" />}
          />

          <FormInputField<SignupFormValues>
            form={form}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            icon={<LockIcon className="size-4" />}
            rightElement={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            }
          />

          <FormInputField<SignupFormValues>
            form={form}
            name="confirmPassword"
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            icon={<LockIcon className="size-4" />}
          />

          <FormSelectField<SignupFormValues, SignupFormValues['role']>
            containerClass="col-span-full"
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

          <DialogClose asChild>
            <Button type="button" variant="outline" size="xl">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit" size="xl">
            {registerUserIsLoading && <Spinner />}
            {registerUserIsLoading ? 'Creating User...' : 'Create User'}
          </Button>

          {/* <div className="flex flex-1 flex-col"> */}
          {/*   <label htmlFor="userRole" className="mb-2 text-base font-medium text-[#4a4c56]"> */}
          {/*     User Role */}
          {/*   </label> */}
          {/*   <Select */}
          {/*     value={formData.userRole} */}
          {/*     onValueChange={(value) => setFormData({ ...formData, userRole: value })} */}
          {/*     required */}
          {/*   > */}
          {/*     <SelectTrigger className="h-auto w-full rounded-[12px] border border-[#e9e9ea] px-5 py-3.5 focus:border-[#0b2a3b] focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-[#4a4c56]"> */}
          {/*       <SelectValue */}
          {/*         placeholder="Select user role" */}
          {/*         className="placeholder:text-[#4a4c56]" */}
          {/*       /> */}
          {/*     </SelectTrigger> */}
          {/*     <SelectContent className="rounded-[12px] border border-[#e9e9ea]"> */}
          {/*       <SelectItem value="admin" className="px-5 py-3.5 focus:bg-[#f6f8fa]"> */}
          {/*         Property Manager */}
          {/*       </SelectItem> */}
          {/*       <SelectItem value="manager" className="px-5 py-3.5 focus:bg-[#f6f8fa]"> */}
          {/*         Authorized Viewer */}
          {/*       </SelectItem> */}
          {/*       <SelectItem value="viewer" className="px-5 py-3.5 focus:bg-[#f6f8fa]"> */}
          {/*         Operation */}
          {/*       </SelectItem> */}
          {/*       <SelectItem value="editor" className="px-5 py-3.5 focus:bg-[#f6f8fa]"> */}
          {/*         Admin */}
          {/*       </SelectItem> */}
          {/*     </SelectContent> */}
          {/*   </Select> */}
          {/* </div> */}
        </form>
      </DialogContent>
    </Dialog>
  )
}
