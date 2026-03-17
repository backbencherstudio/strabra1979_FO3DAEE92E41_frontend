'use client'

import { useGetUserListQuery } from '@/api/userManagement/userManagementApi'
import { IAuthUserRole, IUserListItem } from '@/types'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ArrowDownIcon from '../../icons/ArrowDownIcon'
import { Checkbox } from '../../ui/checkbox'
import UserAvatar from '../UserAvatar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../ui/input-group'
import { cn, isArrayEmpty } from '@/lib/utils'

interface AssignManagerDropdownProps {
  onSelect?: (user: IUserListItem) => void
  selectedUserId?: string
  placeholder: React.ReactNode
  userType?: IAuthUserRole
}

export function SelectUserDropdown({
  onSelect,
  selectedUserId,
  placeholder = 'Select user',
  userType,
}: AssignManagerDropdownProps) {
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

  const { data: { data: userList, meta } = {} } = useGetUserListQuery({
    page: 1,
    limit: 100,
    status: 'ACTIVE',
    role: userType,
    // search: search,
  })
  const selectedUser = Array.isArray(userList)
    ? userList.find((user) => user.id === selectedUserId)
    : undefined

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <div className="relative mt-2">
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="squircle text-muted-foreground flex h-14 w-full items-center justify-between border border-[#e7eaeb] bg-white px-4 text-left transition-colors hover:border-[#bfcbce] focus:ring-2 focus:ring-[#0b2a3b] focus:outline-none"
        >
          {selectedUser ? (
            <UserItem user={selectedUser} />
          ) : (
            <span className="text-sm">{placeholder}</span>
          )}
          <ArrowDownIcon />
        </button>

        {/* Dropdown Menu - Always opens below */}
        {isOpen && (
          <div className="bg-normal-25 absolute right-0 left-0 z-50 mt-1 rounded-xl p-4.5 shadow-2xl">
            {/* Search Input */}
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by username or email..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-11 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#9ca3af]"
                autoFocus
              />
            </InputGroup>

            {/* Users List */}
            <div className="max-h-55 overflow-y-auto">
              {!isArrayEmpty(userList) ? (
                userList.map((user) => (
                  <div
                    key={user.id}
                    className={`hover:bg-normal-25 flex items-center gap-3 border-b px-3 py-2 transition-colors ${
                      selectedUserId === user.id ? 'bg-[#f0f7ff]' : ''
                    }`}
                  >
                    <Checkbox
                      onClick={() => handleSelectUser(user)}
                      checked={selectedUserId === user.id}
                    />
                    <UserItem onClick={() => handleSelectUser(user)} user={user} />
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

interface UserItemProps extends React.ComponentProps<'div'> {
  user: IUserListItem
}

function UserItem({ user, className, ...props }: UserItemProps) {
  return (
    <div {...props} className={cn('flex flex-1 cursor-pointer items-center gap-3', className)}>
      <UserAvatar className="" name={user.username} src={user.avatar} />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-[#0b2a3b]">{user.username}</span>
        <span className="text-xs">{user.email}</span>
      </div>
    </div>
  )
}
