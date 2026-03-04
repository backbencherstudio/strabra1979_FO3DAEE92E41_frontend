'use client'

import { BuildingIcon } from '@/components/icons/BuildingIcon'
import { Calender2Icon } from '@/components/icons/Calender2Icon'
import TodaysInspectionList from '@/components/pages/operation/InspectionList/InspectionList'
import { ChevronRight, User2 } from 'lucide-react'

import { properties } from '@/app/(dashboard)/(autorized_viewer)/mock'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard, { SectionTitle } from '@/components/reusable/SectionCard/SectionCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { RepairTab, tabs } from '../../InspectionReport/PiorityRepairPlan/PiorityRepairPlanList'
import ActivityLog from './ActivityLog'
import Chart from './Chart'

// Demo data
const statsData = [
  {
    id: 1,
    title: 'Total Properties',
    value: '106',
    change: ' +4.5% from last month',
    icon: BuildingIcon,
    bgColor: 'bg-[#f8fafb]',
  },
  {
    id: 2,
    title: 'Active Inspectors',
    value: '24',
    change: '+4.5% from last month',
    icon: User2,
    bgColor: 'bg-[#f8fafb]',
  },
  {
    id: 3,
    title: 'Scheduled Inspections',
    value: '18',
    change: 'Scheduled for this month',
    icon: Calender2Icon,
    bgColor: 'bg-[#f8fafb]',
  },
]

export default function AdminHome() {
  const [currentTab, setTab] = useState<RepairTab>('All')

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4.5">
        {statsData.map((stat) => {
          const IconComponent = stat.icon
          return (
            <div
              key={stat.id}
              className={`${stat.bgColor} w-full space-y-2 rounded-3xl border border-[#ebeeef] p-4.5`}
            >
              <div className="flex justify-between">
                <p className="text-base text-[#5f6166]">{stat.title}</p>
                <IconComponent />
              </div>
              <h2 className="text-2xl font-medium text-[#4a4c56]">{stat.value}</h2>
              <p className="text-base text-[#5f6166]">{stat.change}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-9">
          {/* chart */}
          <Chart />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-3">
          {/* Activity Log  */}
          <ActivityLog />
        </div>
      </div>

      <div>
        <TodaysInspectionList
          title="Recent Scheduled Inspections"
          subTitle={
            <div className="mt-5 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <Button
                  onClick={() => setTab(t)}
                  variant="ghost"
                  className={cn(
                    'px-3',
                    t === currentTab
                      ? `bg-foundation-light-blue hover:bg-foundation-light-blue text-primary hover:text-primary`
                      : 'text-gray-black-300 hover:text-gray-black-300',
                  )}
                  size="sm"
                  key={t}
                >
                  {t} (0)
                </Button>
              ))}
            </div>
          }
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

          <Button asChild variant="link" theme="text">
            <Link href="/admin/properties-list">
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
          {properties.slice(0, 3).map((p) => (
            <PropertyCard slug="/manager/property-list/123" hasAccess key={p.title} {...p}>
              <PropertyCardInfoList
                items={[
                  { label: 'Type', value: p.type },
                  { label: 'Next Inspection', value: p.date },
                ]}
              />
            </PropertyCard>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
