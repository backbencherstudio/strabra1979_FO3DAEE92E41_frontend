import { FileImage, PlusSignSquare } from '@/components/icons/File'
import { FileInput } from '@/components/reusable/FileInput/FileInput'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { InputFieldType, EditInputDialog } from './EditInputDialog/EditInputDialog'

import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import FormInputField from '@/components/form/form-input-field'

export const inspectionCriteriaSchema = z
  .object({
    label: z.string().min(1, 'Label is required'),
    placeholder: z.string().min(1, 'Placeholder is required'),
    required: z.boolean().optional(),
    isDropdown: z.boolean().optional(),
    options: z.array(z.string()).optional(),
    mediaType: ''
  })
  .refine(
    (data) => {
      if (data.isDropdown) {
        return Array.isArray(data.options) && data.options.length > 0
      }
      return true
    },
    {
      message: 'Options are required when isDropdown is true',
      path: ['options'],
    },
  )

export type InspectionCriteriaFormValues = z.infer<typeof inspectionCriteriaSchema>

export interface CreateMoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
}

export function CreateMoreInputModal({ editFieldType, ...props }: CreateMoreInputModalProps) {
  const [isInputRequired, setIsInputRequired] = useState(false)
  const [isInputDropDown, setIsInputDropDown] = useState(false)

  const [mediaInputType, setMediaInputType] = useState<'media' | 'embedded'>('media')

  const form = useForm({
    defaultValues: {
      label: '',
      placeholder: '',
      required: false,
      isDropdown: false,
      options: [],
    },

    onSubmit: async ({ value }) => {
      console.log('VALID DATA', value)
    },
  })

  return (
    <EditInputDialog
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
        <PreviewEditField
          editFieldType={editFieldType}
          isInputDropDown={isInputDropDown}
          isInputRequired={isInputRequired}
          mediaInputType={mediaInputType}
        />

        <section className="slim-scrollbar -mr-6 grid max-h-[75svh] gap-4 overflow-y-auto pr-6">
          <span className="text-center font-medium">Input Form</span>

          <FormInputField<InspectionCriteriaFormValues>
            containerClass="grid grid-cols-[1fr_3fr]"
            form={form}
            name="label"
            label="Input Label"
            placeholder="Enter input label"
          />

          <FormInputField<InspectionCriteriaFormValues>
            containerClass="grid grid-cols-[1fr_3fr]"
            form={form}
            name="placeholder"
            label="Placeholder"
            placeholder="Enter input placeholder"
          />

          {editFieldType == 'input-media' ? (
            <>
              <Field className="grid grid-cols-[1fr_3fr]">
                <FieldLabel className="text-nowrap" htmlFor="name">
                  Media Files
                </FieldLabel>
                <Switch
                  checked={mediaInputType == 'media'}
                  onClick={() => setMediaInputType('media')}
                />
              </Field>

              <Field className="grid grid-cols-[1fr_3fr]">
                <FieldLabel className="text-nowrap" htmlFor="name">
                  Embedded
                </FieldLabel>
                <Switch
                  checked={mediaInputType == 'embedded'}
                  onClick={() => setMediaInputType('embedded')}
                />
              </Field>
            </>
          ) : (
            <>
              <form.Field name="required">
                {(field) => (
                  <Field className="grid grid-cols-[1fr_3fr]">
                    <FieldLabel className="text-nowrap" htmlFor={field.name}>
                      Required
                    </FieldLabel>
                    <Switch
                      id={field.name}
                      checked={field.state.value}
                      onClick={() => field.setValue(!field.state.value)}
                    />
                  </Field>
                )}
              </form.Field>

              <form.Field name="isDropdown">
                {(field) => (
                  <Field className="grid grid-cols-[1fr_3fr]">
                    <FieldLabel className="text-nowrap" htmlFor={field.name}>
                      Dropdown
                    </FieldLabel>
                    <Switch
                      id={field.name}
                      checked={field.state.value}
                      onClick={() => field.setValue(!field.state.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </>
          )}

          <form.Subscribe
            selector={(state) => ({
              isDropdown: state.values.isDropdown,
            })}
          >
            {({ isDropdown }) =>
              isDropdown ? (
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
              ) : null
            }
          </form.Subscribe>
        </section>
      </div>
    </EditInputDialog>
  )
}

interface PreviewEditFieldProps {
  isInputDropDown: boolean
  isInputRequired: boolean
  editFieldType: InputFieldType | undefined
  mediaInputType: 'media' | 'embedded'
}

export function PreviewEditField({
  isInputDropDown,
  isInputRequired,
  editFieldType,
  mediaInputType,
}: PreviewEditFieldProps) {
  return (
    <section className="relative space-y-3">
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
      ) : editFieldType === 'input-media' ? (
        <Field>
          <FieldLabel htmlFor="name">
            Input Label {isInputRequired ? <span className="text-destructive">*</span> : null}
          </FieldLabel>
          {mediaInputType === 'media' ? (
            <FileInputProvider>
              <FileInput icon={<FileImage />} placeholder="Upload your file" />
            </FileInputProvider>
          ) : (
            <InputGroup>
              <InputGroupTextarea disabled placeholder="Enter placeholder" />
            </InputGroup>
          )}
        </Field>
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
  )
}
