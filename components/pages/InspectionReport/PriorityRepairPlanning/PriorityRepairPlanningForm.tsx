'use client'

import RepairPlanStatusBadge from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PlusIcon } from 'lucide-react'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import PiorityRepairPlanList from '@/components/pages/InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'

export default function PriorityRepairPlanningForm() {
  return (
    <SectionCard>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Add Priority Repair Planning</h3>
        <Button className="rounded-full" size="icon-md">
          <PlusIcon />
        </Button>
      </div>

      <PiorityRepairPlanList />

      <form className="mt-4 space-y-1.5">
        <Field>
          <InputGroup>
            <InputGroupInput placeholder="Add Title" />
          </InputGroup>
        </Field>

        <Field>
          <Select>
            <SelectTrigger id="select-status">
              <SelectValue placeholder="Select Urgency Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Urgent">
                  <RepairPlanStatusBadge status="URGENT" />
                </SelectItem>
                <SelectItem value="Maintenance">
                  <RepairPlanStatusBadge status="MAINTENANCE" />
                </SelectItem>
                <SelectItem value="Replacement Planning">
                  <RepairPlanStatusBadge status="REPLACEMENT_PLANNING" />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <InputGroup>
            <InputGroupTextarea className="min-h-14" placeholder="Add Details" />
          </InputGroup>
        </Field>
      </form>
    </SectionCard>
  )
}
