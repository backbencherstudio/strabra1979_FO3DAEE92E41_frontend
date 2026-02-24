'use client'

import { useState, useRef, useEffect } from 'react'
import { Check,   Search, Mail } from 'lucide-react'
import ArrowDownIcon from '../icons/ArrowDownIcon'

// Mock user data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Property Manager',
    avatar: 'JD',
    properties: 12
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Senior Property Manager',
    avatar: 'JS',
    properties: 8
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'Property Manager',
    avatar: 'MJ',
    properties: 15
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'Regional Manager',
    avatar: 'SW',
    properties: 23
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    role: 'Property Manager',
    avatar: 'RB',
    properties: 5
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Assistant Manager',
    avatar: 'ED',
    properties: 3
  },
  {
    id: '7',
    name: 'David Wilson',
    email: 'david.w@example.com',
    role: 'Property Manager',
    avatar: 'DW',
    properties: 9
  },
]

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  properties: number
}

interface AssignManagerDropdownProps {
  onSelect?: (user: User) => void
  selectedUserId?: string
}

export function AssignManagerDropdown({ onSelect, selectedUserId }: AssignManagerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const selectedUser = users.find(user => user.id === selectedUserId)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelectUser = (user: User) => {
    onSelect?.(user)
    setIsOpen(false)
    setSearchValue('')
  }

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm font-medium text-[#4a4c56]  ">
        Assign a Property Manager 
      </label>
      
      <div className="relative mt-2">
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between border border-[#e7eaeb] rounded-[8px] bg-white px-4 py-3.5 text-left hover:border-[#bfcbce] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0b2a3b]"
        >
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-[#0b2a3b] flex items-center justify-center text-white text-xs font-medium">
                {selectedUser.avatar}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-[#0b2a3b]">{selectedUser.name}</span>
                <span className="text-xs text-[#5f6166]">{selectedUser.email}</span>
              </div>
            </div>
          ) : (
            <span className="text-[#5f6166]"> Assign a Property Manager</span>
          )}
          {/* <ChevronsUpDown className={`h-4 w-4 text-[#5f6166] transition-transform ${isOpen ? 'rotate-180' : ''}`} /> */}
          <ArrowDownIcon/>
          {/* <ArrowDown/> */}
        </button>

        {/* Dropdown Menu - Always opens below */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 p-4.5 bg-[#f6f8fa]    rounded-[8px] shadow-2xl z-50">
            {/* Search Input */}
            <div className="flex items-center   px-3 border rounded-[8px]">
              <Search className="mr-2 h-4 w-4 text-[#5f6166]" />
              
              <input
                placeholder="Search by name or email..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 h-11 bg-transparent py-3 text-sm outline-none placeholder:text-[#9ca3af] "
                autoFocus
              />
            </div>

            {/* Users List */}
            <div className="max-h-[220px] overflow-y-auto  ">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#f6f8fa] transition-colors border-b ${
                      selectedUserId === user.id ? 'bg-[#f0f7ff]' : ''
                    }`}
                  >
                    <div className="h-8 w-8 rounded-full bg-[#0b2a3b] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {user.avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#0b2a3b] truncate">
                          {user.name}
                        </p>
                      
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#5f6166]">
                       
                        <span className="truncate">{user.email}</span>
                      </div>
                     
                    </div>
                    
                    {selectedUserId === user.id && (
                      <Check className="h-4 w-4 text-[#0b2a3b] flex-shrink-0" />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-[#5f6166]">
                  No users found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}