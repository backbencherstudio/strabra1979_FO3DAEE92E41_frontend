'use client'

import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { useGetSingleInspectionWithIdQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import {
  useGetInspectionPropertyDetailQuery,
  useSaveAllInspectionFormDataAsDraftMutation,
  useSubmitAllInspectionFormDataMutation,
  useUpdateAllInspectionFormDataFromAdminMutation,
} from '@/api/inspectionManagement/operationalInspectionApi'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import FullPageSpinner from '@/components/reusable/FullPageSpinner/FullPageSpinner'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { routes } from '@/constant'
import { getErrorMessage, withNA } from '@/lib/farmatters'
import { useAuth } from '@/redux/features/auth/useAuth'
import {
  clearInspectionForm,
  selectInspectionAdditionalComments,
  selectInspectionHeaderData,
  selectInspectionNteValue,
  selectInspectionRepairItems,
  selectInspectionScores,
  setDefaultInspectionFormData,
} from '@/redux/features/inspectionForm/inspectionFormSlice'
import { store, useAppDispatch } from '@/redux/store'
import {
  EmbedFieldsData,
  IDashboardInspectionListItem,
  MediaFieldKeyType,
  RoleUtils,
} from '@/types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { MediaUploadResponse, PreviewFile } from '../InspectionMediaForm/MultipartUpload'

const DEFAULT_INSPECTION_DATA = { data: {} as IDashboardInspectionListItem | undefined }

export default function InspectionReportDetail() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()
  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()
  const params = useParams<{ dashboardId: string }>()
  const router = useRouter()

  const { role } = useAuth()
  const isUserOperational = RoleUtils.isOperational(role)
  const isUserAdmin = RoleUtils.isAdmin(role)

  // Get ids from parameters
  const dashboardId = params.dashboardId
  const isEditable = searchParams.get('edit') === 'true'
  const inspectionId = searchParams.get('inspectionId')
  const scheduledInspectionId = searchParams.get('scheduledInspectionId')

  // Fetch data
  const { data: { data: formConfig } = {}, isLoading: isFormConfigLoading } =
    useGetPropertyInspectionFormQuery(dashboardId, { skip: !dashboardId })

  const { data: { data: propertyInfo } = {}, isLoading: isPropertyInfoLoading } =
    useGetInspectionPropertyDetailQuery({ dashboardId }, { skip: !dashboardId })

  const { data: inspectionResponse, isLoading: isInspectinLoading } =
    useGetSingleInspectionWithIdQuery({
      inspectionId: inspectionId!,
      scheduledInspectionId: scheduledInspectionId!,
    })

  const inspectinData = useMemo<IDashboardInspectionListItem>(
    () => inspectionResponse?.data ?? ({} as IDashboardInspectionListItem),
    [inspectionResponse],
  )

  // Media inputs
  const [embedFields, setEmbedFields] = useState<EmbedFieldsData>({})
  // const [mediaFields, setMediaFields] = useState<MediaFieldItem[]>([])
  const [newlyAddedMediaFields, setNewlyAddedMediaFields] = useState<
    { data: MediaUploadResponse; fieldKey: MediaFieldKeyType }[]
  >([])
  const removedMediaFields = useRef<string[]>([])
  async function handleRemoveMediaFile(file: PreviewFile) {
    if (file.id) {
      removedMediaFields.current.push(file.id)
    }
  }

  const handleInspectinDataChangeFromServer = useEffectEvent(
    (data: IDashboardInspectionListItem) => {
      dispatch(setDefaultInspectionFormData(data))

      if (data?.mediaFiles) {
        // const mediaFieldData: MediaFieldItem[] = []
        const embedFieldsData: EmbedFieldsData = {}

        data.mediaFiles.forEach((file) => {
          if (file.fileType === 'EMBED') {
            embedFieldsData[file.mediaFieldKey] = file.url
          }
        })

        setEmbedFields(embedFieldsData)
      }
    },
  )

  useEffect(() => {
    if (inspectinData && formConfig) {
      handleInspectinDataChangeFromServer(inspectinData)
    }

    return () => {
      dispatch(clearInspectionForm())
    }
  }, [inspectinData, formConfig, dispatch])

  const [submitAllInspectionFormData, { isLoading: isLoadingInspectionFormData }] =
    useSubmitAllInspectionFormDataMutation()
  const [saveAllInspectionFormDataAsDraft, { isLoading: isLoadingSaveInspectionFormDataAsDraft }] =
    useSaveAllInspectionFormDataAsDraftMutation()
  const [updateAllInspectionFormDataFromAdmin, { isLoading: isLoadingInspectionUpdate }] =
    useUpdateAllInspectionFormDataFromAdminMutation()

  async function handleSubmitInspectionData(type: 'draft' | 'submit') {
    if (
      isLoadingSaveInspectionFormDataAsDraft ||
      isLoadingInspectionFormData ||
      isLoadingInspectionUpdate
    ) {
      return
    }

    const state = store.getState()

    const payload = {
      headerData: selectInspectionHeaderData(state),
      scores: selectInspectionScores(state),
      repairItems: selectInspectionRepairItems(state),
      nteValue: selectInspectionNteValue(state),
      additionalComments: selectInspectionAdditionalComments(state),
      inspectedAt: new Date().toISOString(),
      embedFields,
      mediaSessions: newlyAddedMediaFields.map((item) => ({
        sessionId: item.data.sessionId,
        mediaFieldKey: item.fieldKey,
      })),
    }

    try {
      if (isUserOperational) {
        const mutation =
          type === 'draft' ? saveAllInspectionFormDataAsDraft : submitAllInspectionFormData

        const res = await mutation({
          dashboardId: dashboardId!,
          scheduledInspectionId: scheduledInspectionId!,
          data: payload,
        }).unwrap()

        router.push(routes.operational.inspectionList)

        toast.success(
          res.message ||
            (type === 'draft' ? 'Draft saved successfully' : 'Inspection submitted successfully'),
        )
      } else if (isUserAdmin) {
        const res = await updateAllInspectionFormDataFromAdmin({
          inspectionId: inspectionId!,
          data: {
            ...payload,
            removeMediaFileIds: Array.isArray(removedMediaFields.current)
              ? removedMediaFields.current
              : undefined,
          },
        }).unwrap()

        router.push(routes.admin.inspectionList)

        toast.success(res.message || 'Inspection updated successfully')
      }
    } catch (err) {
      toast.error(type === 'draft' ? 'Failed to save draft' : 'Failed to submit inspection', {
        description: getErrorMessage(err),
      })
    }
  }

  const submitButtonText = (() => {
    if (isLoadingInspectionFormData) return 'Submitting...'
    if (isLoadingInspectionUpdate) return 'Updating...'
    if (isMediaFilesTab) return 'Submit'

    return 'Next'
  })()

  if (isFormConfigLoading || isInspectinLoading) {
    return <FullPageSpinner />
  }
  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl uppercase">
        {propertyInfo?.property.name ?? ''}
      </h1>
      <div className="mt-2 flex justify-center gap-1 text-base font-medium">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">{withNA(inspectionId)}</span>
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
          <PriorityRepairPlanningForm isEditable={isEditable} />
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
        <InspectionMediaForm
          disabled={!isEditable}
          serverMediaFiles={inspectinData?.mediaFiles ?? []}
          onMediaUpload={(data, fieldKey) => {
            setNewlyAddedMediaFields((prev) => {
              if (!prev) return [{ data, fieldKey }]
              return [...prev, { data, fieldKey }]
            })
          }}
          onDelete={handleRemoveMediaFile}
          onOpenEditModal={() => {}}
          embedFields={embedFields}
          setEmbedFields={setEmbedFields}
          mediaFields={formConfig?.form.mediaFields}
        />
      </section>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row *:sm:flex-1">
        {isUserOperational ? (
          <Button
            disabled={isLoadingSaveInspectionFormDataAsDraft}
            onClick={() => handleSubmitInspectionData('draft')}
            type="button"
            size="xl"
            variant="outline"
          >
            {isLoadingSaveInspectionFormDataAsDraft ? 'Saving...' : 'Save Draft'}
          </Button>
        ) : null}
        <Button
          disabled={isLoadingInspectionFormData || isLoadingInspectionUpdate}
          type="button"
          onClick={() => {
            if (!isMediaFilesTab) {
              switchTab(currentTab)
            } else {
              handleSubmitInspectionData('submit')
            }
          }}
          size="xl"
          variant="default"
        >
          {isLoadingInspectionFormData || isLoadingInspectionUpdate ? <Spinner /> : null}
          {submitButtonText}
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
    // Get all existing query parameters
    const updatedParams = new URLSearchParams(searchParams.toString())
    const nextTab = tab == 'media-files' ? 'checklist' : 'media-files'
    updatedParams.set('tab', nextTab)

    // Replace the URL, preserving all existing query parameters
    router.replace(`?${updatedParams.toString()}`)
  }

  return { isMediaFilesTab, switchTab, currentTab }
}
