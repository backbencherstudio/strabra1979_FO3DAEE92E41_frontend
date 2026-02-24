// components/reusable/PropertyCard/ScheduleInspectionDialog.tsx
'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import ClockIcon from '@/components/icons/ClockIcon'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TimeSelector } from './TimeSelector'

interface ScheduleInspectionDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSchedule?: (data: any) => void
    propertyName?: string
    propertyAddress?: string
}

export function ScheduleInspectionDialog({
    open,
    onOpenChange,
    onSchedule,
    propertyName = "Sunset Office Complex",
    propertyAddress = "123 Business Ave, Suite 100"
}: ScheduleInspectionDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const handleSchedule = () => {
        onSchedule?.({ 
            propertyName, 
            propertyAddress,
            inspectionDate: selectedDate 
        })
        handleOpenChange(false)
    }

    // Format the selected date for display
    const formattedDate = selectedDate 
        ? format(selectedDate, "EEEE, MMMM d, yyyy")
        : "No date selected"

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[796px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-[#4a4c56] font-medium">
                        Schedule an Inspection
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#5f6166] text-sm mt-2">
                        Select a date for the property inspection
                    </DialogDescription>
                </DialogHeader>
                
                <div className='space-y-4 mt-4'>
                    {/* Property Info */}
                    <div>
                        <h2 className='text-[#4a4c56] text-base font-medium'>Property</h2>
                        <p className='text-base font-medium bg-[#eceff3] text-[#4a4c56] py-3.5 px-5 rounded-[12px] mt-2 border border-[#e9e9ea]'>
                            {propertyName}
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <h2 className='text-[#4a4c56] text-base font-medium'>Address</h2>
                        <p className='text-base font-medium bg-[#eceff3] text-[#4a4c56] py-3.5 px-5 rounded-[12px] mt-2 border border-[#e9e9ea]'>
                            {propertyAddress}
                        </p>
                    </div>

                {/* calender and date */}
                <div className=' flex items-start'>
                    <div className=' flex-1'>
<Calendar
    mode="single"
    selected={selectedDate}
    onSelect={setSelectedDate}
    defaultMonth={selectedDate}
    // className="w-[300px] "
    
   
/>

                    </div>
                    <div className=' flex-1'>
<TimeSelector/>

                    </div>

                </div>

                

                    {/* Selected Date Display */}
                    {selectedDate && (
                        <div className='flex justify-between items-center bg-[#c7daed] py-5 px-4 rounded-3xl'>
                            <div className='flex items-center gap-1.5'>
                                <ClockIcon />
                                <p className='text-xl font-medium text-[#284b6c]'>Scheduled for</p>
                            </div>
                            <p className='text-xl font-medium text-[#284b6c]'>
                                {formattedDate}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={() => handleOpenChange(false)} 
                            className='w-full py-3.5 border border-[#e7eaeb] rounded-[8px] text-[#0b2a3b] hover:bg-gray-50 transition-colors'
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSchedule}
                            disabled={!selectedDate}
                            className={`w-full py-3.5 rounded-[8px] text-white transition-colors ${
                                selectedDate 
                                    ? 'bg-[#0b2a3b] hover:bg-[#1a3d4f] cursor-pointer' 
                                    : 'bg-[#bfcbce] cursor-not-allowed'
                            }`}
                        >
                            Schedule Inspection
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}