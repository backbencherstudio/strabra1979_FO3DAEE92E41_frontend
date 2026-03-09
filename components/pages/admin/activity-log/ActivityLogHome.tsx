'use client'

import { useGetActivityLogQuery } from '@/api/dashboard/activityLogApi'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ActivityLogListItem from './ActivityLogListItem'
import { SharedPropertyCardListContextProvider } from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'

export default function ActivityLogHome() {
  return (
    <SharedPropertyCardListContextProvider>
      <ActivityLogHomeContent />
    </SharedPropertyCardListContextProvider>
  )
}

function ActivityLogHomeContent() {
  // Filter logs by type
  const { data: { data: allLogs = [] } = {}, isLoading } = useGetActivityLogQuery()

  const propertyUpdateLogs = allLogs.filter((log) => log.category === 'PROPERTY_DASHBOARD_UPDATE')
  const userAccessLogs = allLogs.filter((log) => log.category === 'USER_ACCESS')

  const tabs = [
    {
      id: 'all',
      label: 'All',
      data: allLogs,
    },
    {
      id: 'property-dashboard-updates',
      label: 'Property dashboard updates',
      data: propertyUpdateLogs,
    },
    {
      id: 'user-access',
      label: 'User Access',
      data: userAccessLogs,
    },
  ]

  return (
    <div className="bg-disabled-0 rounded-3xl border border-[#ebeeef] p-4.5">
      <SharedPropertyCardListActions
        title="Activity Log"
        titleClassName="md:text-base font-medium text-[#4a4c56]"
      />

      <Tabs defaultValue="all" className="w-full">
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
              {item.data.map((log) => (
                <ActivityLogListItem key={log.id} log={log} />
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
