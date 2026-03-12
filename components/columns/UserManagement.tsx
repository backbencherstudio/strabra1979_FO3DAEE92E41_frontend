'use client'

import { useUpdateUserStatusMutation } from '@/api/userManagement/userManagementApi'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate, getErrorMessage } from '@/lib/farmatters'
import { IUserListItem } from '@/types'
import { useState } from 'react'
import { Dot } from '../icons/Dot'
import ConfirmDialog from '../reusable/ConfirmDialog/ConfirmDialog'
import { ColumnConfig } from '../reusable/table/CustomTable'
import { AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'
import { toast } from 'sonner'
import SelectPropertyDialog from '../pages/admin/user-management/SelectPropertyDialog'
import { Trush } from '../icons/Trush'

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

// ==================== USER ACTION BUTTON COMPONENT ====================
const UserActionButton = ({ rowData }: { rowData: IUserListItem }) => {
  // Check if user is deleted - disable actions for deleted users
  const isUserDeleted = rowData.status?.toUpperCase() === 'DELETED'
  const isUserDeactivated = rowData.status?.toUpperCase() === 'DEACTIVATED'

  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation()

  const handlePropertySelect = (propertyId: string) => {
    console.log('Assigning property:', propertyId, 'to user:', rowData)
  }

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [dialogType, setDialogType] = useState<'DELETE' | 'DEACTIVATE'>('DELETE')
  const isDeleteDialog = dialogType == 'DELETE'

  async function onConfirmTogleDeactivateStatus() {
    try {
      await updateUserStatus({
        id: rowData.id,
        status: isUserDeactivated ? 'ACTIVE' : 'DEACTIVATED',
      }).unwrap()
    } catch (error) {
      toast.error('Failed to update user status', {
        description: getErrorMessage(error),
      })
    }
  }

  async function onConfirmToggleDeleteUser() {
    try {
      await updateUserStatus({
        id: rowData.id,
        status: isUserDeleted ? 'ACTIVE' : 'DELETED',
      }).unwrap()
    } catch (error) {
      toast.error('Failed to update user status', {
        description: getErrorMessage(error),
      })
    }
  }

  // Assign Dialog
  const [openAssignDialog, setOpenAssignDialog] = useState(false)

  return (
    <>
      <ConfirmDialog
        open={openConfirmDialog}
        iconContainerClass="bg-destructive"
        icon={isDeleteDialog ? <Trush /> : null}
        onOpenChange={(v) => {
          setOpenConfirmDialog(v)
        }}
        title={isDeleteDialog ? 'Delete User' : 'Deactivate User'}
        desc={
          isDeleteDialog
            ? 'Are you sure you want to Delete this user?'
            : 'Are you sure you want to deactivate this user?'
        }
      >
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            if (isDeleteDialog) {
              onConfirmToggleDeleteUser()
            } else {
              onConfirmTogleDeactivateStatus()
            }
          }}
          variant="destructive"
        >
          {isDeleteDialog ? 'Delete' : 'Deactivate'}
        </AlertDialogAction>
      </ConfirmDialog>

      <SelectPropertyDialog
        open={openAssignDialog}
        onOpenChange={setOpenAssignDialog}
        onPropertySelect={handlePropertySelect}
      ></SelectPropertyDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-[#f6f8fa]">
            <Dot className={`h-4 w-4 ${isUserDeleted ? 'text-gray-600' : 'text-gray-500'}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[167px] bg-[#f6f8fa] p-3 shadow-xl">
          <DropdownMenuGroup>
            {isUserDeleted ? null : (
              <DropdownMenuItem
                onSelect={() => {
                  if (isUserDeactivated) {
                    onConfirmTogleDeactivateStatus()
                  } else {
                    setDialogType('DEACTIVATE')
                    setOpenConfirmDialog(true)
                  }
                }}
                disabled={isUserDeleted || isLoading}
              >
                {isUserDeactivated ? 'Active User' : 'Deactivate User'}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onSelect={() => {
                if (isUserDeleted) {
                  onConfirmToggleDeleteUser()
                } else {
                  setDialogType('DELETE')
                  setOpenConfirmDialog(true)
                }
              }}
              disabled={isLoading}
            >
              {isUserDeleted ? 'Active User' : 'Delete User'}
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => setOpenAssignDialog(true)} disabled={isUserDeleted}>
              Assign to a property
            </DropdownMenuItem>
          </DropdownMenuGroup>
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
    label: 'User Name',
    width: '20%',
    accessor: 'username',
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
      return <UserActionButton rowData={row} />
    },
  },
]
