'use client'

import { useCreateNewTemplateMutation } from '@/api/template/templateManagementApi'
import {
  DialogProps,
  EditInputDialog,
} from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/modals/EditInputDialog/EditInputDialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { getErrorMessage } from '@/lib/farmatters'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import FormInputField from '@/components/form/form-input-field'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Template name is required').min(3, 'Minimum 3 characters'),
})

type FormValues = z.infer<typeof schema>

export default function CreateNewTemplateModal(props: DialogProps) {
  const [open, setOpen] = useState(false)
  const [createNewTemplate, { isLoading }] = useCreateNewTemplateMutation()

  const form = useForm({
    defaultValues: {
      name: '',
    } satisfies FormValues,

    validators: {
      onSubmit: schema,
    },

    onSubmit: async ({ value }) => {
      try {
        const res = await createNewTemplate({ name: value.name }).unwrap()
        setOpen(false)

        toast.success(res.message || 'Template created')
      } catch (err) {
        toast.error('Failed to create template', {
          description: getErrorMessage(err),
        })
      }
    },
  })

  return (
    <>
      <Button onClick={() => setOpen(true)} size="xl">
        <Plus className="size-5" />
        Add New Template
      </Button>

      <EditInputDialog
        open={open}
        onOpenChange={setOpen}
        title="Add New Template"
        titleClass="text-center w-full"
        footer={
          <>
            <DialogClose asChild>
              <Button type="button" size="xl" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button size="xl" disabled={isLoading} onClick={() => form.handleSubmit()}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </>
        }
        {...props}
      >
        <form
          className="relative space-y-3 pb-1"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FormInputField<FormValues>
            form={form}
            name="name"
            label="Template Name"
            placeholder="Enter new template name"
            // icon={<UserIcon className="size-4" />}
          />
        </form>
      </EditInputDialog>
    </>
  )
}
