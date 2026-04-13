'use client'

import { isArrayEmpty } from '@/lib/utils'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface ColumnConfig<T, K extends keyof T = keyof T> {
  label: React.ReactNode
  accessor: K
  width?: string
  sortable?: boolean
  formatter?: (value: T[K], row: T, index: number) => React.ReactNode
}

export function defineColumns<T>(
  columns: { [K in keyof T]: ColumnConfig<T, K> }[keyof T][],
): { [K in keyof T]: ColumnConfig<T, K> }[keyof T][] {
  return columns
}

type ColumnUnion<T> = { [K in keyof T]: ColumnConfig<T, K> }[keyof T]

interface SortConfig {
  key: string
  direction: 'ascending' | 'descending'
}

interface DynamicTableProps<T> {
  columns: ColumnUnion<T>[] // matches defineColumns return type exactly
  data: T[]
  isLoading?: boolean
  currentPage?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onView?: (row: T) => void
  onDelete?: (row: T) => void
  noDataMessage?: string
  sortConfig?: SortConfig | null
  onSort?: (key: string) => void
  minWidth?: number

  headerStyles?: {
    backgroundColor?: string
    textColor?: string
    fontSize?: string
    padding?: string
    fontWeight?: string
  }
  borderColor?: string
  cellBorderColor?: string
  hasWrapperBorder?: boolean
  wrapperBorderColor?: string
  roundedClass?: string
}

export default function CustomTable<T>({
  columns,
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onView,
  onDelete,
  noDataMessage = 'No data found.',
  sortConfig,
  minWidth,

  isLoading = false,
  headerStyles = {
    backgroundColor: '#F3F4F6',
    textColor: '#4a4c56',
    fontSize: '14px',
    fontWeight: '500',
  },

  cellBorderColor = '#EDEDED',
  hasWrapperBorder = true,
  wrapperBorderColor = '#EDEDED',
  roundedClass = '',
}: DynamicTableProps<T>) {
  const totalPages = itemsPerPage ? Math.ceil(data.length / itemsPerPage) : 0
  const paginatedData = itemsPerPage
    ? data.slice(((currentPage ?? 1) - 1) * itemsPerPage, (currentPage ?? 1) * itemsPerPage)
    : data

  const renderSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="text-headerColor h-5 w-5" />
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="h-4 w-4" />
    }
    return <ChevronDown className="h-4 w-4" />
  }

  // Check if there's an actions column in the columns array
  const hasActionsColumn = columns.some(
    (col) => col.accessor === 'action' || col.accessor === 'actions',
  )

  return (
    <div className="text-gray-black-400 text-xs">
      {/* Table Wrapper with Border & Radius */}
      <div
        className={`overflow-hidden ${roundedClass}`}
        style={{
          border: hasWrapperBorder ? `1px solid ${wrapperBorderColor}` : 'none',
        }}
      >
        <div className="overflow-x-auto">
          <table className={`w-full text-left`} style={{ minWidth: `${minWidth || 1000}px` }}>
            <thead>
              <tr className="overflow-hidden rounded-t-2xl">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{
                      width: col.width || 'auto',
                      backgroundColor: headerStyles.backgroundColor,
                      color: headerStyles.textColor,
                      fontSize: headerStyles.fontSize,
                      padding: headerStyles.padding,
                      fontWeight: headerStyles.fontWeight,
                    }}
                    className={`text-descriptionColor border-b px-4 py-3 text-base font-light whitespace-nowrap capitalize`}
                  >
                    <div
                      className={`flex items-center gap-1 ${col.sortable ? 'cursor-pointer' : ''}`}
                    >
                      {col.label}
                    </div>
                  </th>
                ))}
                {/* Only show Action header if there are action buttons but no actions column */}
                {(onView || onDelete) && !hasActionsColumn && (
                  <th className="border-none px-4 py-3 text-base font-medium text-[#4a4c56]">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {isArrayEmpty(paginatedData) || isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + ((onView || onDelete) && !hasActionsColumn ? 1 : 0)}
                    className="text-gray-black-400 px-4 py-10 text-center text-sm"
                  >
                    {isLoading ? 'Loading data...' : noDataMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const isLastRow = rowIndex === paginatedData.length - 1

                  return (
                    <tr key={rowIndex} className="border-none bg-white">
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            minWidth: col.width || 'auto',
                            borderBottom: `1px solid ${cellBorderColor}`,
                          }}
                          className="px-4 py-3 text-[#4a4c56]"
                          onClick={(e) => {
                            // If this is the actions column and onView is provided, call onView
                            if (col.accessor === 'action' && onView) {
                              e.stopPropagation()
                              onView(row)
                            }
                          }}
                        >
                          {typeof col.formatter === 'function'
                            ? col.formatter(row[col.accessor], row, rowIndex)
                            : (row[col.accessor] as string)}
                        </td>
                      ))}

                      {/* Show action buttons if onView/onDelete provided but no actions column exists */}
                      {(onView || onDelete) && !hasActionsColumn && (
                        <td
                          className="flex items-center gap-4 px-4 py-3"
                          style={{
                            borderBottom: isLastRow ? 'none' : `1px solid ${cellBorderColor}`,
                          }}
                        >
                          {onView && (
                            <span
                              className="cursor-pointer text-sm text-[#4a4c56] underline"
                              onClick={() => onView(row)}
                            >
                              View details
                            </span>
                          )}
                          {onDelete && (
                            <Image
                              onClick={() => onDelete(row)}
                              src="/dashboard/icon/delete.svg"
                              alt="delete"
                              width={16}
                              height={16}
                              className="cursor-pointer"
                            />
                          )}
                        </td>
                      )}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => onPageChange && onPageChange((currentPage ?? 1) - 1)}
            disabled={(currentPage ?? 1) === 1}
            className="cursor-pointer rounded-sm bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange && onPageChange((currentPage ?? 1) + 1)}
            disabled={(currentPage ?? 1) === totalPages}
            className="cursor-pointer rounded-sm bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
