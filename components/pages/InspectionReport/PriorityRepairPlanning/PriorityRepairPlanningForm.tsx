'use client'

import { useRef } from 'react'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { REPAIR_PROGRESS_STATUSES } from '@/types'
import PiorityRepairPlanList, {
  PiorityRepairPlanListRef,
} from '../PiorityRepairPlan/PiorityRepairPlanList'
import { useSelector } from 'react-redux'
import {
  addRepairItem,
  selectInspectionRepairItems,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { useAppDispatch } from '@/redux/store'
import z from 'zod'
import { getErrorMessage } from '@/lib/farmatters'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import FormInputField from '@/components/form/form-input-field'
import { PlusIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'

interface PriorityRepairPlanningFormProps {
  isEditable?: boolean
}

export const repairItemScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum(REPAIR_PROGRESS_STATUSES), // required
  description: z.string(),
})

export type RepairItemFormValues = z.infer<typeof repairItemScheme>

export default function PriorityRepairPlanningForm({
  isEditable,
}: PriorityRepairPlanningFormProps) {
  const items = useSelector(selectInspectionRepairItems)
  const dispatch = useAppDispatch()
  const listRef = useRef<PiorityRepairPlanListRef>(null)

  const form = useForm({
    defaultValues: {
      title: '',
      status: 'Maintenance' as RepairItemFormValues['status'],
      description: '',
    },
    validators: {
      onSubmit: repairItemScheme,
    },
    onSubmit: async ({ value }) => {
      try {
        dispatch(
          addRepairItem({
            id: crypto.randomUUID(),
            title: value.title,
            status: value.status,
            description: value.description,
          }),
        )
        form.reset()
        setTimeout(() => listRef.current?.scrollToBottom(), 100)
      } catch (error) {
        toast.error('Failed to add repair item', {
          description: getErrorMessage(error),
        })
      }
    },
  })

  return (
    <SectionCard>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Add Priority Repair Planning</h3>

          <Button type="submit" className="rounded-full" size="icon-md">
            <PlusIcon />
          </Button>
        </div>

        <PiorityRepairPlanList ref={listRef} items={items} />

        {isEditable ? (
          <section className="mt-4 space-y-1.5">
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
                      className="min-h-14"
                      placeholder="Add Details"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                  </InputGroup>
                </Field>
              )}
            </form.Field>
          </section>
        ) : null}
      </form>
    </SectionCard>
  )
}
