import InspectionReportFinalScoreCard from '@/components/pages/InspectionReport/InspectionReportFinalScoreCard/InspectionReportFinalScoreCard'
import InspectionReportForm from '@/components/pages/InspectionReport/InspectionReportForm/InspectionReportForm'
import PriorityRepairPlanningForm from '@/components/pages/InspectionReport/PriorityRepairPlanning/PriorityRepairPlanningForm'
import { Button } from '@/components/ui/button'

export default function InspectionReportPage() {
  return (
    <div className="bg-normal-25 border-hover-50 rounded-2xl border px-4.5 py-5">
      <h1 className="text-heading text-center text-2xl">LIBERTY SHIELD ROOF HEALTH INSPECTION</h1>
      <div className="mt-2 flex justify-center gap-1 text-base font-medium">
        <span className="text-gray-black-300">Inspection ID:</span>
        <span className="text-gray-black-400">INS2323</span>
      </div>
      <div className="mt-4 flex justify-center">
        {/* <TabSwitcher selected={selectedTab} onSelect={(v) => setSelectedTab(v)} /> */}
      </div>

      <InspectionReportForm />
      <div className="mt-4 grid grid-cols-2 gap-6">
        <PriorityRepairPlanningForm />
        <InspectionReportFinalScoreCard />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button size="xl" variant="outline">
          Save
        </Button>
        <Button size="xl" variant="default">
          Next
        </Button>
      </div>
    </div>
  )
}
