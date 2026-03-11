'use client' // Add this since we're using state and handlers

import { demoUserData, UserManagementColumns } from '@/components/columns/UserManagement'
import CreateUserDialog from '@/components/pages/admin/user-management/CreateUserDialog'
import SharedPropertyCardListActions from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListActions'
import { SharedPropertyCardListContextProvider } from '@/components/pages/Viewer/SharedPropertyCardListActions/SharedPropertyCardListContext'
import CustomTable from '@/components/reusable/table/CustomTable'

import React from 'react'

export default function Page() {
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

  return (
    <div>
      <div className="rounded-4xl bg-[#f6f8fa] px-4 py-5">
        <SharedPropertyCardListContextProvider>
          <SharedPropertyCardListActions
            title="User Management"
            showActionButton={true}
            actionButtonText="Create New User"
            actionButtonClassName="bg-[#0b2a3b] py-3"
            onActionButtonClick={() => setIsDialogOpen(true)}
          />
        </SharedPropertyCardListContextProvider>

        <div className="mt-3 bg-white">
          <CustomTable
            columns={UserManagementColumns}
            data={demoUserData}
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
      </div>

      <CreateUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}

