// components/reusable/PropertyCard/AssignInspectorDialog.tsx
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

interface AssignInspectorDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onAssign?: (data: any) => void
    propertyName?: string
    propertyAddress?: string
}

export function AssignInspectorDialog({
    open,
    onOpenChange,
    onAssign,
    propertyName = "Sunset Office Complex",
    propertyAddress = "123 Business Ave, Suite 100"
}: AssignInspectorDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const handleAssign = () => {
        onAssign?.({ propertyName, propertyAddress })
        handleOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-[#4a4c56] font-medium">
                        Assign Inspector
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#5f6166]">
                        Select an inspector to assign to this property
                    </DialogDescription>
                </DialogHeader>
                
                {/* Empty content - Add your form fields here */}
                <div className="py-6">
                    {/* Your form will go here */}
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
                        onClick={handleAssign}
                        className="w-full py-3.5 bg-[#0b2a3b] rounded-[8px] text-white hover:bg-[#1a3d4f] transition-colors"
                    >
                        Assign Inspector
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}