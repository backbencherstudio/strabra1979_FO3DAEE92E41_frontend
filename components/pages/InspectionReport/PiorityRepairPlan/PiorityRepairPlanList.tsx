import { cn } from '@/lib/utils'
import { PiorityRepairPlanItem } from './PiorityRepairPlanItem'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const tabs = ['All', 'Urgent', 'Maintenance', 'Replacement Planning'] as const
export type RepairTab = (typeof tabs)[number]

export default function PiorityRepairPlanList() {
  const [currentTab, setTab] = useState<RepairTab>('All')

  return (
    <div>
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

      <div className="mt-3 space-y-4">
        <PiorityRepairPlanItem
          title="Drainage & Ponding "
          status="URGENT"
          description="
        The roofing surface shows signs of normal wear consistent with age. Minor cracks, surface
        aging, and localized deterioration were observed in selected areas. No active leaks were
        observed at the time of inspection. However, moisture stains / vulnerable joints were noted,
        indicating potential leak risks if left unaddressed.
      "
        />
      </div>
    </div>
  )
}
