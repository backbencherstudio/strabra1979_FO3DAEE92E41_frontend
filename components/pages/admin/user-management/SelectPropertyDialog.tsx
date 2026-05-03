'use client'

import PropertyCard, { PropertyCardSkeleton } from '@/components/reusable/PropertyCard/PropertyCard'

import { useGetPropertiesQuery } from '@/api/dashboard/properties/propertiesApi'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import { PropertyCardAdminInfoList } from '@/components/reusable/PropertyCard/PropertyCardAdminInfoList'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { routes } from '@/constant'
import { addDaysBy, naIfEmpty } from '@/lib/farmatters'
import { IPropertyListItem } from '@/types'
import { useEffect, useEffectEvent, useState } from 'react'
import SharedPropertyCardListActions from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'

interface SelectPropertyDialogProps extends React.ComponentProps<typeof Dialog> {
  onAssignConfirm?: (dashboardId: string, property: IPropertyListItem) => void
  title: string
}

export default function SelectPropertyDialog(props: SelectPropertyDialogProps) {
  return (
    <PaginationPageProvider>
      <SharedPropertyCardListContextProvider>
        <SelectPropertyDialogContent {...props} />
      </SharedPropertyCardListContextProvider>
    </PaginationPageProvider>
  )
}

function SelectPropertyDialogContent({
  title,
  children,
  onAssignConfirm,
  open,
  onOpenChange,
  ...props
}: SelectPropertyDialogProps) {
  const { sortOrder, dateFrom, debouncedSearch, search } = useSharedPropertyCardListContext()
  const { page } = usePaginationPage()
  const { data: { data: properties = [], meta } = {}, isLoading } = useGetPropertiesQuery({
    page,
    sortOrder,
    search: debouncedSearch,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
  })
  usePaginatedQuery({ meta_data: meta })

  const [selectedProperty, setSelectedProperty] = useState<IPropertyListItem | null>(null)
  const handleSelect = (property: IPropertyListItem, selected: boolean) => {
    if (selected) {
      setSelectedProperty(property)
    } else {
      setSelectedProperty(null)
    }
  }

  const handleConfirm = () => {
    if (selectedProperty && onAssignConfirm) {
      onAssignConfirm(selectedProperty?.dashboard?.id, selectedProperty)
      onOpenChange?.(false)
      setSelectedProperty(null)
    }
  }

  // Unselect the selected item on data change
  const unselectCardOnDataChange = useEffectEvent(() => {
    setSelectedProperty(null)
  })

  useEffect(() => {
    unselectCardOnDataChange()
  }, [search, sortOrder, dateFrom?.raw])

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange?.(v)
        setSelectedProperty(null)
      }}
      {...props}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex h-[90vh] flex-col overflow-hidden bg-white p-0 sm:max-w-300"
      >
        <DialogTitle className="sr-only">Property-list</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <section className="mt-2 px-6">
          <SharedPropertyCardListActions title={title} showSortOrder showSearch showDateFilter />
        </section>

        <section className="max-h-[calc(90vh-150px)] flex-1 overflow-y-auto px-6">
          <div className="grid gap-x-5 gap-y-4.5 py-1 lg:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
              : properties.map((p) => (
                  <PropertyCard
                    {...p}
                    key={p.id}
                    slug={routes.admin.propertyDetail.build({
                      dashboardId: p?.dashboard?.id,
                    })}
                    hasAccess
                    isSelectable={true}
                    onSelect={(selected) => handleSelect(p, selected)}
                    defaultSelected={selectedProperty?.dashboard.id === p?.dashboard?.id}
                    propertyName={p.name}
                    address={naIfEmpty(p.address)}
                    score={p?.dashboard?.latestInspection?.overallScore}
                  >
                    <PropertyCardAdminInfoList property={p} />
                  </PropertyCard>
                ))}
          </div>

          <PaginationControls className="mt-4" />
        </section>

        <DialogFooter className="mt-auto p-4">
          <DialogClose asChild>
            <Button size="lg" className="flex-1" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose onClick={handleConfirm} asChild>
            <Button disabled={!selectedProperty} size="lg" className="flex-1">
              Assign
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
