import { PlusSignSquare } from '@/components/icons/File'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import React from 'react'
import {
  CREATE_INPUT_TYPES,
  EditInputDialog,
  InputFieldType,
} from './EditInputDialog/EditInputDialog'

import {
  useCreateCustomMediaFieldMutation,
  useCreateNewHeaderFieldMutation,
  useDeleteCustomHeaderFieldMutation,
  useEditAHeaderFieldMutation,
} from '@/api/inspectionManagement/criteriaManagementApi'
import FormInputField from '@/components/form/form-input-field'
import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { IInspectionInputField } from '@/types'
import { useForm } from '@tanstack/react-form'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { CreateMoreInputModalPreview } from './CreateMoreInputModalPreview'

export const inspectionCriteriaSchema = z
  .object({
    // Common field
    label: z.string().min(1, 'Label is required'),
    placeholder: z.string().min(1, 'Placeholder is required'),

    // for input field
    required: z.boolean(),

    // for select field
    // isDropdown: z.boolean(),
    dropdownOptions: z.array(z.string().trim().min(1, "Option can't be empty")),

    createFieldType: z.enum(CREATE_INPUT_TYPES),
  })
  .refine(
    (data) => {
      if (data.createFieldType === 'input-dropdown') {
        return Array.isArray(data.dropdownOptions) && data.dropdownOptions.length > 0
      }
      return true
    },
    {
      message: 'Options are required when Dropdown is true',
      path: ['dropdownOptions'],
    },
  )

export type InspectionCriteriaFormValues = z.infer<typeof inspectionCriteriaSchema>

export interface CreateMoreInputModalProps extends React.ComponentProps<typeof Dialog> {
  modalType: 'checklist' | 'mediafiles'
  mode?: 'edit' | 'create'

  criteriaId: string | undefined
  initialData?: IInspectionInputField
}

export function CreateMoreInputModal({
  modalType,
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

  const [createCustomMediaField, { isLoading: isCreatingMediaField }] =
    useCreateCustomMediaFieldMutation()

  const isEditMode = mode === 'edit'
  const isMediaFieldModal = modalType === 'mediafiles'

  function getDefaultFieldType(): InputFieldType {
    if (modalType === 'mediafiles') {
      return 'input-media'
    }
    return initialData?.type === 'dropdown' ? 'input-dropdown' : 'input-text'
  }

  const form = useForm({
    defaultValues: {
      label: initialData?.label ?? '',
      placeholder: initialData?.placeholder ?? '',
      required: initialData?.required ?? false,
      dropdownOptions: initialData?.type === 'dropdown' ? initialData.options : [],
      createFieldType: getDefaultFieldType(),
    },
    validators: {
      onSubmit: inspectionCriteriaSchema,
    },
    onSubmit: async ({ value }) => {
      if (!criteriaId) {
        toast.error('criteriaId not availble')
        return
      }

      if (modalType === 'checklist') {
        await handleHeaderFieldCreateOrEdit(criteriaId, value)
      } else if (modalType === 'mediafiles') {
        await handleMediaFieldCreateOrEdit(criteriaId, value)
      }
    },
  })

  async function handleHeaderFieldCreateOrEdit(
    criteriaId: string,
    value: InspectionCriteriaFormValues,
  ) {
    const isDropdown = value.createFieldType === 'input-dropdown'

    const options = isDropdown
      ? value.dropdownOptions.map((option) => option.trim()).filter((option) => option !== '')
      : undefined

    try {
      if (mode === 'edit' && initialData?.key) {
        const res = await editHeaderField({
          fieldKey: initialData.key,
          criteriaId,
          data: {
            label: value.label,
            placeholder: value.placeholder,
            required: value.required,
            isDropdown: false,
            options,
          },
        }).unwrap()
        onOpenChange?.(false)
        form.reset()
        toast.success(res?.message ?? 'Header field updated successfully')
      } else {
        const res = await createNewHeaderField({
          criteriaId,
          label: value.label,
          placeholder: value.placeholder,
          required: value.required,
          isDropdown,
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
  }

  async function handleMediaFieldCreateOrEdit(
    criteriaId: string,
    value: InspectionCriteriaFormValues,
  ) {
    const isMediaFile = value.createFieldType === 'input-media'
    const isEmbedded = value.createFieldType === 'input-media-embedded'

    try {
      if (mode === 'edit' && initialData?.key) {
        // const res = await editHeaderField({
        //   fieldKey: initialData.key,
        //   criteriaId,
        //   data: {
        //     label: value.label,
        //     placeholder: value.placeholder,
        //     required: value.required,
        //     isDropdown: false,
        //     options,
        //   },
        // }).unwrap()
        // onOpenChange?.(false)
        // form.reset()
        // toast.success(res?.message ?? 'Header field updated successfully')
      } else {
        const res = await createCustomMediaField({
          criteriaId,
          data: {
            label: value.label,
            placeholder: value.placeholder,
            isEmbedded,
            isMediaFile,
            accept: ['image/*', 'video/*'],
          },
        }).unwrap()
        onOpenChange?.(false)
        form.reset()
        toast.success(res?.message ?? 'Media field created successfully')
      }
    } catch (error) {
      toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} Media field`, {
        description: getErrorMessage(error),
      })
    }
  }

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
      dialogContainerClass={cn('sm:max-w-235')}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <DialogClose asChild>
            <Button className="flex-1" type="button" size="xl" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="flex-1" onClick={() => form.handleSubmit()} type="button" size="xl">
            {isEditing || isCreating || isCreatingMediaField ? <Spinner /> : null}
            {isEditing
              ? 'Updating...'
              : isCreating || isCreatingMediaField
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
            createFieldType: state.values.createFieldType,
            required: state.values.required,
            dropdownOptions: state.values.dropdownOptions,
            label: state.values.label,
            placeholder: state.values.placeholder,
          })}
        >
          {({ required, dropdownOptions, label, placeholder, createFieldType }) => (
            <CreateMoreInputModalPreview
              createFieldType={createFieldType}
              label={label}
              placeholder={placeholder}
              dropdownOptions={dropdownOptions}
              modalType={modalType}
              isInputRequired={required}
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

          {isMediaFieldModal ? (
            <form.Field name="createFieldType">
              {(field) => {
                const handleOnClick = () => {
                  const isMediaFiles = field.state.value === 'input-media'
                  field.setValue(isMediaFiles ? 'input-media-embedded' : 'input-media')
                }
                return (
                  <>
                    <Field className="grid grid-cols-[1fr_3fr]">
                      <FieldLabel className="text-nowrap" htmlFor="input-media">
                        Media Files
                      </FieldLabel>
                      <Switch
                        disabled={isEditMode}
                        id="input-media"
                        checked={field.state.value === 'input-media'}
                        onClick={handleOnClick}
                      />
                    </Field>

                    <Field className="grid grid-cols-[1fr_3fr]">
                      <FieldLabel className="text-nowrap" htmlFor="input-media-embedded">
                        Embedded
                      </FieldLabel>
                      <Switch
                        disabled={isEditMode}
                        id="input-media-embedded"
                        checked={field.state.value === 'input-media-embedded'}
                        onClick={handleOnClick}
                      />
                    </Field>
                  </>
                )
              }}
            </form.Field>
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

              <form.Field name="createFieldType">
                {(field) => (
                  <Field className="grid grid-cols-[1fr_3fr]">
                    <FieldLabel className="text-nowrap" htmlFor="input-dropdown">
                      Dropdown
                    </FieldLabel>
                    <Switch
                      disabled={isEditMode}
                      id="input-dropdown"
                      checked={field.state.value === 'input-dropdown'}
                      onClick={() => {
                        const isDropdown = field.state.value === 'input-dropdown'
                        field.setValue(isDropdown ? 'input-text' : 'input-dropdown')
                        form.setFieldValue('dropdownOptions', !isDropdown ? [''] : [])
                      }}
                    />
                  </Field>
                )}
              </form.Field>
            </>
          )}

          <form.Subscribe
            selector={(state) => ({
              isDropdown: state.values.createFieldType === 'input-dropdown',
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
