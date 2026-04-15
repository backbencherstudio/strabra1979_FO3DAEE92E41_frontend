"use client"
import { useGetReportsQuery } from '@/api/dashboard/manager'
import { ReportManagementColumns, demoReportData } from '@/components/columns/ReportsManagement'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider, useSharedPropertyCardListContext } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import { usePaginatedQuery, usePaginationPage } from '@/components/reusable/Pagination/PaginationPageProvider'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { addDaysBy } from '@/lib/farmatters'

export default function page() {

    const { sortOrder, dateFrom, search } =
      useSharedPropertyCardListContext();
  
    const { page } = usePaginationPage();
  
    const {
      data: { data: properties = [], meta } = {},
      isLoading,
    } = useGetReportsQuery({
      page,
      sortOrder,
      search,
      limit: 9,
      dateFrom: dateFrom?.formatted,
      dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
      
    });

   const tableData = properties?.map((item, index) => ({
  id: item.id,
  no: index + 1,
  report: item.propertyType || 'N/A', 
  property: item.name,
  address: item.address,
  updated_at: item.updatedAt,
  status: item.status === 'ACTIVE' ? 'good' : 'fair', 
}));
// console.log(item, "ppppppppppp");
  
    usePaginatedQuery({ meta_data: meta });
    console.log(properties,"-=-=-=-=-=-=");
  return (
    <div className="w-full">
      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions title="Reports Updates" titleClassName="text-forground" />
        </SharedPropertyCardListContextProvider>
        <div>
          <CustomTable
            columns={ReportManagementColumns}
            data={tableData}
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
