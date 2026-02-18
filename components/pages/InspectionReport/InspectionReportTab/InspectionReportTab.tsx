'use client'

import InspectionMediaForm from '@/components/pages/InspectionReport/InspectionMediaForm/InspectionMediaForm'
import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import TabSwitcher from '@/components/reusable/TabSwitcher/TabSwitcher'
import { Button } from '@/components/ui/button'
import { createQueryParams } from '@/lib/farmatters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function InspectionReportTab() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = searchParams.get('tab')
  const isMediaFilesTab = currentTab === 'media-files'

  const switchTab = (tab: string | null) => {
    const nextTab = tab == 'checklist' ? 'media-files' : 'checklist'
    router.replace(`${pathname}/${createQueryParams({ tab: nextTab })}`)
  }

  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl">LIBERTY SHIELD ROOF HEALTH INSPECTION</h1>
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

      <section style={{ display: !isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <InspectionReportForm />
        <div className="mt-4 grid grid-cols-2 gap-6">
          <PriorityRepairPlanningForm />
          <InspectionReportFinalScoreCard />
        </div>
      </section>

      <section style={{ display: isMediaFilesTab ? 'block' : 'none' }} className="mt-5">
        <InspectionMediaForm />
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
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
