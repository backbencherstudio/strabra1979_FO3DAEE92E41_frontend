'use client'

import RepairPlanStatusBadge, {
  RepairProgressStatus,
} from '@/components/dashboard/ProgressStatusBadge/RepairPlanStatusBadge'
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
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const tabs = ['All', 'Urgent', 'Maintenance', 'Replacement Planning'] as const

export type RepairTab = (typeof tabs)[number]

export default function PriorityRepairPlanningForm() {
  const [currentTab, setTab] = useState<RepairTab>('All')

  return (
    <div className="border-input rounded-2xl border px-4 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Add Priority Repair Planning</h3>
        <Button className="rounded-full" size="icon-md">
          <PlusIcon />
        </Button>
      </div>

      <div className="mt-5 flex gap-2">
        {tabs.map((t) => (
          <Button
            onClick={() => setTab(t)}
            variant="ghost"
            className={cn(
              'px-3',
              t === currentTab
                ? `bg-foundation-light-blue hover:bg-foundation-light-blue text-primary hover:text-primary`
                : 'text-gray-black-300 hover:text-gray-black-300',
            )}
            size="sm"
            key={t}
          >
            {t} (0)
          </Button>
        ))}
      </div>

      <div className="mt-3 space-y-4">
        <Plan
          title="Drainage & Ponding "
          status="URGENT"
          description="
        The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface
        aging, and localized deterioration were observed in selected areas. No active leaks were
        observed at the time of inspection. However, moisture stains / vulnerable joints were noted,
        indicating potential leak risks if left unaddressed.
      "
        />
      </div>

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
    </div>
  )
}

interface PlanProps {
  title: string
  description: string
  status: RepairProgressStatus
}

function Plan({ title, description, status }: PlanProps) {
  return (
    <div className="border-input rounded-md border bg-white p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <RepairPlanStatusBadge status={status} />
      </div>

      <div className="mt-4 text-sm">{description}</div>
    </div>
  )
}
