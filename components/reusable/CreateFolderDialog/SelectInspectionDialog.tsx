'use client'

import { useGetInspectionReportsWithDashboardIdQuery } from '@/api/inspectionManagement/folderManagementApi'
import { PlusSignSquare } from '@/components/icons/File'
import { Button } from '@/components/ui/button'
import { isArrayEmpty } from '@/lib/utils'
import { IFolderInspectionReportSelectItem } from '@/types'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Checkbox } from '../../ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../ui/input-group'

interface SelectInspectionDialogProps {
  onSelect?: (id: string) => void
  dashboardId: string

  selectedIds: IFolderInspectionReportSelectItem[]
  setSelectedIds: Dispatch<SetStateAction<IFolderInspectionReportSelectItem[]>>
}

export function SelectInspectionDialog({
  onSelect,
  dashboardId,

  selectedIds,
  setSelectedIds,
}: SelectInspectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  function toggleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  const [searchValue, setSearchValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleOpenChange(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOnSelect = (newItem: IFolderInspectionReportSelectItem) => {
    setSelectedIds((prevIds) =>
      prevIds.some((item) => item.id === newItem.id)
        ? prevIds.filter((item) => item.id !== newItem.id)
        : [...prevIds, newItem],
    )
    onSelect?.(newItem.id)
  }

  const { data: { data: inspectionReports = [] } = {} } =
    useGetInspectionReportsWithDashboardIdQuery({ dashboardId }, { skip: !dashboardId })

  return (
    <div className="relative mt-2" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        type="button"
        size="xl"
        className="border-border/50 w-full border-2 border-dashed"
        onClick={() => toggleOpenChange(true)}
      >
        <PlusSignSquare />
        <span className="text-foreground text-sm whitespace-nowrap">Add Documents</span>
      </Button>

      {/* Dropdown Menu - Always opens below */}
      {isOpen && (
        <div className="bg-normal-25 absolute right-0 left-0 z-50 mt-1 space-y-2 rounded-xl p-4.5 shadow-2xl">
          {/* Search Input */}
          <InputGroup className="h-11">
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-11 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#9ca3af]"
              autoFocus
            />
          </InputGroup>

          {/* Users List */}
          <div className="max-h-55 overflow-y-auto">
            {!isArrayEmpty(inspectionReports) ? (
              inspectionReports.map((item) => (
                <div
                  key={item.id}
                  className={`hover:bg-normal-25 flex items-center gap-3 px-3 py-2 transition-colors not-last:border-b ${
                    selectedIds.some((selected) => selected.id === item.id) ? 'bg-[#f0f7ff]' : ''
                  }`}
                >
                  <Checkbox
                    onClick={() => handleOnSelect(item)}
                    checked={selectedIds.some((selected) => selected.id === item.id)}
                  />
                  <div>{item.title}</div>
                  <div>{item.createdAt}</div>
                </div>
              ))
            ) : (
              <div className="text-shadow-muted py-6 text-center text-sm">No Ac</div>
            )}
          </div>

          <section className="flex gap-3">
            <Button
              variant="outline"
              type="button"
              size="xl"
              className="flex-1"
              onClick={() => toggleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              size="xl"
              className="flex-1"
              onClick={() => toggleOpenChange(false)}
            >
              Select
            </Button>
          </section>
        </div>
      )}
    </div>
  )
}
