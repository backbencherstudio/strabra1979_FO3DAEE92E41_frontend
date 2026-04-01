import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { IPiorityRepairPlanItem, IRepairProgressStatus } from '@/types'
import { useState } from 'react'
import { PiorityRepairPlanItem } from './PiorityRepairPlanItem'

export const tabs = ['All', 'Urgent', 'Maintenance', 'Replacement Planning'] as const
export type RepairTab = (typeof tabs)[number]
const STATUS_MAP: Record<RepairTab, IRepairProgressStatus | null> = {
  All: null,
  Urgent: 'Urgent',
  Maintenance: 'Maintenance',
  'Replacement Planning': 'Replacement Planning',
}

export default function PiorityRepairPlanList({ items = [] }: { items: IPiorityRepairPlanItem[] }) {
  const [currentTab, setCurrentTab] = useState<RepairTab>('All')

  const filteredItems =
    currentTab === 'All' ? items : items?.filter((item) => item?.status === STATUS_MAP[currentTab])

  const getCount = (tab: RepairTab) =>
    tab === 'All'
      ? items?.length
      : items?.filter((item) => item?.status === STATUS_MAP[tab])?.length

  return (
    <div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const count = getCount(t)
          return (
            <Button
              disabled={count < 1}
              onClick={() => setCurrentTab(t)}
              variant="ghost"
              className={cn(
                'px-3',
                t === currentTab
                  ? 'bg-foundation-light-blue hover:bg-foundation-light-blue text-primary hover:text-primary'
                  : 'text-gray-black-300 hover:text-gray-black-300',
              )}
              size="sm"
              key={t}
            >
              {t} ({count})
            </Button>
          )
        })}
      </div>

      <div className="mt-3 max-h-120 space-y-4 overflow-y-scroll">
        {filteredItems?.map((item) => (
          <PiorityRepairPlanItem
            key={item.id}
            title={item.title}
            status={item.status}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}
