'use client'

import { Edit } from '@/components/icons/Edit'
import PlusIcon from '@/components/icons/PlusIcon'
import HealthStatusThresholdsSetup from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/HealthStatusThresholdsSetup'
import InputAndChecklistSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/InputAndChecklistSetupForm'
import PriorityRepairPlanningSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/PriorityRepairPlanningSetupForm'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { useChecklistAndMediaTabName } from '@/components/pages/InspectionReport/InspectionReportTab/InspectionReportTab'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function InspectionCriteriaPage() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()

  const [editMode, setEditMode] = useState(false)

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-heading text-2xl font-semibold">Inspection Criteria Setup</h1>
          <p className="text-gray-black-300 mt-2 text-base">
            Configure inspection categories and their point values
          </p>

          <div className="mt-4">
            <TabSwitcher
              selected={isMediaFilesTab ? 1 : 0}
              onSelect={() => {
                switchTab(currentTab)
              }}
            />
          </div>
        </div>

        {isMediaFilesTab ? (
          <Button variant="outline">
            <PlusIcon />
            Add More Supporting Media & Documents
          </Button>
        ) : (
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setEditMode((v) => !v)}
                  className="rounded-full border"
                  variant="muted"
                  size="icon-lg"
                >
                  <Edit />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">
                <p>Change existing Input field labels and points</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      <section
        style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
        className="@container/form mt-5"
      >
        <InputAndChecklistSetupForm editMode={editMode} />
        <div className="mt-5 grid gap-4 @3xl:grid-cols-2 @3xl:gap-6">
          <PriorityRepairPlanningSetupForm />
          <HealthStatusThresholdsSetup />
        </div>
      </section>

      <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <InspectionMediaForm />
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button size="xl" variant="outline">
          Go Back
        </Button>
        <Button
          onClick={() => {
            if (!isMediaFilesTab) switchTab(currentTab)
          }}
          size="xl"
          variant="default"
        >
          {isMediaFilesTab ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
