import {
  demoInspectionData,
  InspectionListManagementColums,
} from '@/components/columns/InspectionListManagement'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'

export default function InspectionList() {
  return (
    <SharedPropertyCardListContextProvider>
      <div>
        <SectionCard className="space-y-4.5">
          <SharedPropertyCardListActions titleClassName="text-forground" title="Inspection List" />

          <div>
            {/* <CustomTable */}
            {/*   columns={InspectionListManagementColums} */}
            {/*   data={demoInspectionData} */}
            {/*   //   currentPage={currentPage} */}
            {/*   //   itemsPerPage={itemsPerPage} */}
            {/*   //   onPageChange={setCurrentPage} */}
            {/*   //   sortConfig={sortConfig} */}
            {/*   //   onSort={handleSort} */}
            {/*   minWidth={1000} */}
            {/*   headerStyles={{ */}
            {/*     backgroundColor: '#eceff3', */}
            {/*     textColor: '#4a4c56', */}
            {/*     fontSize: '14px', */}
            {/*     fontWeight: '400', */}
            {/*     padding: '12px 16px', */}
            {/*   }} */}
            {/*   cellBorderColor="#eceff3" */}
            {/*   hasWrapperBorder={false} */}
            {/*   roundedClass="rounded-lg" */}
            {/* /> */}
          </div>
          <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
        </SectionCard>
      </div>
    </SharedPropertyCardListContextProvider>
  )
}
