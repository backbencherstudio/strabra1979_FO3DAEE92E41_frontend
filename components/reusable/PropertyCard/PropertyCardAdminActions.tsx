'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'

import { ScheduleInspectionDialog } from '@/components/pages/admin/property-list/ScheduleInspectionDialog'
import { AssignUserDialog } from '@/components/pages/admin/property-list/AssignUserDialog'
import { ViewAccessDialog } from '@/components/pages/admin/property-list/ViewAccessDialog'

import { useAssignUserToPropertyMutation } from '@/api/dashboard/properties/propertiesApi'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/farmatters'

interface Props {
  dashboardId?: string
  propertyId: string
  propertyName: string
  propertyAddress: string
}

export default function PropertyCardAdminActions({
  dashboardId,
  propertyId,
  propertyName,
  propertyAddress,
}: Props) {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [viewAccessDialogOpen, setViewAccessDialogOpen] = useState(false)

  const [assignUser] = useAssignUserToPropertyMutation()

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
        mode='dashboard'
        open={viewAccessDialogOpen}
        onOpenChange={setViewAccessDialogOpen}
        dashboardId={dashboardId}
      />
    </>
  )
}
