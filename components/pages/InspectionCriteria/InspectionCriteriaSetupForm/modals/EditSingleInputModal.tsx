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

interface EditSingleInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
  criteriaId: string | undefined
}

export function EditSingleInputModal({ criteriaId, editFieldType, ...props }: EditSingleInputModalProps) {

  return (
    <EditInputDialog
      headdingAction={
        <ConfirmDialog
          iconContainerClass="bg-transparent p-0"
          trigger={
            <Button size="icon" variant="muted">
              <Trush className="text-destructive size-5" />
            </Button>
          }
          title="Delete Input Field"
          desc="Are you sure you want to delete this input field?"
        >
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
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
