// components/reusable/PropertyCard/AddNewDialog.tsx
'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface AddNewDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onAdd?: (data: any) => void
    trigger?: React.ReactNode
    children?: React.ReactNode
}

export function AddNewDialog({
    open,
    onOpenChange,
    onAdd,
    trigger,
    children
}: AddNewDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const handleAdd = () => {
        onAdd?.({})
        handleOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}
            {children && !trigger && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center text-[#4a4c56] font-medium">
                        Create New Property Dashboard
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#5f6166]">
                        Set up a dashboard to manage inspections, and all property reports.
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
                        onClick={handleAdd}
                        className="w-full py-3.5 bg-[#0b2a3b] rounded-[8px] text-white hover:bg-[#1a3d4f] transition-colors"
                    >
                        Create New
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}