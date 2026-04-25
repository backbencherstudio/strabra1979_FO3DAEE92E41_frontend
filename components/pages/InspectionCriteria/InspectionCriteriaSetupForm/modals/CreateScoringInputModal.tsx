import {
  useCreateScoringFieldMutation,
  useDeleteACustomScoringCategoryMutation,
  useEditAScoringFieldMutation,
} from '@/api/inspectionManagement/criteriaManagementApi'
import FormInputField from '@/components/form/form-input-field'
import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { getErrorMessage } from '@/lib/farmatters'
import { ScoringCategory } from '@/types'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { EditInputDialog } from './EditInputDialog/EditInputDialog'
import { Spinner } from '@/components/ui/spinner'

export const inspectionCriteriaScoringModalSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  maxPoints: z
    .number()
    .int('Must be a whole number')
    .min(1, "Max point can't be less than 1")
    .max(100, "Max point can't be greater than 100"),
})

export type InspectionCriteriaScoringModalSchemaFromValues = z.infer<
  typeof inspectionCriteriaScoringModalSchema
>

export interface CreateScoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  criteriaId: string | undefined
  mode?: 'edit' | 'create'
  initialData?: ScoringCategory
}

export function CreateScoringInputModal({
  initialData,
  mode,
  criteriaId,
  onOpenChange,
  ...props
}: CreateScoreInputModalProps) {
  const isEditMode = mode === 'edit'

  const [createScoringField, { isLoading: isCreating }] = useCreateScoringFieldMutation()
  const [editAScoringField, { isLoading: isEditing }] = useEditAScoringFieldMutation()
  const [deleteCustomScoringField, { isLoading: isDeleting }] =
    useDeleteACustomScoringCategoryMutation()
  async function handDleDelte() {
    if (!criteriaId || !initialData?.key) {
      return toast.error('Invalid criteriaId')
    }

    try {
      const res = await deleteCustomScoringField({
        criteriaId,
        fieldKey: initialData.key,
      }).unwrap()
      onOpenChange?.(false)
      toast.success(res.message || 'Success message')
    } catch (err) {
      toast.error('Error title', {
        description: getErrorMessage(err),
      })
    }
  }

  const form = useForm({
    defaultValues: {
      label: initialData?.label ?? '',
      maxPoints: initialData?.maxPoints ?? 0,
    },
    validators: {
      onSubmit: inspectionCriteriaScoringModalSchema,
    },
    onSubmit: async ({ value }) => {
      if (!criteriaId) {
        toast.error('criteriaId not availble')
        return
      }

      try {
        if (mode === 'edit' && initialData?.key) {
          const res = await editAScoringField({
            fieldKey: initialData.key,
            criteriaId,
            payload: { ...value },
          }).unwrap()
          onOpenChange?.(false)
          form.reset()
          toast.success(res?.message ?? 'Scoring field updated successfully')
        } else {
          const res = await createScoringField({ criteriaId, ...value }).unwrap()
          onOpenChange?.(false)
          form.reset()
          toast.success(res?.message ?? 'New field created successfully')
        }
      } catch (error) {
        toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} field`, {
          description: getErrorMessage(error),
        })
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
        title="Add More Condition Rating Scale"
        titleClass="text-center w-full"
        headdingAction={
          isEditMode ? (
            <ConfirmDialog
              iconContainerClass="bg-transparent p-0"
              trigger={
                initialData?.isSystem ? null : (
                  <Button type="button" disabled={isDeleting} size="icon" variant="muted">
                    <Trush className="text-destructive size-5" />
                  </Button>
                )
              }
              title="Delete Input Field"
              desc="Are you sure you want to delete this input field?"
            >
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction type="button" onClick={handDleDelte} variant="destructive">
                Delete Field
              </AlertDialogAction>
            </ConfirmDialog>
          ) : null
        }
        footer={
          <div className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button type="button" size="xl" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1" onClick={() => form.handleSubmit()} type="button" size="xl">
              {isEditing || isCreating ? <Spinner /> : null}
              {isEditing
                ? 'Updating...'
                : isCreating
                  ? 'Creating...'
                  : mode === 'edit'
                    ? 'Update'
                    : 'Create'}
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
          <FormInputField<InspectionCriteriaScoringModalSchemaFromValues>
            form={form}
            name="label"
            label="Input Label"
            placeholder="Enter input label"
          />

          <FormInputField<InspectionCriteriaScoringModalSchemaFromValues>
            form={form}
            type="number"
            name="maxPoints"
            label="Total Points"
            placeholder="Enter max point"
          />

          {/* <Field> */}
          {/*   <FieldLabel htmlFor="name"></FieldLabel> */}
          {/*   <InputGroup className="rounded-none! border-0 border-b"> */}
          {/*     <InputGroupInput placeholder="" /> */}
          {/*   </InputGroup> */}
          {/* </Field> */}

          {/* <Field> */}
          {/*   <FieldLabel htmlFor="name"></FieldLabel> */}
          {/*   <InputGroup className="rounded-none! border-0 border-b"> */}
          {/*     <InputGroupInput value={25} placeholder="Enter" /> */}
          {/*   </InputGroup> */}
          {/* </Field> */}
        </FieldGroup>
      </EditInputDialog>
    </form>
  )
}
