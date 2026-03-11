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

interface SelectPropertyDialogProps {
  children: React.ReactNode
  onPropertySelect?: (propertyId: string) => void
}

export default function SelectPropertyDialog({
  children,
  onPropertySelect,
}: SelectPropertyDialogProps) {
  const [open, setOpen] = useState(false)
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
      setOpen(false)
      setSelectedPropertyId(null)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setSelectedPropertyId(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white p-0 sm:max-w-[1200px] [&>button]:hidden">
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6 pt-2">
          <div className="space-y-6">
            <div className="bg-none">
              <div className="flex items-center justify-between"></div>

              <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
                {properties.map((p) => (
                  <PropertyCard
                    slug="/manager/property-list/123"
                    hasAccess
                    key={p.id}
                    {...p}
                    isSelectable={true}
                    onSelect={(selected) => handleSelect(p.id, selected)}
                    defaultSelected={selectedPropertyId === p.id}
                  >
                    <PropertyCardInfoList
                      items={[
                        { label: 'Type', value: p.type },
                        { label: 'Next Inspection', value: p.date },
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
            <Button className="flex-1" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button className="flex-1">Assign</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
