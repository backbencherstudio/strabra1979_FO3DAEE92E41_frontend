import { useEditTextAreaInputFieldMutation } from '@/api/inspectionManagement/criteriaManagementApi'
import FormInputField from '@/components/form/form-input-field'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { IEditTextAreaFieldParams, EditTextAreaFieldType } from '@/types'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { EditInputDialog } from './EditInputDialog/EditInputDialog'

const editTextAreaFormSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  placeholder: z.string().min(1, 'Placeholder is required'),
})
type EditTextAreaFormSchemaFromValues = z.infer<typeof editTextAreaFormSchema>

export interface EditTextAreaInputModalProps extends React.ComponentProps<typeof Dialog> {
  initialData?: IEditTextAreaFieldParams
  criteriaId: string | undefined
  fieldType: EditTextAreaFieldType | undefined
}

export function EditTextAreaInputModal({
  initialData,
  fieldType,
  criteriaId,
  onOpenChange,
  ...props
}: EditTextAreaInputModalProps) {
  const [editTextAreaInputField, { isLoading: isEditing }] = useEditTextAreaInputFieldMutation()

  const isNteField = fieldType === 'NTE'

  const form = useForm({
    defaultValues: {
      label: initialData?.label ?? '',
      placeholder: initialData?.placeholder ?? '',
    },
    validators: {
      onSubmit: editTextAreaFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!criteriaId) {
        toast.error('criteriaId not availble')
        return
      }
      if (!fieldType) {
        toast.error('fieldType not availble')
        return
      }

      try {
        const res = await editTextAreaInputField({
          criteriaId,
          fieldType,
          payload: value,
        }).unwrap()
        onOpenChange?.(false)
        form.reset()
        toast.success(res?.message ?? 'Scoring field updated successfully')
      } catch (error) {
        toast.error(`Failed to update field`, { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <EditInputDialog
        title={isNteField ? 'Update NTE field' : 'Update Additional Notes field'}
        titleClass="text-center w-full"
        footer={
          <div className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button type="button" size="xl" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1" onClick={() => form.handleSubmit()} type="button" size="xl">
              {isEditing ? <Spinner /> : null}
              {isEditing ? 'Updating...' : 'Update'}
            </Button>
          </div>
        }
        {...props}
        onOpenChange={(v) => {
          if (!v) setTimeout(form.reset, 50)
          onOpenChange?.(v)
        }}
      >
        <FieldGroup className="pb-1">
          <FormInputField<EditTextAreaFormSchemaFromValues>
            form={form}
            name="label"
            label="Input Label"
            placeholder="Enter input label"
          />

          <FormInputField<EditTextAreaFormSchemaFromValues>
            form={form}
            name="placeholder"
            label="Placeholder"
            placeholder="Enter input placeholder"
          />
        </FieldGroup>
      </EditInputDialog>
    </form>
  )
}
