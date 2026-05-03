import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getErrorMessage } from '@/lib/farmatters'
import { cn } from '@/lib/utils'
import { updateRepairItem } from '@/redux/features/inspectionForm/inspectionFormSlice'
import { useAppDispatch } from '@/redux/store'
import { IPiorityRepairPlanItem } from '@/types'
import { useForm } from '@tanstack/react-form'
import React from 'react'
import { toast } from 'sonner'
import {
  RepairItemFormValues,
  repairItemScheme,
} from '../PriorityRepairPlanning/PriorityRepairPlanningForm'
import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import FormInputField from '@/components/form/form-input-field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldGroup } from '@/components/ui/field'

export type DialogProps = React.ComponentProps<typeof Dialog>

interface EditInputFeildsProps
  extends React.PropsWithChildren, React.ComponentProps<typeof Dialog> {
  initialData?: IPiorityRepairPlanItem
}

export function PiorityRepairPlanEditDialog({
  initialData,
  onOpenChange,
  ...props
}: EditInputFeildsProps) {
  const dispatch = useAppDispatch()

  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? '',
      status: initialData?.status ?? ('Maintenance' as RepairItemFormValues['status']),
      description: initialData?.description ?? '',
    },
    validators: {
      onSubmit: repairItemScheme,
    },
    onSubmit: async ({ value }) => {
      if (!initialData?.id) {
        toast.error('Invalid repair item id')
        return
      }

      try {
        dispatch(
          updateRepairItem({
            id: initialData.id,
            item: {
              id: initialData.id,
              title: value.title,
              status: value.status,
              description: value.description,
            },
          }),
        )
        form.reset()
        onOpenChange?.(false)
      } catch (error) {
        toast.error('Failed to update repair item', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-156')} showCloseButton={true}>
        <DialogHeader className="">
          <div className="flex items-center justify-between">
            <DialogTitle className={cn('text-foreground text-left text-xl font-medium')}>
              Edit Priority Repair Plan
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">Edit Priority Repair Plan</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="gap-3">
            <FormInputField<RepairItemFormValues>
              form={form}
              name="title"
              label=""
              placeholder="Add Title"
              required
            />

            <form.Field name="status">
              {(field) => (
                <Field>
                  <Select
                    value={field.state.value}
                    onValueChange={(v) => field.setValue(v as RepairItemFormValues['status'])}
                  >
                    <SelectTrigger id="select-status">
                      <SelectValue placeholder="Select Urgency Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Urgent">
                          <RepairPlanStatusBadge status="Urgent" />
                        </SelectItem>
                        <SelectItem value="Maintenance">
                          <RepairPlanStatusBadge status="Maintenance" />
                        </SelectItem>
                        <SelectItem value="Replacement Planning">
                          <RepairPlanStatusBadge status="Replacement Planning" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Field>
                  <InputGroup>
                    <InputGroupTextarea
                      className=""
                      placeholder="Add Details"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                  </InputGroup>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <DialogFooter className="grid grid-cols-2 gap-3 pt-4">
            <DialogClose asChild>
              <Button type="button" size="xl" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="xl">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
