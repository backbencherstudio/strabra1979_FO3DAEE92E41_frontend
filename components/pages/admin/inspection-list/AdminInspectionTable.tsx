'use client'

import { useGetAllSheduledInspectionsQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import { AdminInspectionListManagementColums } from '@/components/columns/InspectionListManagement'
import { CalenderIcon03 } from '@/components/icons/CalenderIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import SelectPropertyDialog from '@/components/pages/admin/user-management/SelectPropertyDialog'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import { PaginationPageProvider } from '@/components/reusable/Pagination/PaginationPageProvider'
import SectionCard from '@/components/reusable/SectionCard/SectionCard'
import CustomTable from '@/components/reusable/table/CustomTable'
import { IPropertyListItem } from '@/types'
import { useState } from 'react'

export default function AdminInspectionTable() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  // TODO: add pagination
  const { data: { data: sheduledInspections = [] } = {}, isLoading } =
    useGetAllSheduledInspectionsQuery({
      limit: 300,
    })

  const [openAssignDialog, setOpenAssignDialog] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState<IPropertyListItem | null>(null)
  const handlePropertyAssign = async (_: string, property: IPropertyListItem) => {
    setSelectedProperty(property)
    setScheduleDialogOpen(true)
  }

  console.table(sheduledInspections)

  return (
    <div>
      <SelectPropertyDialog
        title="Select a property for inspection"
        open={openAssignDialog}
        onOpenChange={setOpenAssignDialog}
        onAssignConfirm={handlePropertyAssign}
      />
      <ScheduleInspectionDialog
        dashboardId={selectedProperty?.dashboard.id}
        open={scheduleDialogOpen && !!selectedProperty?.dashboard.id}
        onOpenChange={setScheduleDialogOpen}
        propertyName={selectedProperty?.name}
        propertyAddress={selectedProperty?.address}
        onScheduleComplete={() => setScheduleDialogOpen(false)}
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
              isLoading={isLoading}
              columns={AdminInspectionListManagementColums}
              data={sheduledInspections}
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
