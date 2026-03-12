'use client'

import { useGetUserListQuery } from '@/api/userManagement/userManagementApi'
import { IUserListItem } from '@/types'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import { Checkbox } from '../ui/checkbox'

interface AssignManagerDropdownProps {
  onSelect?: (user: IUserListItem) => void
  selectedUserId?: string
  label: React.ReactNode
}

export function AssignManagerDropdown({ onSelect, selectedUserId }: AssignManagerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  const handleSelectUser = (user: IUserListItem) => {
    onSelect?.(user)
    setIsOpen(false)
    setSearchValue('')
  }

  const { data: { data: users, meta } = {} } = useGetUserListQuery({
    page: 1,
    limit: 100,
    status: 'ACTIVE',
    role: 'PROPERTY_MANAGER',
    // search: search,
  })
  const selectedUser = Array.isArray(users)
    ? users.find((user) => user.id === selectedUserId)
    : undefined

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <div className="relative mt-2">
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-[#e7eaeb] bg-white px-4 py-3.5 text-left transition-colors hover:border-[#bfcbce] focus:ring-2 focus:ring-[#0b2a3b] focus:outline-none"
        >
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b2a3b] text-xs font-medium text-white">
                {selectedUser.avatar}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-[#0b2a3b]">{selectedUser.username}</span>
                <span className="text-xs text-[#5f6166]">{selectedUser.email}</span>
              </div>
            </div>
          ) : (
            <span className="text-[#5f6166]"> Assign a Property Manager</span>
          )}
          <ArrowDownIcon />
        </button>

        {/* Dropdown Menu - Always opens below */}
        {isOpen && (
          <div className="bg-normal-25 absolute right-0 left-0 z-50 mt-1 rounded-xl p-4.5 shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center rounded-xl border px-3">
              <Search className="mr-2 h-4 w-4 text-[#5f6166]" />

              <input
                placeholder="Search by username or email..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-11 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#9ca3af]"
                autoFocus
              />
            </div>

            {/* Users List */}
            <div className="max-h-55 overflow-y-auto">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`hover:bg-normal-25 flex cursor-pointer items-center gap-3 border-b px-3 py-2 transition-colors ${
                      selectedUserId === user.id ? 'bg-[#f0f7ff]' : ''
                    }`}
                  >
                    <Checkbox checked={selectedUserId === user.id} />

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b2a3b] text-xs font-medium text-white">
                      {user.avatar}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-[#0b2a3b]">
                          {user.username}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#5f6166]">
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-[#5f6166]">No users found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

