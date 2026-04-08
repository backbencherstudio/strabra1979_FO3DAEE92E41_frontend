'use client'

import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { useGetSingleInspectionWithIdQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import FullPageSpinner from '@/components/reusable/FullPageSpinner/FullPageSpinner'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { createQueryParams } from '@/lib/farmatters'
import { IDashboardInspectionListItem } from '@/types'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

const DEFAULT_INSPECTION_DATA = { data: {} as IDashboardInspectionListItem | undefined }

export default function InspectionReportDetail() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()

  const searchParams = useSearchParams()
  const params = useParams<{ dashboardId: string }>()

  // Get ids from params
  const dashboardId = params.dashboardId
  const isEditable = searchParams.get('edit') === 'true'
  const inspectionId = searchParams.get('inspectionId')
  const scheduledInspectionId = searchParams.get('scheduledInspectionId')

  console.table({ dashboardId, inspectionId, scheduledInspectionId })
  console.log('page info ===========================')

  // Fetch data
  const { data: { data: formConfig } = {}, isLoading: isFormConfigLoading } =
    useGetPropertyInspectionFormQuery(dashboardId, { skip: !dashboardId })
  const { data: { data: inspectinData } = DEFAULT_INSPECTION_DATA, isLoading: isInspectinLoading } =
    useGetSingleInspectionWithIdQuery(inspectionId!, { skip: !inspectionId })

  if (isFormConfigLoading || isInspectinLoading) {
    return <FullPageSpinner />
  }

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl uppercase">
        Liberty Shield Roof Health Inspection
      </h1>
      <div className="mt-2 flex justify-center gap-1 text-base font-medium">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">{inspectionId}</span>
      </div>
      <div className="mt-4 flex justify-center">
        <TabSwitcher
          selected={isMediaFilesTab ? 1 : 0}
          onSelect={() => {
            switchTab(currentTab)
          }}
        />
      </div>

      {/* checklist view */}
      <section
        style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
        className="@container/form mt-5"
      >
        <InspectionReportForm
          isEditable={isEditable}
          key={inspectinData?.id}
          formConfig={formConfig}
          inspectionData={inspectinData}
        />
        <section className="mt-5 grid items-start gap-4 @3xl:grid-cols-2 @3xl:gap-6">
          <PriorityRepairPlanningForm
            isEditable={isEditable}
            initialItems={inspectinData?.repairItems}
          />
          <InspectionReportFinalScoreCard
            score={inspectinData?.overallScore}
            healthLabel={inspectinData?.healthLabel}
            remainingLife={inspectinData?.remainingLife}
            config={formConfig?.form.healthThresholdConfig}
          />
        </section>
      </section>

      {/* media form view */}
      <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <InspectionMediaForm />
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button type="button" size="xl" variant="outline">
          Save
        </Button>
        <Button
          type="button"
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

export function useChecklistAndMediaTabName() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get('tab')
  const isMediaFilesTab = currentTab === 'media-files'

  const switchTab = (tab: string | null) => {
    // Get all existing query params
    const updatedParams = new URLSearchParams(searchParams.toString())
    const nextTab = tab == 'media-files' ? 'checklist' : 'media-files'
    updatedParams.set('tab', nextTab)

    // Replace the URL, preserving all existing query parameters
    router.replace(`?${updatedParams.toString()}`)
  }

  return { isMediaFilesTab, switchTab, currentTab }
}
