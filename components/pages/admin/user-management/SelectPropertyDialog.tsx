'use client'

import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'

import { properties } from '@/app/(dashboard)/(autorized_viewer)/mock'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useGetPropertiesQuery } from '@/api/dashboard/properties/propertiesApi'
import { formatDate, naIfEmpty } from '@/lib/farmatters'

interface SelectPropertyDialogProps extends React.ComponentProps<typeof Dialog> {
  onPropertySelect?: (propertyId: string) => void
}

export default function SelectPropertyDialog({
  children,
  onPropertySelect,
  open,
  onOpenChange,
  ...props
}: SelectPropertyDialogProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)

  const handleSelect = (propertyId: string, selected: boolean) => {
    console.log('Selected:', propertyId, selected)

    if (selected) {
      setSelectedPropertyId(propertyId)
    } else {
      setSelectedPropertyId(null)
    }
  }

  const handleConfirm = () => {
    if (selectedPropertyId && onPropertySelect) {
      onPropertySelect(selectedPropertyId)
      onOpenChange?.call(null, false)
      setSelectedPropertyId(null)
    }
  }

  const handleCancel = () => {
    onOpenChange?.call(null, false)
    setSelectedPropertyId(null)
  }

  const { data: { data = [] } = {}, isLoading } = useGetPropertiesQuery()

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white p-0 sm:max-w-[1200px] [&>button]:hidden">
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6 pt-2">
          <div className="space-y-6">
            <div className="bg-none">
              <div className="flex items-center justify-between"></div>

              <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
                {data.map((p) => (
                  <PropertyCard
                    {...p}
                    key={p.id}
                    slug={`/admin/properties-list/${p.id}`}
                    hasAccess
                    isSelectable={true}
                    onSelect={(selected) => handleSelect(p.id, selected)}
                    defaultSelected={selectedPropertyId === p.id}
                    // isAdmin={true}
                    title={p.name}
                    property={p.name}
                    address={naIfEmpty(p.address)}
                    score={p?.dashboard?.latestInspection?.overallScore}
                  >
                    <PropertyCardInfoList
                      items={[
                        { label: 'Type', value: naIfEmpty(p.propertyType) },
                        {
                          label: 'Next Inspection',
                          value: naIfEmpty(formatDate(p.nextInspectionDate)),
                        },
                        { label: 'Property Manager', value: naIfEmpty(p?.propertyManager?.username) },
                      ]}
                    />
                  </PropertyCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button size="lg" className="flex-1" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button size="lg" className="flex-1">
              Assign
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
