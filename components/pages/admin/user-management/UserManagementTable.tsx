'use client'

import { useGetUserListQuery } from '@/api/userManagement/userManagementApi'
import { UserManagementColumns } from '@/components/columns/UserManagement'
import CreateUserDialog from '@/components/pages/admin/user-management/CreateUserDialog'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import {
  SharedPropertyCardListContextProvider,
  useSharedPropertyCardListContext,
} from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import FilterDropdown from '@/components/reusable/FilterDropdown/FilterDropdown'
import PaginationControls from '@/components/reusable/Pagination/Pagination'
import {
  PaginationPageProvider,
  usePaginatedQuery,
  usePaginationPage,
} from '@/components/reusable/Pagination/PaginationPageProvider'
import CustomTable from '@/components/reusable/table/CustomTable'
import { addDaysBy } from '@/lib/farmatters'
import { FilterIcon } from 'lucide-react'

import React, { useState } from 'react'

export default function UserManagementTable() {
  return (
    <PaginationPageProvider>
      <SharedPropertyCardListContextProvider>
        <UserManagementTableContent />
      </SharedPropertyCardListContextProvider>
    </PaginationPageProvider>
  )
}
type Status = 'ACTIVE' | 'DEACTIVATED' | 'DELETED' | undefined

function UserManagementTableContent() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleCreateUser = (userData: {
    username: string
    email: string
    password: string
    userRole: string
  }) => {
    // Here you would typically make an API call to create the user
    console.log('Creating user:', userData)
    // After successful creation, you might want to refresh your user list
    // or add the new user to your table data
  }

  const [status, setStatus] = useState<Status | undefined>(undefined)
  const { sortOrder, dateFrom, search } = useSharedPropertyCardListContext()
  const { page, setPage } = usePaginationPage()

  const { data: { data: users = [], meta } = {} } = useGetUserListQuery({
    page,
    sortOrder,
    dateFrom: dateFrom?.formatted,
    dateTo: dateFrom?.raw ? addDaysBy(dateFrom.raw, 1) : undefined,
    status: status,
    search: search,
  })
  usePaginatedQuery({ meta_data: meta })

  return (
    <div>
      <div className="bg-normal-25 space-y-3 rounded-4xl px-4 py-5">
        <SharedPropertyCardListActions
          title="User Management"
          showActionButton={true}
          actionButtonText="Create New User"
          onActionButtonClick={() => setIsDialogOpen(true)}
          showSearch
        >
          <FilterDropdown<Status>
            value={status}
            onChange={(v) => {
              setPage(1)
              setStatus(v)
            }}
            placeholder="Filter Status"
            icon={<FilterIcon />}
            options={[
              { label: 'All', value: undefined },
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Deactivated', value: 'DEACTIVATED' },
              { label: 'Deleted', value: 'DELETED' },
            ]}
          />
        </SharedPropertyCardListActions>

        <div className="mt-3 bg-white">
          <CustomTable
            columns={UserManagementColumns}
            data={users}
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

        <PaginationControls />
      </div>

      <CreateUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}
