'use client'

import { useGetPropertyInspectionFormQuery } from '@/api/inspectionManagement/inspectionFormApi'
import { useGetSingleInspectionWithIdQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { createQueryParams } from '@/lib/farmatters'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function InspectionReportTab() {
  const { isMediaFilesTab, switchTab, currentTab } = useChecklistAndMediaTabName()
  const params = useParams()
  const inspectionId = params.inspectionId as string
  const { data: { data: formConfig } = {}, isLoading: isFormLoading } =
    useGetPropertyInspectionFormQuery('cmne1xe9p0001s4u8ua22cmm9')
  const { data: { data: inspectinData } = {} } = useGetSingleInspectionWithIdQuery(inspectionId, {
    skip: !inspectionId,
  })

  // const { data: { data: inspectionData } = {}, isLoading: isInspectionLoading } =
  //   useGetSingleInspectionWithIdQuery('cmne225eb000gs4u8ctiglq5k')
  // console.table(inspectinData?.scores)
  // console.log(inspectinData?.scores)

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl uppercase">
        Liberty Shield Roof Health Inspection
      </h1>
      <div className="mt-2 flex justify-center gap-1 text-base font-medium">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">INS2323</span>
      </div>
      <div className="mt-4 flex justify-center">
        <TabSwitcher
          selected={isMediaFilesTab ? 1 : 0}
          onSelect={() => {
            switchTab(currentTab)
          }}
        />
      </div>

      <section
        style={{ display: !isMediaFilesTab ? 'block' : 'none' }}
        className="@container/form mt-5"
      >
        <InspectionReportForm formConfig={formConfig} inspectionData={inspectinData} />
        <div className="mt-5 grid gap-4 @3xl:grid-cols-2 @3xl:gap-6">
          {/* <PriorityRepairPlanningForm /> */}
          {/* <InspectionReportFinalScoreCard score={60} /> */}
        </div>
      </section>

      <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <InspectionMediaForm />
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button size="xl" variant="outline">
          Save
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

export function useChecklistAndMediaTabName() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = searchParams.get('tab')
  const isMediaFilesTab = currentTab === 'media-files'

  const switchTab = (tab: string | null) => {
    const nextTab = tab == 'media-files' ? 'checklist' : 'media-files'
    router.replace(`${pathname}/${createQueryParams({ tab: nextTab })}`)
  }

  return { isMediaFilesTab, switchTab, currentTab }
}
