'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'

import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import { AssignUserDialog } from '@/components/pages/admin/property-list/AssignUserDialog'
import { ViewAccessDialog } from '@/components/pages/admin/property-list/ViewAccessDialog'

import {
  useAssignUserToPropertyMutation,
  useDeletePropertyDashboardAndAllRelatedDataMutation,
} from '@/api/dashboard/properties/propertiesApi'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/farmatters'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import { Trush } from '@/components/icons/Trush'
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { routes } from '@/constant'
import { useRouter } from 'next/navigation'

interface Props {
  dashboardId?: string
  latestInspectionId?: string
  propertyId: string
  propertyName: string
  propertyAddress: string
}

export default function PropertyCardAdminActions({
  latestInspectionId,
  dashboardId,
  propertyId,
  propertyName,
  propertyAddress,
}: Props) {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [viewAccessDialogOpen, setViewAccessDialogOpen] = useState(false)

  const [assignUser] = useAssignUserToPropertyMutation()
  const router = useRouter()

  function openLatestInspection() {
    if (!dashboardId || !latestInspectionId) {
      toast.error('Unable to open the latest inspection. Missing required data.')
      return
    }

    const path = routes.admin.inspectionListItemDetail.build(
      { dashboardId },
      { edit: 'true', inspectionId: latestInspectionId },
    )
    router.push(path)
  }

  const handleAssign = async (userId?: string) => {
    setAssignDialogOpen(false)

    if (!userId || !dashboardId) {
      toast.error('Missing required information')
      return
    }

    try {
      const res = await assignUser({
        dashboardId,
        userId,
      }).unwrap()

      toast.success(res.message ?? 'User assigned successfully')
    } catch (error) {
      toast.error('Failed to assign user', {
        description: getErrorMessage(error),
      })
    }
  }

  const [deletePropertyDashboardAndAllRelatedData, { isLoading: isDeleting }] =
    useDeletePropertyDashboardAndAllRelatedDataMutation()

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const handleDelete = async (dashboardId?: string) => {
    if (!dashboardId) {
      toast.error('Unable to delete property', {
        description: 'Missing property dashboard ID.',
      })
      return
    }

    try {
      const res = await deletePropertyDashboardAndAllRelatedData({
        dashboardId,
      }).unwrap()

      toast.success('Property deleted successfully', {
        description: res.message ?? 'The property and all related data have been removed.',
      })
    } catch (error) {
      toast.error('Failed to delete property', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <>
      {/* Dropdown */}
      <div className="absolute top-3 right-3 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border-hover-50 h-8 w-8 border bg-[#bfcbce] shadow-lg hover:bg-[#bfcbce]/50"
            >
              <MoreVertical className="h-4 w-4 text-white hover:text-black" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem onSelect={() => setScheduleDialogOpen(true)}>
              Schedule Inspection
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => setAssignDialogOpen(true)}>
              Assign a Property Manager
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => setViewAccessDialogOpen(true)}>
              View Access Details
            </DropdownMenuItem>

            <DropdownMenuItem disabled={!latestInspectionId} onSelect={openLatestInspection}>
              Edit Latest Inspection
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isDeleting}
              variant="destructive"
              onSelect={() => setOpenConfirmDialog(true)}
            >
              Delete Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialogs */}
      <ScheduleInspectionDialog
        dashboardId={dashboardId}
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        propertyName={propertyName}
        propertyAddress={propertyAddress}
        onScheduleComplete={() => setScheduleDialogOpen(false)}
      />

      <AssignUserDialog
        dialogTitle="Assign a Property Manager"
        label="Propery Manager"
        userType="PROPERTY_MANAGER"
        placeholder="Select a propery manager"
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        onSelect={handleAssign}
      />

      <ViewAccessDialog
        mode="dashboard"
        open={viewAccessDialogOpen}
        onOpenChange={setViewAccessDialogOpen}
        dashboardId={dashboardId}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        iconContainerClass="bg-destructive"
        descriptionClass={cn('max-w-100')}
        icon={<Trush />}
        onOpenChange={(v) => {
          setOpenConfirmDialog(v)
        }}
        title="Delete Property"
        desc="Are you sure you want to delete this property? This action will permanently remove the property, its inspections, and all related data."
      >
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <AlertDialogAction onClick={() => handleDelete(dashboardId)} variant="destructive">
          {isDeleting ? 'Deleting...' : 'Delete Property'}
        </AlertDialogAction>
      </ConfirmDialog>
    </>
  )
}
