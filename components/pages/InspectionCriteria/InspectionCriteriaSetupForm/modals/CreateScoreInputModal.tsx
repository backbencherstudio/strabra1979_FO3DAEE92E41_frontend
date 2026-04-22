import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import React, { useState } from 'react'
import { InputFieldType, EditInputDialog  } from './EditInputDialog/EditInputDialog'

export interface CreateScoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
}

export function CreateScoreInputModal({ editFieldType, ...props }: CreateScoreInputModalProps) {
  const [isInputRequired, setIsInputRequired] = useState(false)
  const [isInputDropDown, setIsInputDropDown] = useState(false)

  return (
    <EditInputDialog
      title="Add More Condition Rating Scale"
      titleClass="text-center w-full"
      // dialogContainerClass={}
      footer={
        <>
          <DialogClose asChild>
            <Button type="button" size="xl" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" size="xl">
            Create
          </Button>
        </>
      }
      {...props}
    >
      <section className="relative space-y-3">
        <Field>
          <FieldLabel htmlFor="name">
            Input Label {isInputRequired ? <span className="text-destructive">*</span> : null}
          </FieldLabel>
          <InputGroup className="rounded-none! border-0 border-b">
            <InputGroupInput placeholder="Enter input label" />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Input Placeholder</FieldLabel>
          <InputGroup className="rounded-none! border-0 border-b">
            <InputGroupInput placeholder="Enter input placeholder" />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="name">Total Points</FieldLabel>
          <InputGroup className="rounded-none! border-0 border-b">
            <InputGroupInput value={25} placeholder="Enter" />
          </InputGroup>
        </Field>
      </section>
    </EditInputDialog>
  )
}
