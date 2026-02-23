'use client'

import { LockIcon } from '@/components/icons/LockIcon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateUser: (userData: {
    username: string
    email: string
    password: string
    userRole: string
  }) => void
}

export default function CreateUserDialog({ 
  open, 
  onOpenChange, 
  onCreateUser 
}: CreateUserDialogProps) {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    userRole: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateUser(formData)
    setFormData({ username: '', email: '', password: '', userRole: '' })
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '', userRole: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[940px] [&>button]:hidden p-8" >
        <DialogHeader>
          <DialogTitle className="text-[#4a4c56] text-xl font-medium text-center">Create New User</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="username" className='text-base font-medium text-[#4a4c56] mb-2'>User Name</label>
              <input 
                type="text" 
                id="username" 
                placeholder='Enter User Name' 
                className='border border-[#e9e9ea] py-3.5 px-5 rounded-[12px] placeholder:text-[#4a4c56] focus:outline-none focus:border-[#0b2a3b] w-full'
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            <div className='flex flex-col flex-1'>
              <label htmlFor="email" className='text-base font-medium text-[#4a4c56] mb-2'>Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder='Enter Email Address' 
                className='border border-[#e9e9ea] py-3.5 px-5 rounded-[12px] placeholder:text-[#4a4c56] focus:outline-none focus:border-[#0b2a3b] w-full'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className='flex items-center gap-4 mb-6'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="password" className='text-base font-medium text-[#4a4c56] mb-2'>Password</label>
              <div className='relative'>
                <LockIcon className='absolute left-5 top-1/2 -translate-y-1/2'/>
                <input 
                  type="password" 
                  id="password" 
                  placeholder='Enter Password' 
                  className='border border-[#e9e9ea] py-3.5 pl-12 pr-5 rounded-[12px] placeholder:text-[#4a4c56] w-full focus:outline-none focus:border-[#0b2a3b]'
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <label htmlFor="userRole" className='text-base font-medium text-[#4a4c56] mb-2'>User Role</label>
              <Select 
                value={formData.userRole} 
                onValueChange={(value) => setFormData({...formData, userRole: value})}
                required
              >
                <SelectTrigger 
                  className="w-full border border-[#e9e9ea] py-3.5 px-5 rounded-[12px] h-auto focus:ring-0 focus:ring-offset-0 focus:border-[#0b2a3b] data-[placeholder]:text-[#4a4c56]"
                >
                  <SelectValue 
                    placeholder="Select user role" 
                    className="placeholder:text-[#4a4c56]"
                  />
                </SelectTrigger>
                <SelectContent className="rounded-[12px] border border-[#e9e9ea]">
                  <SelectItem value="admin" className="py-3.5 px-5 focus:bg-[#f6f8fa]">Property Manager</SelectItem>
                  <SelectItem value="manager" className="py-3.5 px-5 focus:bg-[#f6f8fa]">Authorized Viewer</SelectItem>
                  <SelectItem value="viewer" className="py-3.5 px-5 focus:bg-[#f6f8fa]">Operation</SelectItem>
                  <SelectItem value="editor" className="py-3.5 px-5 focus:bg-[#f6f8fa]">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button 
              type="button"
              onClick={handleCancel}
              className='py-3.5 flex-1 border rounded-[12px] text-base text-[#5f6166] hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button 
              type="submit"
              className='py-3.5 flex-1 bg-[#0b2a3b] text-white font-medium rounded-[12px] hover:bg-[#0b2a3b]/90 transition-colors'
            >
              Create
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}