'use client'

import {
  useRevokeDashboardAccessMutation,
  useSetAccessExpirationMutation,
} from '@/api/dashboard/properties/propertiesApi'
import { Trush } from '@/components/icons/Trush'
import ConfirmDialog from '@/components/reusable/ConfirmDialog/ConfirmDialog'
import DatePickerPopover from '@/components/reusable/DatePickerPopover/DatePickerPopover'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PopoverAnchor } from '@/components/ui/popover'
import { getErrorMessage } from '@/lib/farmatters'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export interface AccessListTileActionsProps {
  accessId: string
  userId: string
  dashboardId: string
  expiresAt: string | null
  itemName: string
  mode: 'dashboard' | 'user'
}

export function AccessListTileActions({
  userId,
  itemName,
  dashboardId,
  expiresAt,
  mode,
}: AccessListTileActionsProps) {
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false)

  const [revokeDashboardAccess] = useRevokeDashboardAccessMutation()

  const onRevokeAccessClick = async (userId: string, dashboardId: string) => {
    if (!userId || !dashboardId) {
      toast.error('Unable to revoke access', {
        description: !userId ? 'User ID is missing.' : 'Dashboard ID is missing.',
      })
      return
    }

    try {
      const res = await revokeDashboardAccess({
        dashboardId,
        targetUserId: userId,
      }).unwrap()

      toast.success(res?.message ?? 'User access revoked successfully.')
    } catch (error) {
      toast.error('Failed to revoke access', { description: getErrorMessage(error) })
    }
  }

  const [setAccessExpiration] = useSetAccessExpirationMutation()

  const handleSetExpiration = async (expiresAt: string, userId: string, dashboardId: string) => {
    try {
      await setAccessExpiration({
        dashboardId,
        userId,
        accessExpiresAt: expiresAt,
      }).unwrap()

      toast.success('Access expiration updated!')
    } catch (error) {
      toast.error('Failed to update expiration', {
        description: getErrorMessage(error),
      })
    }
  }

  const [userAccessExpireAt, setUserAccessExpireAt] = useState<Date | undefined>(
    expiresAt ? new Date(expiresAt) : undefined,
  )
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const handleDatePickerOpen = () => {
    setUserAccessExpireAt(expiresAt ? new Date(expiresAt) : undefined)
    setTimeout(() => setOpenDatePicker(true), 200)
  }

  const onSelectDate = (newDate: Date | undefined) => {
    if (!userId || !dashboardId) {
      toast.error('User Info missing', {
        description: !userId ? 'User ID is missing.' : 'Dashboard ID is missing.',
      })
      return
    }

    setUserAccessExpireAt(newDate)
    setOpenDatePicker(false)

    if (!newDate) {
      toast.error('Please select a valid date')
      return
    }
    if (newDate < new Date()) {
      toast.error('Expiration date cannot be in the past')
      return
    }
    if (userAccessExpireAt && newDate.toISOString() === userAccessExpireAt.toISOString()) {
      return
    }

    handleSetExpiration(newDate.toISOString(), userId, dashboardId)
  }

  return (
    <>
      <DatePickerPopover
        date={userAccessExpireAt}
        onSelect={onSelectDate}
        open={openDatePicker}
        onOpenChange={setOpenDatePicker}
      >
        <PopoverAnchor />
      </DatePickerPopover>

      <ConfirmDialog
        open={openDeleteConfirmDialog}
        iconContainerClass="bg-destructive"
        icon={<Trush />}
        onOpenChange={setOpenDeleteConfirmDialog}
        title="Revoke Dashboard Access"
        desc={
          mode === 'dashboard'
            ? `Are you sure you want to revoke ${itemName}'s access to this dashboard?`
            : `Are you sure you want revoke access from ${itemName} Property?`
        }
      >
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onRevokeAccessClick(userId, dashboardId)}
          variant="destructive"
        >
          Revoke Access
        </AlertDialogAction>
      </ConfirmDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDatePickerOpen}>
            Set access expiration date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteConfirmDialog(true)}>
            Revoke access
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
