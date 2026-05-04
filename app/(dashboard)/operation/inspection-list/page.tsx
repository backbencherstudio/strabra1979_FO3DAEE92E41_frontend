'use client'

import { useGetAllSheduledInspectionsAssignedToMeQuery } from '@/api/inspectionManagement/operationalInspectionApi'
import { OPERATIONAL_INSPECTION_LIST_MANAGEMENT_COLUMS } from '@/components/columns/InspectionListManagement'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import { InspectionProgressFilterDropdown } from '@/components/reusable/SortDropdown/SortDropdown'
import CustomTable from '@/components/reusable/table/CustomTable'
import { InspectionProgressStatus } from '@/types'
import { useState } from 'react'

export default function AdminInspectionTable() {
  return (
    <SharedPropertyCardListContextProvider>
      <PaginationPageProvider>
        <AdminInspectionTableContent />
      </PaginationPageProvider>
    </SharedPropertyCardListContextProvider>
  )
}

function AdminInspectionTableContent() {
  const { page } = usePaginationPage()
  const { debouncedSearch } = useSharedPropertyCardListContext()
  const [inspectionStatusFilter, setInspectionStatusFilter] = useState<
    InspectionProgressStatus | undefined
  >(undefined)

  const { data: { data: sheduledInspections = [], meta } = {}, isLoading } =
    useGetAllSheduledInspectionsAssignedToMeQuery({
      page,
      search: debouncedSearch,
      status: inspectionStatusFilter,
    })
  usePaginatedQuery({ meta_data: meta })

  return (
    <div>
      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListActions
          title="Inspection List"
          titleClassName="text-forground"
          showSearch
        >
          <InspectionProgressFilterDropdown
            value={inspectionStatusFilter}
            onChange={setInspectionStatusFilter}
          />
        </SharedPropertyCardListActions>

        <CustomTable
          isLoading={isLoading}
          columns={OPERATIONAL_INSPECTION_LIST_MANAGEMENT_COLUMS}
          data={sheduledInspections}
          minWidth={1000}
          headerStyles={{
            backgroundColor: '#eceff3',
            textColor: '#4a4c56',
            fontSize: '14px',
            fontWeight: '400',
            padding: '12px 16px',
          }}
          cellBorderColor="#eceff3"
          hasWrapperBorder={false}
          roundedClass="rounded-lg"
        />
        <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </div>
  )
}
