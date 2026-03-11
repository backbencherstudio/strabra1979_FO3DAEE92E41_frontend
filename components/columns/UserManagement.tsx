'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/farmatters'
import { IUserListItem } from '@/types'
import React, { useState } from 'react'
import { Dot } from '../icons/Dot'
import { TrashIcon } from '../icons/TrashIcon'
import SelectPropertyDialog from '../pages/admin/user-management/SelectPropertyDialog'
import { ColumnConfig } from '../reusable/table/CustomTable'

// ==================== USER STATUS BADGE COMPONENT ====================
const UserStatusBadge = ({ status }: { status: string }) => {
  let textColor = ''
  let borderColor = ''
  let backgroundColor = ''

  switch (status.toLowerCase()) {
    case 'active':
      borderColor = 'border-[#D9E5FF]'
      textColor = 'text-[#3366CF]'
      backgroundColor = 'bg-[#e5f3fe]'
      break
    case 'deactivated':
      borderColor = 'border-[#f6e7dc]'
      textColor = 'text-[#9a6036]'
      backgroundColor = 'bg-[#fbf5db]'
      break
    case 'deleted':
      borderColor = 'border-[#ffd5d5]'
      textColor = 'text-[#a12a24]'
      backgroundColor = 'bg-[#ffdede]'
      break
    default:
      borderColor = 'border-gray-400'
      textColor = 'text-gray-400'
  }

  return (
    <p
      className={`${borderColor} ${textColor} ${backgroundColor} inline-block rounded-[4px] border px-3 py-1.5 text-xs font-medium`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </p>
  )
}

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

// ==================== DEACTIVATE USER DIALOG ====================
const DeactivateUserDialog = ({
  children,
  rowData,
}: {
  children: React.ReactNode
  rowData: any
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-4xl border border-[#ede9df] bg-[#ffffff] p-12 sm:max-w-[522px] [&>button]:hidden">
        <div className="">
          <h2 className="text-center text-2xl font-semibold text-[#1d1f2c]">Deactivate User</h2>
          <p className="mt-2 text-center text-base text-[#777980]">
            Are you sure you want to deactivate this user?
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="flex-1 rounded-lg border border-[#e7eaeb] py-3.5 text-sm font-medium text-[#0b2a3b]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 rounded-lg border border-[#e7eaeb] bg-[#eb3d4d] py-3.5 text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Deactivate
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ==================== DELETE USER DIALOG ====================
const DeleteUserDialog = ({
  children,
  rowData,
  onConfirm,
}: {
  children: React.ReactNode
  rowData: any
  onConfirm?: () => void
}) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-4xl border border-[#ede9df] bg-[#ffffff] p-12 sm:max-w-[522px] [&>button]:hidden">
        <div className="">
          <div className="flex justify-center">
            <div className="inline-block rounded-[12px] bg-[#eb3d4d] px-4 py-3.5">
              <TrashIcon />
            </div>
          </div>
          <h2 className="mt-3 text-center text-2xl font-semibold text-[#1d1f2c]">
            Delete User Account
          </h2>
          <p className="mt-2 text-center text-base text-[#777980]">
            Are you sure you want to delete this user account?
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="flex-1 rounded-lg border border-[#e7eaeb] py-3.5 text-sm font-medium text-[#0b2a3b]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 rounded-lg border border-[#e7eaeb] bg-[#eb3d4d] py-3.5 text-sm font-medium text-white"
              onClick={handleConfirm}
            >
              Delete Account
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ==================== USER ACTION BUTTON COMPONENT ====================
const UserActionButton = ({
  rowData,
  onDeactivate,
  onPropertySelect,
  onDelete,
}: {
  rowData: any
  onDeactivate?: (row: any) => void
  onPropertySelect?: (row: any) => void
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
}) => {
  // Check if user is deleted - disable actions for deleted users
  const isUserDeleted = rowData.status?.toLowerCase() === 'deleted'

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(rowData)
    }
  }

  const handlePropertySelect = (propertyId: string) => {
    console.log('Assigning property:', propertyId, 'to user:', rowData)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-[#f6f8fa]"
            disabled={isUserDeleted}
          >
            <Dot className={`h-4 w-4 ${isUserDeleted ? 'text-gray-600' : 'text-gray-500'}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[167px] bg-[#f6f8fa] p-3 shadow-xl">
          <DropdownMenuGroup>
            {onDeactivate && (
              <DeactivateUserDialog rowData={rowData}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={isUserDeleted}
                  className={`cursor-pointer text-sm text-[#5c707c] focus:bg-[#1D1D1D] focus:text-white ${
                    isUserDeleted ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  Deactivate User
                </DropdownMenuItem>
              </DeactivateUserDialog>
            )}

            {onPropertySelect && (
              <SelectPropertyDialog onPropertySelect={handlePropertySelect}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={isUserDeleted}
                  className={`cursor-pointer text-sm text-[#5c707c] focus:bg-[#1D1D1D] focus:text-white ${
                    isUserDeleted ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  Assign to a property
                </DropdownMenuItem>
              </SelectPropertyDialog>
            )}
          </DropdownMenuGroup>

          {onDelete && !isUserDeleted && (
            <DropdownMenuGroup>
              <DeleteUserDialog rowData={rowData} onConfirm={handleConfirmDelete}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer text-sm text-[#5c707c] focus:bg-[#1D1D1D] focus:text-white"
                >
                  Delete User
                </DropdownMenuItem>
              </DeleteUserDialog>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

// ==================== USER COLUMNS CONFIGURATION ====================
export const UserManagementColumns: ColumnConfig<IUserListItem>[] = [
  {
    label: 'No.',
    width: '8%',
    accessor: 'email',
    formatter: (_, __, index) => {
      const num = index + 1
      return num < 10 ? `0${num}` : num
    },
  },
  {
    label: 'Name',
    width: '20%',
    accessor: 'first_name',
    formatter: (value) => {
      if (!value) return 'N/A'
      return value
    },
  },
  {
    label: 'User Type',
    width: '18%',
    accessor: 'role',
  },
  {
    label: 'Email',
    width: '22%',
    accessor: 'email',
  },
  {
    label: 'Approved Date',
    width: '15%',
    accessor: 'approved_at',
    sortable: true,
    formatter: (value) => {
      if (!value) return 'N/A'
      return formatDate(value)
    },
  },
  {
    label: 'Status',
    width: '12%',
    accessor: 'status',
    sortable: true,
    formatter: (value) => {
      if (!value) return 'N/A'
      return <UserStatusBadge status={value} />
    },
  },
  {
    label: '',
    accessor: 'email',
    width: '5%',
    formatter: (_, row) => {
      return (
        <UserActionButton
          rowData={row}
          onDeactivate={(row) => console.log('Deactivate', row)}
          onDelete={(row) => console.log('Delete', row)}
          onPropertySelect={(row) => console.log('Assign Property', row)}
        />
      )
    },
  },
]

