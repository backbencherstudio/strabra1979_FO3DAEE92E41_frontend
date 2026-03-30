'use client'

import { useGetAllSheduledInspectionsQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import {
  AdminInspectionListManagementColums,
  demoInspectionData,
} from '@/components/columns/InspectionListManagement'
import { CalenderIcon03 } from '@/components/icons/CalenderIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import { PaginationPageProvider } from '@/components/reusable/Pagination/PaginationPageProvider'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { useState } from 'react'

export default function AdminInspectionList() {
  const handleScheduleConfirm = (data: any) => {
    console.log('Schedule confirmed:', data)
    setScheduleDialogOpen(false)
  }

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const { data: { data = [] } = {} } = useGetAllSheduledInspectionsQuery()

  return (
    <div>
      <ScheduleInspectionDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        onSchedule={handleScheduleConfirm}
        propertyName={'Sunset Office Complex'}
        propertyAddress={'1234 Sunset Blvd, CA 90028'}
      />

      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions
            title="Inspection List"
            titleClassName="text-forground"
            onActionButtonClick={() => setScheduleDialogOpen((v) => !v)}
            showActionButton
            actionButtonText={
              <>
                <CalenderIcon03 />
                Schedule New Inspection
              </>
            }
          />
        </SharedPropertyCardListContextProvider>

        <PaginationPageProvider>
          <div>
            <CustomTable
              columns={AdminInspectionListManagementColums}
              data={data}
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
        </PaginationPageProvider>
      </SectionCard>
    </div>
  )
}
