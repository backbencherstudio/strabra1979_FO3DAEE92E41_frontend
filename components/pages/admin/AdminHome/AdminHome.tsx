'use client'

import { BuildingIcon } from '@/components/icons/BuildingIcon'
import { Calender2Icon } from '@/components/icons/Calender2Icon'
import InspectionList from '@/components/pages/operation/InspectionList/InspectionList'
import { ChevronRight, User2 } from 'lucide-react'

import { useGetAdminOverviewQuery } from '@/api/dashboard/overviewApi'
import { StatListItemProps } from '@/components/dashboard/StatItem/StatListItem'
import StatsList from '@/components/dashboard/StatItem/StatsList'
import PropertyCard from '@/components/reusable/PropertyCard/PropertyCard'
import { PropertyCardAdminInfoList } from '@/components/reusable/PropertyCard/PropertyCardAdminInfoList'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { TabFilterButtons } from '@/components/reusable/TabFilterButtons/TabFilterButtons'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { naIfEmpty, withNAf } from '@/lib/farmatters'
import { isArrayEmpty } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Chart from './Chart'
import RecentActivityLogs from './RecentActivityLogs'

export default function AdminHome() {
  const {
    data: {
      data: { stats, activityLogs, chart, latestProperties, role, scheduledInspections } = {},
    } = {},
    isLoading,
  } = useGetAdminOverviewQuery()

  const statsData: StatListItemProps[] = [
    {
      title: 'Total Properties',
      value: withNAf(stats?.totalProperties),
      subtitle: withNAf(stats?.propertiesChangePercent, (v) => `${v}% from last month`),
      icon: <BuildingIcon />,
    },
    {
      title: 'Active Inspectors',
      value: withNAf(stats?.totalUsers),
      subtitle: withNAf(stats?.usersChangePercent, (v) => `${v}% from last month`),
      icon: <User2 />,
    },
    {
      title: 'Scheduled Inspections',
      value: withNAf(stats?.pendingInspectionsThisMonth),
      subtitle: 'Scheduled for this month',
      icon: <Calender2Icon />,
    },
  ]

  const router = useRouter()

  return (
    <div className="space-y-5">
      <StatsList isLoading={isLoading} stats={statsData} />

      {/* FIXME: can't see month */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-9">
          {/* chart */}
          <Chart isLoading={isLoading} data={chart} />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-3">
          {/* Activity Log  */}
          <RecentActivityLogs isLoading={isLoading} data={activityLogs} />
        </div>
      </div>

      <div>
        <InspectionList
          isLoading={isLoading}
          data={scheduledInspections?.recent}
          title="Recent Scheduled Inspections"
          subTitle={<TabFilterButtons tabs={scheduledInspections?.tabs ?? {}} />}
          actionButton={({ dashboardId, inspectionId, status }) => (
            <Button
              disabled={['ASSIGNED', 'IN_PROGRESS'].includes(status)}
              variant="outline"
              onClick={() => {
                if (!dashboardId) {
                  return
                }

                const route = routes.admin.inspectionListItemDetail
                router.push(route.build({ dashboardId }, { inspectionId }))
              }}
            >
              View
            </Button>
          )}
        />
      </div>

      <SectionCard className="">
        <div className="flex items-center justify-between">
          <SectionTitle>Properties</SectionTitle>

          <Button asChild variant="link" size="link" theme="text">
            <Link href={routes.admin.propertyList}>
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
          {isArrayEmpty(latestProperties)
            ? null
            : latestProperties?.map((p) => (
                <PropertyCard
                  hasAccess
                  slug={routes.admin.propertyDetail.build({ dashboardId: p?.dashboardId })}
                  key={p.id}
                  id={p.id}
                  propertyName={p.name}
                  address={naIfEmpty(p.address)}
                  score={p?.roofHealth?.overallScore ?? 0}
                >
                  <PropertyCardAdminInfoList property={p} />
                </PropertyCard>
              ))}
        </div>
      </SectionCard>
    </div>
  )
}
