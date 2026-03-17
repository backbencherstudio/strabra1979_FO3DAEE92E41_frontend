'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

import { useCreatePropertyMutation } from '@/api/dashboard/properties/propertiesApi'
import FormInputField from '@/components/form/form-input-field'
import FormSelectField from '@/components/form/form-select-field'
import CalenderIcon from '@/components/icons/CalenderIcon'
import { AssignManagerDropdown } from '@/components/reusable/AssignManagerDropdown'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import { IPropertyType } from '@/types'
import { useForm } from '@tanstack/react-form'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { z } from 'zod'

const createPropertySchema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  nextInspection: z.date().optional(),
  propertyManagerId: z.string().optional(),
  propertyType: z.string().optional(),
})

type CreatePropertyForm = z.infer<typeof createPropertySchema>

interface AddNewDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function CreateNewPropertyDialog({
  open,
  onOpenChange,
  trigger,
  children,
}: AddNewDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }

  const [createProperty, { isLoading }] = useCreatePropertyMutation()

  const form = useForm({
    defaultValues: {
      propertyName: '',
      address: '',
      nextInspection: undefined,
      propertyManagerId: undefined,
      propertyType: undefined,
    } as CreatePropertyForm,
    validators: {
      onChange: createPropertySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await createProperty({
          name: value.propertyName,
          address: value.address,
          propertyType: value.propertyType,
          nextInspectionDate: value.nextInspection ? value.nextInspection.toISOString() : undefined,
          propertyManagerId: value.propertyManagerId,
        }).unwrap()
        handleOpenChange(false)

        toast.message(res.message ?? 'Property created succefuull')
      } catch (error) {
        toast.error('Failed to crate property!', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {children && !trigger && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-235" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Create New Property</DialogTitle>
          <DialogDescription className="mt-2 text-center">
            Set up a dashboard to manage inspections, and all property reports.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="grid grid-cols-2 gap-4">
            <FormInputField<CreatePropertyForm>
              form={form}
              required
              name="propertyName"
              label="Property Name"
              placeholder="Enter platform name"
            />

            <FormInputField<CreatePropertyForm>
              form={form}
              required
              name="address"
              label="Address"
              placeholder="Enter Address"
            />

            <FormSelectField<CreatePropertyForm, IPropertyType>
              form={form}
              name="propertyType"
              label="Property Type"
              placeholder="Select property type"
              options={[
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Residential', value: 'Residential' },
                { label: 'Industrial', value: 'Industrial' },
                { label: 'Mixed Use', value: 'Mixed Use' },
              ]}
            />

            <form.Field name="nextInspection">
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Next Inspection</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="w-full">
                        <Button
                          type="button"
                          variant="outline"
                          data-empty={!field.state.value}
                          className="data-[empty=true]:text-muted-foreground h-auto w-full justify-between rounded-[12px] py-4 text-left font-normal"
                        >
                          {field.state.value ? (
                            format(field.state.value, 'PPP')
                          ) : (
                            <span>Set a date for next Inspection</span>
                          )}
                          <CalenderIcon />
                        </Button>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(date) => field.handleChange(date)}
                        defaultMonth={field.state.value}
                      />
                    </PopoverContent>
                  </Popover>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="propertyManagerId">
              {(field) => (
                <Field
                  className="col-span-full"
                  data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                >
                  <FieldLabel htmlFor={field.name}>Assign Property manager</FieldLabel>
                  <AssignManagerDropdown
                    label={<FieldLabel htmlFor={field.name}>Assign Property manager</FieldLabel>}
                    onSelect={(user) => field.handleChange(user.id)}
                    selectedUserId={field.state.value}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" size="lg" className="flex-1" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" size="lg" className="flex-1">
              {isLoading && <Spinner />}
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
