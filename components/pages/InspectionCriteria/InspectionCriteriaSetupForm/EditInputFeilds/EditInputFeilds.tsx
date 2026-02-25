import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'

import { Trush } from '@/components/icons/Trush'
import { DialogClose } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import React from 'react'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PlusSignSquare } from '@/components/icons/File'

export type InputFieldType =
  | 'input-text'
  | 'input-dropdown'
  | 'input-date'
  | 'input-mark'
  | 'input-textarea'

interface EditInputFeildsProps
  extends React.PropsWithChildren, React.ComponentProps<typeof Dialog> {
  title: string
  titleClass?: string
  dialogContainerClass?: string
  trigger?: ReactNode
  headdingAction?: ReactNode
  icon?: ReactNode
  footer?: ReactNode
}

export default function EditInputFeilds({
  title,
  titleClass,
  footer,
  trigger,
  children,
  headdingAction,
  dialogContainerClass,
  ...props
}: EditInputFeildsProps) {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn('px-0 sm:max-w-156', dialogContainerClass)}
        showCloseButton={false}
      >
        <DialogHeader className="px-6">
          <div className="flex items-center justify-between">
            <DialogTitle
              className={cn('text-foreground text-left text-xl font-medium', titleClass)}
            >
              {title}
            </DialogTitle>

            {headdingAction}
          </div>
          <DialogDescription className="sr-only">Edit input feilds</DialogDescription>
        </DialogHeader>

        <section className="slim-scrollbar flex max-h-[75svh] flex-col overflow-y-auto px-6">
          {children}
        </section>
        <DialogFooter className="px-6 pt-2 *:flex-1">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface CreateMoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
}

export function CreateMoreInputModal({ editFieldType, ...props }: CreateMoreInputModalProps) {
  const [isInputRequired, setIsInputRequired] = useState(false)
  const [isInputDropDown, setIsInputDropDown] = useState(false)

  return (
    <EditInputFeilds
      title="Add More Input fileds"
      titleClass="text-center w-full"
      dialogContainerClass={cn('', {
        'sm:max-w-235': editFieldType !== 'input-mark',
      })}
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
      <div className="grid grid-cols-2 divide-x *:first:pr-4 *:last:pl-4">
        <section className="relative space-y-3">
          <div className="absolute inset-0 z-100"></div>

          {isInputDropDown ? (
            <>
              <Field>
                <FieldLabel htmlFor="name">
                  Input Label {isInputRequired ? <span className="text-destructive">*</span> : null}
                </FieldLabel>
                <Select disabled>
                  <SelectTrigger className="relative" id="property-type">
                    <SelectValue placeholder="Enter placeholder" />
                  </SelectTrigger>
                </Select>
              </Field>

              <ul className="border-input rounded-md border bg-white shadow-lg">
                <li className="p-2.5">Dropdown option 1</li>
                <li className="p-2.5">Dropdown option 1</li>
              </ul>
            </>
          ) : (
            <Field>
              <FieldLabel htmlFor="name">
                Input Label {isInputRequired ? <span className="text-destructive">*</span> : null}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput disabled placeholder="Enter placeholder" />
              </InputGroup>
            </Field>
          )}
        </section>

        <section className="slim-scrollbar -mr-6 grid max-h-[75svh] gap-4 overflow-y-auto pr-6">
          <span className="text-center font-medium">Input Form</span>

          <Field className="grid grid-cols-[1fr_3fr]">
            <FieldLabel className="text-nowrap" htmlFor="name">
              Input Label
            </FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Enter input label" />
            </InputGroup>
          </Field>

          <Field className="grid grid-cols-[1fr_3fr]">
            <FieldLabel className="text-nowrap" htmlFor="name">
              Placeholder
            </FieldLabel>
            <InputGroup>
              <InputGroupInput placeholder="Enter input placeholder" />
            </InputGroup>
          </Field>

          <Field className="grid grid-cols-[1fr_3fr]">
            <FieldLabel className="text-nowrap" htmlFor="name">
              Required
            </FieldLabel>
            <Switch checked={isInputRequired} onClick={() => setIsInputRequired((v) => !v)} />
          </Field>

          <Field className="grid grid-cols-[1fr_3fr]">
            <FieldLabel className="text-nowrap" htmlFor="name">
              Dropdown
            </FieldLabel>
            <Switch checked={isInputDropDown} onClick={() => setIsInputDropDown((v) => !v)} />
          </Field>

          {isInputDropDown ? (
            <div className="space-y-2">
              <div className="text-sm">Add dropdown options</div>

              <Field>
                <InputGroup className="h-11">
                  <InputGroupInput placeholder="Enter dropdown option" />
                </InputGroup>
              </Field>

              <Field>
                <InputGroup className="h-11">
                  <InputGroupInput placeholder="Enter dropdown option" />
                </InputGroup>
              </Field>

              <Button variant="muted" type="button" className="w-full">
                <PlusSignSquare className="size-6" />
                Add More
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    </EditInputFeilds>
  )
}

export function CreateMoreMarkInputModal({ editFieldType, ...props }: CreateMoreInputModalProps) {
  const [isInputRequired, setIsInputRequired] = useState(false)
  const [isInputDropDown, setIsInputDropDown] = useState(false)

  return (
    <EditInputFeilds
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
    </EditInputFeilds>
  )
}

interface EditSingleInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
}

export function EditSingleInputModal({ editFieldType, ...props }: EditSingleInputModalProps) {
  return (
    <EditInputFeilds
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
    </EditInputFeilds>
  )
}
