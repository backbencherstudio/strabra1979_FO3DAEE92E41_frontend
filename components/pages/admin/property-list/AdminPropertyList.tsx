'use client'

import { useGetPropertiesQuery } from '@/api/dashboard/properties/propertiesApi'
import Building3Icon from '@/components/icons/Building3Icon'
import PlusIcon from '@/components/icons/PlusIcon'
import { CreateNewPropertyDialog } from '@/components/pages/admin/property-list/CreateNewPropertyDialog'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import PropertyCard, { PropertyCardSkeleton } from '@/components/reusable/PropertyCard/PropertyCard'
import { PropertyCardAdminInfoList } from '@/components/reusable/PropertyCard/PropertyCardAdminInfoList'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { addDaysBy, naIfEmpty } from '@/lib/farmatters'
import { useAuth } from '@/redux/features/auth/useAuth'
import { RoleUtils } from '@/types'
import SharedPropertyCardListActions from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '../../Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'

export default function AdminPropertyList() {
  return (
    <PaginationPageProvider>
      <SharedPropertyCardListContextProvider>
        <AdminPropertyListContend />
      </SharedPropertyCardListContextProvider>
    </PaginationPageProvider>
  )
}

function AdminPropertyListContend() {
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
  const { role } = useAuth()
  const isAdmin = RoleUtils.isAdmin(role)

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
          <CreateNewPropertyActionCard />
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : properties.map((p) => (
                <PropertyCard
                  hasAccess
                  key={p.id}
                  id={p.id}
                  slug={
                    p?.dashboard?.id
                      ? routes.admin.propertyDetail.build({ dashboardId: p?.dashboard?.id })
                      : '#'
                  }
                  isAdmin={isAdmin}
                  propertyName={p.name}
                  dashboardId={p?.dashboard?.id}
                  latestInspectionId={p?.dashboard?.latestInspection?.id}
                  address={naIfEmpty(p.address)}
                  score={p?.dashboard?.latestInspection?.overallScore}
                >
                  <PropertyCardAdminInfoList property={p} />
                </PropertyCard>
              ))}
        </div>

        <PaginationControls />
      </section>
    </div>
  )
}

function CreateNewPropertyActionCard() {
  return (
    <div className="border-gray-black-50 flex items-center justify-center rounded-[12px] border bg-[#ffffff]">
      <div className="flex flex-col items-center justify-center py-24">
        <Building3Icon />
        <h2 className="text-gray-black-400 mt-3 text-center text-base font-medium">
          Create New Property Dashboard
        </h2>
        <p className="mt-1.5 text-center text-sm text-[#5f6166]">
          Set up a dashboard to manage <br /> inspections, and all property reports.
        </p>
        <CreateNewPropertyDialog
          trigger={
            <Button variant="outline" size="xl" className="mt-4 px-12!">
              <PlusIcon /> Create New
            </Button>
          }
        />
      </div>
    </div>
  )
}
