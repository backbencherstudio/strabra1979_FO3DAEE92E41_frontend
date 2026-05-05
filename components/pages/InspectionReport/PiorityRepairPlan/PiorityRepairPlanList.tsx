import { TabFilterButtons } from '@/components/reusable/TabFilterButtons/TabFilterButtons'
import { IPiorityRepairPlanItem, IRepairProgressStatus } from '@/types'
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { PiorityRepairPlanItem } from './PiorityRepairPlanItem'
import { Button } from '@/components/ui/button'
import { Edit } from '@/components/icons/Edit'
import { PiorityRepairPlanEditDialog } from './PiorityRepairPlanEditDialog'

export const tabs = ['All', 'Urgent', 'Maintenance', 'Replacement Planning'] as const
export type RepairTab = (typeof tabs)[number]
const STATUS_MAP: Record<RepairTab, IRepairProgressStatus | null> = {
  All: null,
  Urgent: 'Urgent',
  Maintenance: 'Maintenance',
  'Replacement Planning': 'Replacement Planning',
}

export interface PiorityRepairPlanListRef {
  scrollToBottom: () => void
}

export type PiorityRepairPlanListProps = {
  items?: IPiorityRepairPlanItem[]
  isEditable?: boolean
}

const PiorityRepairPlanList = forwardRef<PiorityRepairPlanListRef, PiorityRepairPlanListProps>(
  ({ items, isEditable }, ref) => {
    const [currentTab, setCurrentTab] = useState('All')
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
        }
      },
    }))

    const filteredItems =
      currentTab === 'All'
        ? items
        : items?.filter((item) => item?.status === STATUS_MAP[currentTab as RepairTab])

    const tabCounts: Record<string, number> = {
      All: items?.length ?? 0,
      Urgent: items?.filter((i) => i?.status === 'Urgent').length ?? 0,
      Maintenance: items?.filter((i) => i?.status === 'Maintenance').length ?? 0,
      'Replacement Planning':
        items?.filter((i) => i?.status === 'Replacement Planning').length ?? 0,
    }

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [editDialogData, setEditDialogData] = useState<IPiorityRepairPlanItem | undefined>(
      undefined,
    )

    return (
      <div>
        <PiorityRepairPlanEditDialog
          open={openEditDialog && isEditable}
          initialData={editDialogData}
          onOpenChange={setOpenEditDialog}
        />

        <TabFilterButtons tabs={tabCounts} currentTab={currentTab} onTabChange={setCurrentTab} />

        <div ref={scrollContainerRef} className="mt-3 max-h-120 space-y-4 overflow-y-scroll">
          {filteredItems?.map((item) => (
            <PiorityRepairPlanItem
              key={item.id}
              title={item.title}
              status={item.status}
              description={item.description}
            >
              {isEditable ? (
                <Button
                  onClick={() => {
                    setEditDialogData(item)
                    setOpenEditDialog(true)
                  }}
                  type="button"
                  size="icon-xs"
                  className="bg-transparent"
                  variant="muted"
                >
                  <Edit className="size-4" />
                </Button>
              ) : null}
            </PiorityRepairPlanItem>
          ))}
        </div>
      </div>
    )
  },
)

PiorityRepairPlanList.displayName = 'PiorityRepairPlanList'

export default PiorityRepairPlanList
