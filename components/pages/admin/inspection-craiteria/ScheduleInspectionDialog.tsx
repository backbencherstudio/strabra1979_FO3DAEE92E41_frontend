// components/reusable/PropertyCard/ScheduleInspectionDialog.tsx
'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import ClockIcon from '@/components/icons/ClockIcon'

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
    
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const handleSchedule = () => {
        onSchedule?.({ propertyName, propertyAddress })
        handleOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[796px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-xl text-[#4a4c56] font-medium">
                        Schedule an Inspection
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className='mt-4'>
                    <div className='space-y-4'>
                        <div>
                            <h2 className='text-[#4a4c56] text-base font-medium'>Property</h2>
                            <p className='text-base font-medium bg-[#eceff3] text-[#4a4c56] py-3.5 px-5 rounded-[12px] mt-2 border border-[#e9e9ea]'>
                                {propertyName}
                            </p>
                        </div>

                        <div>
                            <h2 className='text-[#4a4c56] text-base font-medium'>Address</h2>
                            <p className='text-base font-medium bg-[#eceff3] text-[#4a4c56] py-3.5 px-5 rounded-[12px] mt-2 border border-[#e9e9ea]'>
                                {propertyAddress}
                            </p>
                        </div>

                        <div className='flex justify-between items-center bg-[#c7daed] py-5 px-4 rounded-3xl'>
                            <div className='flex items-center gap-1.5'>
                                <ClockIcon />
                                <p className='text-xl font-medium text-[#284b6c]'>Scheduled for</p>
                            </div>
                            <p className='text-xl font-medium text-[#284b6c]'>Wednesday, November 12, 07:15 - 08:00</p>
                        </div>

                        <div className="flex justify-center items-center gap-4">
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
                                className="w-full py-3.5 bg-[#0b2a3b] rounded-[8px] text-white hover:bg-[#1a3d4f] transition-colors"
                            >
                                Schedule Inspection
                            </button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}