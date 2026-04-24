import { FileImage, PlusSignSquare } from '@/components/icons/File'
import { FileInput } from '@/components/reusable/FileInput/FileInput'
import { FileInputProvider } from '@/components/reusable/FileInput/FileInputProvider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { EditInputDialog, InputFieldType } from './EditInputDialog/EditInputDialog'

import {
  useCreateNewHeaderFieldMutation,
  useDeleteCustomHeaderFieldMutation,
  useEditAHeaderFieldMutation,
} from '@/api/inspectionManagement/criteriaManagementApi'
import FormInputField from '@/components/form/form-input-field'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { IInspectionInputField } from '@/types'
import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

export const inspectionCriteriaSchema = z
  .object({
    label: z.string().min(1, 'Label is required'),
    placeholder: z.string().min(1, 'Placeholder is required'),
    required: z.boolean(),
    isDropdown: z.boolean(),
    dropdownOptions: z.array(z.string().trim().min(1, "Option can't be empty")),
  })
  .refine(
    (data) => {
      if (data.isDropdown) {
        return Array.isArray(data.dropdownOptions) && data.dropdownOptions.length > 0
      }
      return true
    },
    {
      message: 'Options are required when isDropdown is true',
      path: ['dropdownOptions'],
    },
  )

export type InspectionCriteriaFormValues = z.infer<typeof inspectionCriteriaSchema>

export interface CreateMoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  editFieldType?: InputFieldType
  criteriaId: string | undefined
  mode?: 'edit' | 'create'
  initialData?: IInspectionInputField
}

export function CreateMoreInputModal({
  editFieldType,
  criteriaId,
  onOpenChange,
  mode = 'create',
  initialData,
  ...props
}: CreateMoreInputModalProps) {
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

  const [editHeaderField, { isLoading: isEditing }] = useEditAHeaderFieldMutation()
  const [createNewHeaderField, { isLoading: isCreating }] = useCreateNewHeaderFieldMutation()
  const [mediaInputType, setMediaInputType] = useState<'media' | 'embedded'>('media')

  const isEditMode = mode === 'edit'

  const form = useForm({
    defaultValues: {
      label: initialData?.label ?? '',
      placeholder: initialData?.placeholder ?? '',
      required: initialData?.required ?? false,
      isDropdown: initialData?.type === 'dropdown' ? true : false,
      dropdownOptions: initialData?.type === 'dropdown' ? initialData.options : [],
    },
    validators: {
      onSubmit: inspectionCriteriaSchema,
    },
    onSubmit: async ({ value }) => {
      if (!criteriaId) {
        toast.error('criteriaId not availble')
        return
      }

      const options = value.isDropdown
        ? value.dropdownOptions.map((option) => option.trim()).filter((option) => option !== '')
        : undefined

      try {
        if (mode === 'edit' && initialData?.key) {
          const res = await editHeaderField({
            fieldKey: initialData.key,
            criteriaId,
            payload: { ...value, options },
          }).unwrap()
          onOpenChange?.(false)
          form.reset()
          toast.success(res?.message ?? 'Header field updated successfully')
        } else {
          const res = await createNewHeaderField({
            criteriaId,
            ...value,
            options,
          }).unwrap()
          onOpenChange?.(false)
          form.reset()
          toast.success(res?.message ?? 'Header field created successfully')
        }
      } catch (error) {
        toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} header field`, {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <EditInputDialog
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
      onOpenChange={(v) => {
        if (!v) setTimeout(form.reset, 50)
        onOpenChange?.(v)
      }}
      title={mode === 'edit' ? 'Edit Input Field' : 'Add More Input fields'}
      titleClass="text-center w-full"
      dialogContainerClass={cn('', {
        'sm:max-w-235': editFieldType !== 'input-mark',
      })}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <DialogClose asChild>
            <Button className="flex-1" type="button" size="xl" variant="outline">
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
    >
      <div className="grid grid-cols-2 divide-x *:first:pr-4 *:last:pl-4">
        <form.Subscribe
          selector={(state) => ({
            isDropdown: state.values.isDropdown,
            required: state.values.required,
            dropdownOptions: state.values.dropdownOptions,
            label: state.values.label,
            placeholder: state.values.placeholder,
          })}
        >
          {({ isDropdown, required, dropdownOptions, label, placeholder }) => (
            <PreviewEditField
              label={label}
              placeholder={placeholder}
              dropdownOptions={dropdownOptions}
              editFieldType={editFieldType}
              isInputDropDown={isDropdown}
              isInputRequired={required}
              mediaInputType={mediaInputType}
            />
          )}
        </form.Subscribe>

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
                      disabled={isEditMode}
                      id={field.name}
                      checked={field.state.value}
                      onClick={() => {
                        const checked = !field.state.value
                        field.setValue(checked)
                        form.setFieldValue('dropdownOptions', checked ? [''] : [])
                      }}
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

                  <form.Field name="dropdownOptions" mode="array">
                    {(field) => (
                      <div className="space-y-2">
                        {field.state.value.map((_, index) => (
                          <Field key={index}>
                            <form.Field name={`dropdownOptions[${index}]`}>
                              {(subField) => (
                                <>
                                  <InputGroup className="mt-2 h-11">
                                    <InputGroupInput
                                      placeholder="Enter option"
                                      value={subField.state.value}
                                      onChange={(e) => subField.handleChange(e.target.value)}
                                    />
                                    <InputGroupAddon align="inline-end">
                                      <Button
                                        variant="outline"
                                        size="icon-xs"
                                        onClick={() => field.removeValue(index)}
                                      >
                                        <X className="size-4" />
                                      </Button>
                                    </InputGroupAddon>
                                  </InputGroup>
                                  <FieldError errors={subField.state.meta.errors} />
                                </>
                              )}
                            </form.Field>
                          </Field>
                        ))}

                        <FieldError errors={field.state.meta.errors} />

                        <Button
                          className="w-full"
                          variant="muted"
                          type="button"
                          onClick={() => field.pushValue('')}
                        >
                          <PlusSignSquare className="size-5" />
                          Add More Option
                        </Button>
                      </div>
                    )}
                  </form.Field>
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
  dropdownOptions: string[]
  label: string
  placeholder: string
}

export function PreviewEditField({
  label,
  placeholder,
  isInputDropDown,
  isInputRequired,
  editFieldType,
  mediaInputType,
  dropdownOptions,
}: PreviewEditFieldProps) {
  const inputLabel = label.trim() === '' ? 'Input Label' : label
  const inputPlaceholder = placeholder.trim() === '' ? 'Enter placeholder' : placeholder
  return (
    <section className="relative space-y-3">
      <div className="text-center font-medium">Previw</div>

      {isInputDropDown ? (
        <>
          <Field>
            <FieldLabel isRequired={isInputRequired} id="previw-field">
              {inputLabel}
            </FieldLabel>
            <Select disabled>
              <SelectTrigger id="previw-field" className="relative">
                <SelectValue placeholder={inputPlaceholder} />
              </SelectTrigger>
            </Select>
          </Field>

          <ul className="border-input min-h-10 space-y-2.5 rounded-md border bg-white px-2.5 py-2 shadow-lg">
            {dropdownOptions.map((item, idx) => (
              <li key={idx} className="text-muted-foreground line-clamp-1 text-sm">
                {item.trim() === '' ? 'Enter option' : item}
              </li>
            ))}
          </ul>
        </>
      ) : editFieldType === 'input-media' ? (
        <Field>
          <FieldLabel isRequired={isInputRequired} htmlFor="previw-field">
            {inputLabel}
          </FieldLabel>
          {mediaInputType === 'media' ? (
            <FileInputProvider>
              <FileInput id="previw-field" icon={<FileImage />} placeholder={inputPlaceholder} />
            </FileInputProvider>
          ) : (
            <InputGroup>
              <InputGroupTextarea
                className="disabled:opacity-100"
                id="previw-field"
                disabled
                placeholder={inputPlaceholder}
              />
            </InputGroup>
          )}
        </Field>
      ) : (
        <Field>
          <FieldLabel isRequired={isInputRequired} htmlFor="previw-field">
            {inputLabel}
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              className="disabled:opacity-100"
              id="previw-field"
              disabled
              placeholder={inputPlaceholder}
            />
          </InputGroup>
        </Field>
      )}
    </section>
  )
}
