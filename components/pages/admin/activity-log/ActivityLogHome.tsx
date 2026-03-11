'use client'

import { useGetActivityLogQuery } from '@/api/dashboard/activityLogApi'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { addDaysBy } from '@/lib/farmatters'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import ActivityLogListItem from './ActivityLogListItem'
import { ActivityCategory } from '@/types'
import { useState } from 'react'

export default function ActivityLogHome() {
  return (
    <PaginationPageProvider>
      <SharedPropertyCardListContextProvider>
        <ActivityLogHomeContent />
      </SharedPropertyCardListContextProvider>
    </PaginationPageProvider>
  )
}

const tabs = [
  { id: 'all', label: 'All', category: undefined },
  {
    id: 'property-dashboard-updates',
    label: 'Property dashboard updates',
    category: 'PROPERTY_DASHBOARD_UPDATE',
  },
  {
    id: 'user-access',
    label: 'User Access',
    category: 'USER_ACCESS',
  },
] as const

function ActivityLogHomeContent() {
  const { page, setPage } = usePaginationPage()
  const { sortOrder, dateFrom } = useSharedPropertyCardListContext()

  const [category, setCategory] = useState<ActivityCategory>(undefined)

  const { data: { data: allLogs = [], meta } = {}, isLoading } = useGetActivityLogQuery({
    page,
    sortOrder,
    category,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
  })

  usePaginatedQuery({ meta_data: meta })

  return (
    <div className="bg-disabled-0 space-y-4 rounded-3xl border border-[#ebeeef] p-4.5">
      <SharedPropertyCardListActions
        title="Activity Log"
        titleClassName="md:text-base font-medium text-[#4a4c56]"
        showSortOrder
        showDateFilter
      />

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => {
          const tab = tabs.find((t) => t.id === value)
          setCategory(tab?.category)

          // reset pagination when switching tabs
          setPage(1)
        }}
      >
        <TabsList className="gap-4 bg-transparent">
          {tabs.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="data-[state=active]:text-medium data-[state=active]:bg-foundation-light-blue rounded-lg data-[state=active]:font-medium data-[state=active]:text-black"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="border-gray-black-50 rounded-xl border bg-white p-3"
          >
            <ul className="flex flex-col items-start gap-6">
              {isLoading ? (
                <li className="w-full py-6 text-center text-sm text-gray-500">
                  Loading activity logs...
                </li>
              ) : allLogs.length === 0 ? (
                <li className="w-full py-6 text-center text-sm text-gray-500">
                  No activity logs found.
                </li>
              ) : (
                allLogs.map((log) => <ActivityLogListItem key={log.id} log={log} />)
              )}
            </ul>
          </TabsContent>
        ))}
      </Tabs>

      <PaginationControls />
    </div>
  )
}
