'use client'

import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { useGetSingleInspectionWithIdQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import { useSubmitAllInspectionFormDataMutation } from '@/api/inspectionManagement/operationalInspectionApi'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import FullPageSpinner from '@/components/reusable/FullPageSpinner/FullPageSpinner'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/farmatters'
import {
  selectInspectionAdditionalComments,
  selectInspectionHeaderData,
  selectInspectionMediaFiles,
  selectInspectionNteValue,
  selectInspectionRepairItems,
  selectInspectionScores,
  setDefaultInspectionFormData,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { store, useAppDispatch } from '@/redux/store'
import { IDashboardInspectionListItem } from '@/types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const DEFAULT_INSPECTION_DATA = { data: {} as IDashboardInspectionListItem | undefined }

export default function InspectionReportDetail() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()
  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()
  const params = useParams<{ dashboardId: string }>()

  // Get ids from params
  const dashboardId = params.dashboardId
  const isEditable = searchParams.get('edit') === 'true'
  const inspectionId = searchParams.get('inspectionId')
  const scheduledInspectionId = searchParams.get('scheduledInspectionId')

  console.table({ dashboardId, inspectionId, scheduledInspectionId })
  console.log('page info ===========================')

  const [submitAllInspectionFormData, { isLoading: isLoadingInspectionFormData }] =
    useSubmitAllInspectionFormDataMutation()
  // Fetch data
  const { data: { data: formConfig } = {}, isLoading: isFormConfigLoading } =
    useGetPropertyInspectionFormQuery(dashboardId, { skip: !dashboardId })
  const { data: { data: inspectinData } = DEFAULT_INSPECTION_DATA, isLoading: isInspectinLoading } =
    useGetSingleInspectionWithIdQuery(inspectionId!, { skip: !inspectionId })

  useEffect(() => {
    if (inspectinData) {
      dispatch(setDefaultInspectionFormData(inspectinData))
    }
  }, [dispatch, inspectinData])

  if (isFormConfigLoading || isInspectinLoading) {
    return <FullPageSpinner />
  }

  const defaultData = {
    headerData: { inspectionTitle: '2024 Annual Roof Inspection', propertyType: 'Commercial' },
    scores: { surfaceCondition: { score: 22, notes: 'Minor cracks observed' } },
    repairItems: [
      { title: 'Emergency Leak Repair', status: 'Urgent', description: 'Moisture stains...' },
    ],
    nteValue: 7500,
    additionalComments: 'No active leaks at time of inspection.',
    inspectedAt: '2024-06-15T09:00:00.000Z',
    mediaFieldKeys: ['mediaFiles'],
  }

  async function handleSubmitInspectionData() {
    const state = store.getState()
    const headerData = selectInspectionHeaderData(state)
    const scores = selectInspectionScores(state)
    const repairItems = selectInspectionRepairItems(state)
    const nteValue = selectInspectionNteValue(state)
    const additionalComments = selectInspectionAdditionalComments(state)
    const mediaFiles = selectInspectionMediaFiles(state)

    const inspectedAt = new Date().toISOString()

    try {
      const res = await submitAllInspectionFormData({
        dashboardId: dashboardId!,
        scheduledInspectionId: scheduledInspectionId!,
        data: {
          headerData,
          scores,
          repairItems,
          nteValue,
          additionalComments,
          inspectedAt: inspectedAt,
          mediaFieldKeys: [],
        },
        files: mediaFiles,
      }).unwrap()

      toast.success(res.message || 'Success message')
    } catch (err) {
      toast.error('Error title', {
        description: getErrorMessage(err),
      })
    }
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
            // initialItems={inspectinData?.repairItems}
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
          disabled={isLoadingInspectionFormData}
          type="button"
          onClick={() => {
            if (!isMediaFilesTab) {
              switchTab(currentTab)
            } else {
              handleSubmitInspectionData()
            }
          }}
          size="xl"
          variant="default"
        >
          {isLoadingInspectionFormData ? <Spinner /> : null}
          {isLoadingInspectionFormData ? 'Submitting...' : isMediaFilesTab ? 'Submit' : 'Next'}
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
