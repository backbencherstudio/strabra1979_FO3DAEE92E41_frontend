'use client'

import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import FormInputField from '@/components/form/form-input-field'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getErrorMessage } from '@/lib/farmatters'
import { generateId } from '@/lib/utils'
import {
  addRepairItem,
  selectInspectionRepairItems,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { useAppDispatch } from '@/redux/store'
import { REPAIR_PROGRESS_STATUSES } from '@/types'
import { useForm } from '@tanstack/react-form'
import { PlusIcon } from 'lucide-react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import z from 'zod'
import PiorityRepairPlanList, {
  PiorityRepairPlanListRef,
} from '../PiorityRepairPlan/PiorityRepairPlanList'

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
            id: generateId(),
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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Add Priority Repair Planning</h3>
        {isEditable ? (
          <Button onClick={() => form.handleSubmit()} className="rounded-full" size="icon-md">
            <PlusIcon />
          </Button>
        ) : null}
      </div>

      <PiorityRepairPlanList isEditable={isEditable} ref={listRef} items={items} />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
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
