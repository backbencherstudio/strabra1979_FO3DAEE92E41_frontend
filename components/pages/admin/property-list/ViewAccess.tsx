'use client'

import {
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
} from '@/api/dashboard/properties/propertiesApi'
import UserAvatar from '@/components/reusable/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getErrorMessage } from '@/lib/farmatters'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ViewAccessDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  propertyId: string
  dashboardId?: string
}

export function ViewAccessDialog({ open, onOpenChange, dashboardId }: ViewAccessDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useGetPropertyDashboardAccessListQuery(dashboardId as string, {
    skip: !dashboardId || !isOpen,
  })
  const accessList = data?.accessList

  const [revokeDashboardAccess, { isLoading: isRevokeDashboardAccessLoading }] =
    useRevokeDashboardAccessMutation()

  const onRevokeAccessClick = async (userId: string) => {
    if (!dashboardId || !userId) return

    try {
      const res = await revokeDashboardAccess({
        dashboardId,
        targetUserId: userId,
      }).unwrap()

      toast.success(res?.message ?? 'User access revoked successfully.')
    } catch (error) {
      toast.error('Failed to revoke access.', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-235" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Property Dashboard Access</DialogTitle>
          <DialogDescription className="text-center">
            View access information and permissions for this property
          </DialogDescription>
        </DialogHeader>

        <ul className="divide-y">
          {accessList?.map((item) => (
            <li key={item.accessId} className="flex items-center gap-2 py-4">
              <UserAvatar src={item?.user?.avatar ?? undefined} name={item?.user?.username} />

              <section className="flex flex-1 flex-col items-start">
                <span className="text-base font-medium">{item?.user?.username}</span>
                <span className="text-muted-foreground text-sm">{item?.user?.email}</span>
              </section>

              <section>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Set access expiration date</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRevokeAccessClick(item?.user?.id)}>
                      Revoke access
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </section>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

