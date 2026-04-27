'use client'

import { useGetAllInspectionCriteriaQuery } from '@/api/inspectionManagement/criteriaManagementApi'
import { Edit } from '@/components/icons/Edit'
import HealthStatusThresholdsSetup from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/HealthStatusThresholdsSetup'
import PriorityRepairPlanningSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/PriorityRepairPlanningSetupForm'
import SetupInputAndChecklistForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/SetupInputAndChecklistForm'
import SetupMediaAndDocumentFrom from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/SetupMediaAndDocumentFrom'
import { useChecklistAndMediaTabName } from '@/components/pages/InspectionReport/InspectionReportDetail/InspectionReportDetail'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { IInspectionCriteria } from '@/types/criteria'
import { Save } from 'lucide-react'
import { Suspense, useState } from 'react'

export default function InspectionCriteriaHome() {
  return (
    <Suspense fallback={<div />}>
      <InspectionCriteriaHomeContent />
    </Suspense>
  )
}

export function InspectionCriteriaHomeContent() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()
  const [isEditMode, setIsEditMode] = useState(false)

  const { data: { data } = {}, isLoading } = useGetAllInspectionCriteriaQuery()
  const currentCriteria: IInspectionCriteria | undefined = Array.isArray(data) ? data[0] : undefined

  return (
    <div className="bg-normal-25 border-hover-50 relative min-h-screen rounded-2xl border px-4.5 py-5">
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

        <div className="flex items-center gap-2">
          <div id="open-media-modal"></div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsEditMode((v) => !v)}
                className="rounded-full border"
                variant="muted"
                size="icon-lg"
              >
                {isEditMode ? <Save className="size-5" /> : <Edit className="size-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">
              <p>
                {isEditMode
                  ? 'Exit edit mode & save chnges'
                  : 'Change existing Input field labels and points'}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {isLoading ? (
        <div className="absolute top-2/5 left-1/2 -translate-1/2">
          <Spinner className="size-6" />
        </div>
      ) : (
        <>
          {/* Checklist Tab */}
          <section
            style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
            className="@container/form mt-5"
          >
            <SetupInputAndChecklistForm
              id={currentCriteria?.id}
              currentCriteria={currentCriteria}
              isEditable={isEditMode}
            />
            <div className="mt-5 grid gap-4 @3xl:grid-cols-2 @3xl:gap-6">
              <PriorityRepairPlanningSetupForm />
              <HealthStatusThresholdsSetup
                criteriaId={currentCriteria?.id}
                healthThresholdConfig={currentCriteria?.healthThresholdConfig}
              />
            </div>
          </section>

          {/* Media Files Tab */}
          <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
            <SetupMediaAndDocumentFrom
              isEditable={isEditMode}
              criteriaId={currentCriteria?.id}
              mediaFields={currentCriteria?.mediaFields}
            />
          </section>
        </>
      )}

      {/* <div className="mt-6 grid gap-3 sm:grid-cols-2"> */}
      {/*   <Button size="xl" variant="outline"> */}
      {/*     Go Back */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     onClick={() => { */}
      {/*       if (!isMediaFilesTab) switchTab(currentTab) */}
      {/*     }} */}
      {/*     size="xl" */}
      {/*     variant="default" */}
      {/*   > */}
      {/*     {isMediaFilesTab ? 'Submit' : 'Next'} */}
      {/*   </Button> */}
      {/* </div> */}
    </div>
  )
}
