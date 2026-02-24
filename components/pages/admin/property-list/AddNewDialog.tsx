 
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import CalenderIcon from '@/components/icons/CalenderIcon'
import { AssignManagerDropdown } from '@/components/reusable/AssignManagerDropdown'

// Define the User type
interface User {
    id: string
    name: string
    email: string
    role: string
    avatar: string
    properties: number
}

interface AddNewDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onAdd?: (data: any) => void
    trigger?: React.ReactNode
    children?: React.ReactNode
}

interface FormData {
    propertyName: string
    address: string
    propertyType: string
    userRole: string
}

export function AddNewDialog({
    open,
    onOpenChange,
    onAdd,
    trigger,
    children
}: AddNewDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        propertyName: '',
        address: '',
        propertyType: '',
        userRole: ''
    })
    const [date, setDate] = useState<Date>()
    const [selectedManager, setSelectedManager] = useState<User | null>(null)

    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const handleSelectManager = (user: User) => {
        setSelectedManager(user)
        console.log('Selected manager:', user)
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const handleAdd = () => {
        // Include selectedManager and date in the data
        onAdd?.({
            ...formData,
            selectedManager,
            inspectionDate: date
        })
        handleOpenChange(false)
        // Reset form
        setFormData({
            propertyName: '',
            address: '',
            propertyType: '',
            userRole: ''
        })
        setDate(undefined)
        setSelectedManager(null)
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
            <DialogContent className="sm:max-w-[940px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-xl text-center text-[#4a4c56] font-medium">
                        Create New Property Dashboard
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#5f6166] text-sm mt-2">
                        Set up a dashboard to manage inspections, and all property reports.
                    </DialogDescription>
                </DialogHeader>

                {/* Form fields */}
                <div className="space-y-4">
                    {/* First row - Property Name and Address */}
                    <div className='flex items-center gap-4'>
                        <div className='flex-1'>
                            <h2 className='text-[#4a4c56] text-base font-medium'>
                                Property Name <span className='text-[#eb3d4d]'>*</span>
                            </h2>
                            <input
                                type="text"
                                placeholder='Enter property name'
                                value={formData.propertyName}
                                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                                className='w-full py-3.5 px-4 mt-2 rounded-[8px] border border-[#e7eaeb] focus:outline-none focus:ring-2 focus:ring-[#0b2a3b]'
                            />
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-[#4a4c56] text-base font-medium'>
                                Address <span className='text-[#eb3d4d]'>*</span>
                            </h2>
                            <input
                                type="text"
                                placeholder='Enter Address'
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className='w-full py-3.5 px-4 mt-2 rounded-[8px] border border-[#e7eaeb] focus:outline-none focus:ring-2 focus:ring-[#0b2a3b]'
                            />
                        </div>
                    </div>

                    {/* Second row - Property Type and Next Inspection */}
                    <div className='flex items-center gap-4'>
                        <div className='flex-1'>
                            <h2 className='text-[#4a4c56] text-base font-medium'>
                                Property Type
                            </h2>
                            <Select
                                value={formData.propertyType}
                                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                            >
                                <SelectTrigger
                                    className="w-full py-3.5 px-4 mt-2 rounded-[8px] border border-[#e7eaeb] h-auto focus:ring-2 focus:ring-[#0b2a3b] focus:outline-none"
                                >
                                    <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-[8px] border border-[#e9e9ea]">
                                    <SelectItem value="residential" className="py-3.5 px-4 focus:bg-[#f6f8fa]">Residential</SelectItem>
                                    <SelectItem value="commercial" className="py-3.5 px-4 focus:bg-[#f6f8fa]">Commercial</SelectItem>
                                    <SelectItem value="industrial" className="py-3.5 px-4 focus:bg-[#f6f8fa]">Industrial</SelectItem>
                                    <SelectItem value="mixed-use" className="py-3.5 px-4 focus:bg-[#f6f8fa]">Mixed Use</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex-1'>
                            <h2 className='text-[#4a4c56] text-base font-medium mb-2'>
                                Next Inspection
                            </h2>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="w-full">
                                        <Button
                                            variant="outline"
                                            data-empty={!date}
                                            className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal w-full h-auto py-4 rounded-[12px]"
                                        >
                                            {date ? format(date, "PPP") : <span>Set a date for next Inspection</span>}
                                            <CalenderIcon />
                                        </Button>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        defaultMonth={date}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Assign Property Manager */}
                    <div className="mt-4">
                        <AssignManagerDropdown
                            onSelect={handleSelectManager}
                            selectedUserId={selectedManager?.id}
                        />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center items-center gap-4 mt-6">
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
                        Create
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}