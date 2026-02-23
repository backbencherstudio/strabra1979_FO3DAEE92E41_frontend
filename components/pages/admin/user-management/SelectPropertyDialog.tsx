'use client'

import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import PropertyCard, { PropertyCardInfoList } from '@/components/reusable/PropertyCard/PropertyCard'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
 
import Pagination from '@/components/reusable/Pagination/Pagination'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { properties } from '@/app/(dashboard)/(autorized_viewer)/mock'

interface SelectPropertyDialogProps {
  children: React.ReactNode
  onPropertySelect?: (propertyId: string) => void
}

export default function SelectPropertyDialog({ 
  children, 
  onPropertySelect 
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
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] bg-white p-0 max-h-[90vh] overflow-hidden [&>button]:hidden">
      

        <div className="overflow-y-auto p-6 pt-2 max-h-[calc(90vh-120px)]">
          
          <div className="space-y-6">
            <div  className=" bg-none">
              <div className="flex justify-between items-center">
              
                
                
              </div>

              <div className="mt-4.5 grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3  ">
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
      </DialogContent>
    </Dialog>
  )
}