import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import React from 'react'
import { InputFieldType, EditInputDialog } from './EditInputDialog/EditInputDialog'
import { IInspectionInputField } from '@/types'
import { useDeleteCustomHeaderFieldMutation } from '@/api/inspectionManagement/criteriaManagementApi'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/farmatters'

interface EditSingleInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
  criteriaId: string | undefined
  initialData: IInspectionInputField | undefined
}

export function EditSingleInputModal({
  criteriaId,
  editFieldType,
  initialData,
  onOpenChange,
  ...props
}: EditSingleInputModalProps) {
  const [deleteCustomHeaderField, { isLoading: isDeleting }] = useDeleteCustomHeaderFieldMutation()
  async function handDleDelte() {
    if (!criteriaId || !initialData?.key) {
      return toast.error('Invalid criteriaId')
    }

    try {
      const res = await deleteCustomHeaderField({
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

  return (
    <EditInputDialog
      headdingAction={
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
      }
      title="Edit Input fileds"
      footer={
        <>
          <DialogClose asChild>
            <Button type="button" size="xl" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" size="xl">
            Save
          </Button>
        </>
      }
      onOpenChange={onOpenChange}
      {...props}
    >
      {(editFieldType == 'input-text' ||
        editFieldType == 'input-textarea' ||
        editFieldType == 'input-dropdown' ||
        editFieldType == 'input-mark') && (
        <>
          <Field>
            <FieldLabel htmlFor="name">Input Label</FieldLabel>
            <InputGroup className="rounded-none! border-0 border-b">
              <InputGroupInput placeholder="Enter input Label" />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Placeholder</FieldLabel>
            <InputGroup className="rounded-none! border-0 border-b">
              <InputGroupInput placeholder="Enter input placeholder" />
            </InputGroup>
          </Field>
        </>
      )}

      {editFieldType == 'input-dropdown' && (
        <>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="name"> Dropdown options</FieldLabel>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon-sm" className="rounded-full">
                    <Plus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">
                  <p>Create new dropdown option</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <section className="space-y-1">
              <InputGroup className="rounded-none! border-0 border-b">
                <InputGroupInput value="Dropdown option 1" placeholder="" />
                <InputGroupAddon align="inline-end">
                  <Button size="icon-sm" variant="muted">
                    <Trush className="text-destructive size-5" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="rounded-none! border-0 border-b">
                <InputGroupInput value="Dropdown option 2" placeholder="" />
                <InputGroupAddon align="inline-end">
                  <Button size="icon-sm" variant="muted">
                    <Trush className="text-destructive size-5" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </section>
          </Field>
        </>
      )}

      {editFieldType == 'input-mark' && (
        <Field>
          <FieldLabel htmlFor="name">Total Points</FieldLabel>
          <InputGroup className="rounded-none! border-0 border-b">
            <InputGroupInput value={25} placeholder="" />
          </InputGroup>
        </Field>
      )}
    </EditInputDialog>
  )
}
