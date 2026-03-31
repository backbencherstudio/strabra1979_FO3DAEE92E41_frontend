'use client'

import ClockIcon from '@/components/icons/ClockIcon'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getErrorMessage } from '@/lib/farmatters'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { AssignUserDialog } from './AssignUserDialog'
import { convertTimeSelectorToISOString, TimeSelector, TimeSelectorValue } from './TimeSelector'
import { useScheduleInspectionMutation } from '@/api/inspectionManagement/inspectionManagementApi'

interface ScheduleInspectionDialogProps {
  open?: boolean
  dashboardId?: string
  onOpenChange?: (open: boolean) => void
  onScheduleComplete?: (data: unknown) => void
  propertyName?: string
  propertyAddress?: string
}

export function ScheduleInspectionDialog({
  open,
  onOpenChange,
  onScheduleComplete,
  dashboardId,
  propertyName = '',
  propertyAddress = '',
}: ScheduleInspectionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<TimeSelectorValue | undefined>({
    hour: '12',
    minute: '00',
    period: 'AM',
  })

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleScheduleDateConfirm = () => {
    // onSchedule?.({
    //   propertyName,
    //   propertyAddress,
    //   inspectionDate: selectedDate,
    // })
    handleOpenChange(false)
    setAssignUserDialogOpen(true)
  }

  // Format the selected date for display
  const formattedDate = selectedDate
    ? format(selectedDate, 'EEEE, MMMM d, yyyy')
    : 'No date selected'

  const infoList = [
    { label: 'Property', value: propertyName },
    { label: 'Address', value: propertyAddress },
  ]

  const [assignUserDialogOpen, setAssignUserDialogOpen] = useState(false)
  const [scheduleInspection, { isLoading: isLoadingScheduleInspection }] =
    useScheduleInspectionMutation()

  const handleAssignInspectorConfirm = async (userId?: string, dashboardId?: string) => {
    if (!userId || !dashboardId || !selectedDate || !selectedTime) {
      toast.error('Missing required information', {
        description: 'Please select user, date and time before confirming.',
      })
      return
    }

    try {
      await scheduleInspection({
        dashboardId: dashboardId,
        scheduledAt: convertTimeSelectorToISOString(selectedDate, selectedTime),
        assignedTo: userId,
      }).unwrap()

      setAssignUserDialogOpen(false)
      toast.success('Inspection scheduled successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create inspection!', {
        description: getErrorMessage(error),
      })
    }
  }

  return (
    <div>
      {/* Assign propery manager Dialog */}
      <AssignUserDialog
        isLoading={isLoadingScheduleInspection}
        // TODO: show previous selected user with selectedUserId
        // selectedUserId=''
        dialogTitle="Assign a Inspector"
        label="Inspector"
        userType="OPERATIONAL"
        placeholder="Select a inspector"
        open={assignUserDialogOpen}
        onOpenChange={setAssignUserDialogOpen}
        onSelect={(userId) => {
          handleAssignInspectorConfirm(userId, dashboardId)
        }}
      />

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[796px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-medium text-[#4a4c56]">
              Schedule an Inspection
            </DialogTitle>
            <DialogDescription className="sr-only mt-2 text-center">
              Select a date for the property inspection
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Property Info */}
            {infoList.map((item) => (
              <div key={item.label}>
                <h2 className="text-gray-black-400 text-base font-medium">{item.label}</h2>
                <p className="border-gray-black-50 bg-hover-50 text-gray-black-400 squircle mt-2 border px-5 py-3.5 text-base font-medium">
                  {item.value}
                </p>
              </div>
            ))}

            {/* calender and time picker */}
            <div className="flex items-start gap-4">
              <section className="bg-normal-25 border-hover-50 squircle flex-1 overflow-hidden border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  defaultMonth={selectedDate}
                  className="w-full bg-transparent"
                />
              </section>
              <section className="bg-normal-25 border-hover-50 squircle flex-1 overflow-hidden border">
                <p className="border-b py-3 text-center text-base font-medium">Set time</p>
                <TimeSelector defaultValue={selectedTime} onTimeChange={setSelectedTime} />
              </section>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="flex items-center justify-between rounded-xl bg-[#c7daed] px-4 py-5">
                <div className="flex items-center gap-1.5">
                  <ClockIcon />
                  <p className="text-xl font-medium text-[#284b6c]">Scheduled for</p>
                </div>
                <p className="text-xl font-medium text-[#284b6c]">{formattedDate}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 *:flex-1">
              <Button
                variant="outline"
                type="button"
                onClick={() => handleOpenChange(false)}
                disabled={!selectedDate}
                size="xl"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleScheduleDateConfirm}
                disabled={!selectedDate}
                size="xl"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
