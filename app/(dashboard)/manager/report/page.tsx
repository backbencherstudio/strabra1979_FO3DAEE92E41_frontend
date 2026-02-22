import { ReportManagementColumns, demoReportData } from '@/components/columns/ReportsManagement'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import Pagination from '@/components/reusable/Pagination/Pagination'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'

export default function page() {
  return (
    <div>
      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListActions title="Reports Updates" titleClassName="text-forground" />
        <div>
          <CustomTable
            columns={ReportManagementColumns}
            data={demoReportData}
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

        <Pagination showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </div>
  )
}
