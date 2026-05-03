'use client'

import { useGetAllSheduledInspectionsQuery } from '@/api/inspectionManagement/inspectionManagementApi'
import { ADMIN_INSPECTION_LIST_MANAGEMENT_COLUMS } from '@/components/columns/InspectionListManagement'
import { CalenderIcon03 } from '@/components/icons/CalenderIcon'
import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import SelectPropertyDialog from '@/components/pages/admin/user-management/SelectPropertyDialog'
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
import { Button } from '@/components/ui/button'
import { IPropertyListItem } from '@/types'
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
  const { data: { data: sheduledInspections = [], meta } = {}, isLoading } =
    useGetAllSheduledInspectionsQuery({
      page,
      search: debouncedSearch,
    })
  usePaginatedQuery({ meta_data: meta })

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [openAssignDialog, setOpenAssignDialog] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState<IPropertyListItem | null>(null)
  const handlePropertyAssign = async (_: string, property: IPropertyListItem) => {
    setSelectedProperty(property)
    setScheduleDialogOpen(true)
  }

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
        <SharedPropertyCardListActions
          showSearch
          title="Inspection List"
          titleClassName="text-forground"
        >
          <Button size="lg" onClick={() => setOpenAssignDialog((v) => !v)}>
            <CalenderIcon03 />
            Schedule New Inspection
          </Button>
        </SharedPropertyCardListActions>

        <div>
          <CustomTable
            isLoading={isLoading}
            columns={ADMIN_INSPECTION_LIST_MANAGEMENT_COLUMS}
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
        </div>
        <PaginationControls showHomeAndEnd={false} className="justify-start" size="icon-xs" />
      </SectionCard>
    </div>
  )
}
