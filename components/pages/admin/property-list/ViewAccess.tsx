// components/reusable/PropertyCard/ViewAccessDialog.tsx
'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ViewAccessDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    propertyName?: string
    propertyAddress?: string
}

export function ViewAccessDialog({
    open,
    onOpenChange,
    propertyName = "Sunset Office Complex",
    propertyAddress = "123 Business Ave, Suite 100"
}: ViewAccessDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-[#4a4c56] font-medium">
                        View Access Details
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#5f6166]">
                        View access information and permissions for this property
                    </DialogDescription>
                </DialogHeader>
                
                {/* Empty content - Add your access details here */}
                <div className="py-6">
                    {/* Your access details will go here */}
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button 
                        type="button" 
                        onClick={() => handleOpenChange(false)} 
                        className='w-full py-3.5 border border-[#e7eaeb] rounded-[8px] text-[#0b2a3b] hover:bg-gray-50 transition-colors'
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}