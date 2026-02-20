import { demoUserData, UserManagementColumns } from '@/components/columns/UserManagement'
import CustomTable from '@/components/reusable/table/CustomTable'
import React from 'react'

export default function page() {
  return (
    <div>
         <CustomTable
     columns={UserManagementColumns}
      data={demoUserData}
    //   currentPage={currentPage}
    //   itemsPerPage={itemsPerPage}
    //   onPageChange={setCurrentPage}
    //   sortConfig={sortConfig}
    //   onSort={handleSort}
      minWidth={1000}
      headerStyles={{
        backgroundColor: "#eceff3",
        textColor: "#4a4c56",
        fontSize: "14px",
        fontWeight: "400",
        padding: "12px 16px"
        

      }}
      cellBorderColor="#eceff3"
      hasWrapperBorder={false}
      
      roundedClass="rounded-lg"
    />
    </div>
  )
}
