'use client'

import { Edit } from '@/components/icons/Edit'
import PlusIcon from '@/components/icons/PlusIcon'
import EditInputFeilds from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/EditInputFeilds/EditInputFeilds'
import HealthStatusThresholdsSetup from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/HealthStatusThresholdsSetup'
import InputAndChecklistSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/InputAndChecklistSetupForm'
import PriorityRepairPlanningSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/PriorityRepairPlanningSetupForm'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import { useChecklistAndMediaTabName } from '@/components/pages/InspectionReport/InspectionReportTab/InspectionReportTab'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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

        {/* <Tooltip> */}
        {/*   <TooltipTrigger asChild> */}
        {/* <Button className="rounded-full border" variant="muted" size="icon-lg"> */}
        {/*   <Edit /> */}
        {/* </Button> */}
        {/*   </TooltipTrigger> */}
        {/*   <TooltipContent align="end"> */}
        {/*     <p>Change existing Input field labels and points</p> */}
        {/*   </TooltipContent> */}
        {/* </Tooltip> */}

        {isMediaFilesTab ? (
          <Button variant="outline">
            <PlusIcon />
            Add More Supporting Media & Documents
          </Button>
        ) : (
          <div>
            <EditInputFeilds
              title="Edit Input fileds"
              trigger={
                <Button className="rounded-full border" variant="muted" size="icon-lg">
                  <Edit />
                </Button>
              }
            >
              <Field>
                <FieldLabel htmlFor="name">Property</FieldLabel>
                <InputGroup className="border-b">
                  <InputGroupInput placeholder="Enter property name" />
                </InputGroup>
              </Field>
            </EditInputFeilds>
          </div>
        )}
      </div>

      <section
        style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
        className="@container/form mt-5"
      >
        <InputAndChecklistSetupForm />
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
