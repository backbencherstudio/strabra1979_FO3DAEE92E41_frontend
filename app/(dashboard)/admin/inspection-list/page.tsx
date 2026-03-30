'use client'

import { useGetAllSheduledInspectionsQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import {
  AdminInspectionListManagementColums,
  demoInspectionData,
} from '@/components/columns/InspectionListManagement'
import { CalenderIcon03 } from '@/components/icons/CalenderIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import SelectPropertyDialog from '@/components/pages/admin/user-management/SelectPropertyDialog'
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

  const [openAssignDialog, setOpenAssignDialog] = useState(false)
  const [newInspectinId, setNewInspectinId] = useState<string | undefined>()
  
  const handlePropertyAssign = async (dashboardId: string) => {
    console.log({ dashboardId })
    // const userId = rowData.id
    //
    // if (!userId || !dashboardId) {
    //   toast.error('Missing required information')
    //   return
    // }
    //
    // try {
    //   const res = await assignUserProperty({
    //     dashboardId,
    //     userId,
    //   }).unwrap()
    //
    //   toast.success(res.message ?? 'User assigned successfully')
    // } catch (error) {
    //   toast.error('Failed to assign user', {
    //     description: getErrorMessage(error),
    //   })
    // }
  }

  return (
    <div>
      <SelectPropertyDialog
        open={openAssignDialog}
        onOpenChange={setOpenAssignDialog}
        onAssignConfirm={handlePropertyAssign}
      />
      <ScheduleInspectionDialog
      //        dashboardId={dashboardId}
      //        open={scheduleDialogOpen}
      //        onOpenChange={setScheduleDialogOpen}
      //        propertyName={propertyName}
      //        propertyAddress={propertyAddress}
      //        onSchedule={() => setScheduleDialogOpen(false)}
      />

      <SectionCard className="space-y-4.5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions
            title="Inspection List"
            titleClassName="text-forground"
            onActionButtonClick={() => setOpenAssignDialog((v) => !v)}
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
