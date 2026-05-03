'use client'

import { useGetPropertiesQuery } from '@/api/dashboard/properties/propertiesApi'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import PropertyCard, {
  PropertyCardInfoList,
  PropertyCardSkeleton,
} from '@/components/reusable/PropertyCard/PropertyCard'
import { routes } from '@/constant'
import { addDaysBy, formatDate, naIfEmpty } from '@/lib/farmatters'
import { useAuth } from '@/redux/features/auth/useAuth'
import { RoleUtils } from '@/types'
import SharedPropertyCardListActions from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'

export default function ManagerPropertyList() {
  return (
    <PaginationPageProvider>
      <SharedPropertyCardListContextProvider>
        <ManagerPropertyListContent />
      </SharedPropertyCardListContextProvider>
    </PaginationPageProvider>
  )
}

function ManagerPropertyListContent() {
  const { sortOrder, dateFrom, debouncedSearch } = useSharedPropertyCardListContext()
  const { page } = usePaginationPage()
  const { data: { data: properties = [], meta } = {}, isLoading } = useGetPropertiesQuery({
    page,
    sortOrder,
    search: debouncedSearch,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
  })
  usePaginatedQuery({ meta_data: meta })

  return (
    <div className="bg-normal-25 rounded-3xl p-4">
      <section className="space-y-4">
        <SharedPropertyCardListActions
          title="Property List"
          titleClassName=""
          showSortOrder
          showSearch
          showDateFilter
        />

        <div className="grid gap-x-5 gap-y-4.5 lg:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : properties.map((p) => (
                <PropertyCard
                  hasAccess
                  key={p.id}
                  id={p.id}
                  slug={
                    p?.dashboard?.id
                      ? routes.manager.propertyDetail.build({ dashboardId: p?.dashboard?.id })
                      : '#'
                  }
                  propertyName={p.name}
                  dashboardId={p?.dashboard?.id}
                  address={naIfEmpty(p.address)}
                  score={p?.dashboard?.latestInspection?.overallScore}
                >
                  <PropertyCardInfoList
                    items={[
                      { label: 'Type', value: naIfEmpty(p.propertyType) },
                      {
                        label: 'Next Inspection',
                        value: naIfEmpty(p.nextInspectionDate, formatDate),
                      },
                    ]}
                  />
                </PropertyCard>
              ))}
        </div>

        <PaginationControls />
      </section>
    </div>
  )
}
