'use client'

import { useGetAllInspectionCriteriaQuery } from '@/api/inspectionManagement/criteriaManagement'
import { Edit } from '@/components/icons/Edit'
import PlusIcon from '@/components/icons/PlusIcon'
import HealthStatusThresholdsSetup from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/HealthStatusThresholdsSetup'
import PriorityRepairPlanningSetupForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/PriorityRepairPlanningSetupForm'
import SetupInputAndChecklistForm from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/SetupInputAndChecklistForm'
import SetupMediaAndDocumentFrom from '@/components/pages/InspectionCriteria/InspectionCriteriaSetupForm/SetupMediaAndDocumentFrom'
import { useChecklistAndMediaTabName } from '@/components/pages/InspectionReport/InspectionReportDetail/InspectionReportDetail'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { IInspectionCriteria } from '@/types/criteria'
import { Save } from 'lucide-react'
import React, { Suspense } from 'react'
import { useState } from 'react'

export default function InspectionCriteriaHome() {
  return (
    <Suspense fallback={<div />}>
      <InspectionCriteriaHomeContent />
    </Suspense>
  )
}

export function InspectionCriteriaHomeContent() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()

  const [editMode, setEditMode] = useState(false)

  const [openCreateFileAndDocFieldsModal, setOpenCreateFileAndDocFieldsModal] =
    React.useState(false)
  const handleCreateFieldOpen = () => {
    setOpenCreateFileAndDocFieldsModal((v) => !v)
  }

  const { data: { data } = {}, isLoading } = useGetAllInspectionCriteriaQuery()
  const currentCriteria: IInspectionCriteria | undefined = Array.isArray(data) ? data[0] : undefined
  console.log(currentCriteria, "0df0d0f0d0f0df")

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
          <Button onClick={() => handleCreateFieldOpen()} variant="outline">
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
                  {editMode ? <Save className="size-5" /> : <Edit className="size-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">
                <p>
                  {editMode
                    ? 'Exit edit mode & save chnges'
                    : 'Change existing Input field labels and points'}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      <section
        style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
        className="@container/form mt-5"
      >
        <SetupInputAndChecklistForm id={currentCriteria?.id} currentCriteria={currentCriteria} isEditable={editMode} />
        <div className="mt-5 grid gap-4 @3xl:grid-cols-2 @3xl:gap-6">
          <PriorityRepairPlanningSetupForm />
          <HealthStatusThresholdsSetup />
        </div>
      </section>

      <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <SetupMediaAndDocumentFrom
          createModalOpts={{
            open: openCreateFileAndDocFieldsModal,
            onOpenChange: setOpenCreateFileAndDocFieldsModal,
          }}
        />
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
