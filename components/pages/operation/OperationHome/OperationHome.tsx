'use client'

import { useGetOperatorOverviewQuery } from '@/api/dashboard/overviewApi'
import { useStartAScheduledInspectionToChangeStatusMutation } from '@/api/inspectionManagement/operationalInspectionApi'
import { OPERATIONAL_RECENT_INSPECTION_LIST_MANAGEMENT_COLUMS } from '@/components/columns/InspectionListManagement'
import { StatListItemProps } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import { CalenderSchedule } from '@/components/icons/Calender'
import { DocumentTick } from '@/components/icons/Doc'
import { SearchText } from '@/components/icons/SearchText'
import TodaysInspectionList from '@/components/pages/operation/InspectionList/InspectionList'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { getErrorMessage, withNAf } from '@/lib/farmatters'
import { IScheduledInspectionTableItem } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function OperationHome() {
  const router = useRouter()
  const {
    data: { data: { stats, recentInspections = [], todaysInspections } = {} } = {},
    isLoading,
  } = useGetOperatorOverviewQuery()

  const statsData: StatListItemProps[] = [
    {
      title: 'Today’s Inspection',
      value: withNAf(stats?.todayCount),
      icon: <SearchText />,
      subtitle: '',
    },
    {
      title: 'Total Assigned Inspection',
      value: withNAf(stats?.totalAssignedThisMonth),
      subtitle: 'This month',
      icon: <CalenderSchedule />,
    },
    {
      title: 'Completed',
      value: withNAf(stats?.completedThisMonth),
      subtitle: 'This month',
      icon: <DocumentTick />,
    },
  ]

  // Start inspection
  const [startAScheduledInspectionToChangeStatus] =
    useStartAScheduledInspectionToChangeStatusMutation()
  async function handleStartInspection({
    id,
    inspectionId,
    dashboardId,
    status,
  }: IScheduledInspectionTableItem) {
    if (!dashboardId) return

    if (status === 'ASSIGNED') {
      try {
        await startAScheduledInspectionToChangeStatus({ scheduledInspectionId: id }).unwrap()
      } catch (error) {
        return toast.error(getErrorMessage(error))
      }
    }

    const qp = {
      edit: 'true',
      ...(inspectionId && { inspectionId }),
      ...(id && { scheduledInspectionId: id }),
    }
    router.push(routes.operational.inspectionListItemDetail.build({ dashboardId }, qp))
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <StatsList isLoading={isLoading} stats={statsData} />
      <TodaysInspectionList
        isLoading={isLoading}
        title="Today's Inspections"
        data={todaysInspections}
        actionButton={(inspection) => (
          <Button
            disabled={!['ASSIGNED', 'IN_PROGRESS'].includes(inspection.status)}
            onClick={() => handleStartInspection(inspection)}
            variant="outline"
          >
            Start Inspection
          </Button>
        )}
      />

      <SectionCard className="space-y-4.5">
        <div className="flex items-center justify-between">
          <SectionTitle>Recent Inspections</SectionTitle>

          <Button asChild variant="link" theme="text">
            <Link href={routes.operational.inspectionList}>
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        {/* // TODO: view is not working */}
        <div>
          <CustomTable
            isLoading={isLoading}
            columns={OPERATIONAL_RECENT_INSPECTION_LIST_MANAGEMENT_COLUMS}
            data={recentInspections}
            minWidth={1000}
            headerStyles={{
              backgroundColor: '#eceff3',
              textColor: '#4a4c56',
              fontSize: '14px',
              fontWeight: '400',
              padding: '12px 16px',
            }}
            cellBorderColor="#eceff3"
            hasWrapperBorder={false}
            roundedClass="rounded-lg"
          />
        </div>
      </SectionCard>
    </div>
  )
}
