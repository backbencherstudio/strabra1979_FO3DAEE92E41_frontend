'use client'

import { BuildingIcon } from '@/components/icons/BuildingIcon'
import { Calender2Icon } from '@/components/icons/Calender2Icon'
import InspectionList from '@/components/pages/operation/InspectionList/InspectionList'
import { ChevronRight, User2 } from 'lucide-react'

import { useGetAdminOverviewQuery } from '@/api/dashboard/overviewApi'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { formatDate, naIfEmpty, withNAf } from '@/lib/farmatters'
import { cn, isArrayEmpty } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { RepairTab } from '../../InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import Chart from './Chart'
import RecentActivityLogs from './RecentActivityLogs'
import { StatCard, StatCardProps } from './StatCard'

export default function AdminHome() {
  const [currentTab, setTab] = useState<RepairTab>('All')

  const {
    data: {
      data: { stats, activityLogs, chart, latestProperties, role, scheduledInspections } = {},
    } = {},
    isLoading,
  } = useGetAdminOverviewQuery()

  const statsData: StatCardProps[] = [
    {
      title: 'Total Properties',
      value: withNAf(stats?.totalProperties),
      change: withNAf(stats?.propertiesChangePercent, (v) => `${v}% from last month`),
      icon: <BuildingIcon />,
    },
    {
      title: 'Active Inspectors',
      value: withNAf(stats?.totalUsers),
      change: withNAf(stats?.usersChangePercent, (v) => `${v}% from last month`),
      icon: <User2 />,
    },
    {
      title: 'Scheduled Inspections',
      value: withNAf(stats?.pendingInspectionsThisMonth),
      change: 'Scheduled for this month',
      icon: <Calender2Icon />,
    },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4.5">
        {statsData.map((stat, index) => {
          return (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              isLoading={isLoading}
            />
          )
        })}
      </div>

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
          subTitle={
            <div className="mt-5 flex flex-wrap gap-2">
              {scheduledInspections?.tabs == undefined
                ? null
                : Object.keys(scheduledInspections?.tabs).map((tabKey) => {
                    const tabs = scheduledInspections?.tabs as Record<string, number>
                    return (
                      <Button
                        // onClick={() => setTab(t)}
                        variant="ghost"
                        className={cn(
                          'pointer-events-none px-3 capitalize',
                          tabKey === currentTab
                            ? `bg-foundation-light-blue hover:bg-foundation-light-blue text-primary hover:text-primary`
                            : 'text-gray-black-300 hover:text-gray-black-300',
                        )}
                        size="sm"
                        key={tabKey}
                      >
                        {tabKey} ({tabs[tabKey]})
                      </Button>
                    )
                  })}
            </div>
          }
          // TODO: add View
          actionButton={
            <Button variant="outline" asChild>
              <Link href={`#`}>View</Link>
            </Button>
          }
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
                  slug={routes.admin.propertyDashboarDetail.build({ dashboardId: p?.dashboardId })}
                  hasAccess
                  key={p.id}
                  id={p.id}
                  propertyName={p.name}
                  address={naIfEmpty(p.address)}
                  score={p?.roofHealth?.overallScore ?? 0}
                >
                  <PropertyCardInfoList
                    items={[
                      { label: 'Type', value: withNAf(p.propertyType) },
                      {
                        label: 'Next Inspection',
                        value: withNAf(p?.nextInspectionDate, formatDate),
                      },
                    ]}
                  />
                </PropertyCard>
              ))}
        </div>
      </SectionCard>
    </div>
  )
}
