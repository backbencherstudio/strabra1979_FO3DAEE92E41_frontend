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
        backgroundColor: "#1A1A1A",
        textColor: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "500",
        padding: "12px 16px"
      }}
      cellBorderColor="#2D2D2D"
      hasWrapperBorder={true}
      wrapperBorderColor="#2D2D2D"
      roundedClass="rounded-lg"
    />
    </div>
  )
}
