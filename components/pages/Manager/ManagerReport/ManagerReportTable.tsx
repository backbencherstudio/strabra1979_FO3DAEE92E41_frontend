'use client'
import { useGetReportsQuery } from '@/api/dashboard/manager'
import { ReportManagementColumns } from '@/components/columns/ReportsManagement'
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
import CustomTable from '@/components/reusable/table/CustomTable'
import { addDaysBy } from '@/lib/farmatters'

export default function ManagerReportTable() {
  return (
    <SharedPropertyCardListContextProvider>
      <PaginationPageProvider>
        <ManagerReportTableContent />
      </PaginationPageProvider>
    </SharedPropertyCardListContextProvider>
  )
}

function ManagerReportTableContent() {
  const { sortOrder, dateFrom, debouncedSearch } = useSharedPropertyCardListContext()
  const { page } = usePaginationPage()
  const { data: { data: properties = [], meta } = {}, isLoading } = useGetReportsQuery({
    page,
    sortOrder,
    search: debouncedSearch,
    limit: 9,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
  })
  usePaginatedQuery({ meta_data: meta })

  const formattedReports = properties.map((report, index) => ({
    id: report.id,
    no: index + 1,
    // report: report?.reportName || 'Unknown Report',
    property: report.name,
    address: report.address,
    updated_at: report.updatedAt,
    status: report.status,
  }))

  return (
    <div className="w-full">
      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListActions
          title="Reports Updates"
          showDateFilter
          showSearch
          showSortOrder
          titleClassName="text-forground"
        />
        <div>
          <CustomTable
            isLoading={isLoading}
            columns={ReportManagementColumns}
            data={formattedReports}
            //   currentPage={currentPage}
            //   itemsPerPage={itemsPerPage}
            //   onPageChange={setCurrentPage}
            //   sortConfig={sortConfig}
            //   onSort={handleSort}
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
        </div>

        <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </div>
  )
}
