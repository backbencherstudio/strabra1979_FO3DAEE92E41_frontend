'use client'

import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { defineColumns } from '../reusable/table/CustomTable'

// ==================== Report STATUS BADGE COMPONENT ====================
const ReportStatusBadge = ({ status }: { status: string }) => {
  let textColor = ''
  let borderColor = ''
  let backgroundColor = ''

  switch (status.toLowerCase()) {
    case 'good':
      borderColor = 'border-[#D8EBE5]'
      textColor = 'text-[#008C5D]'
      backgroundColor = 'bg-[#EDFAF6]'
      break
    case 'fair':
      borderColor = 'border-[#f6e7dc]'
      textColor = 'text-[#9a6036]'
      backgroundColor = 'bg-[#fbf5db]'
      break
    case 'poor':
      borderColor = 'border-[#ffd5d5]'
      textColor = 'text-[#a12a24]'
      backgroundColor = 'bg-[#ffdede]'
      break
    default:
      borderColor = 'border-gray-400'
      textColor = 'text-gray-400'
  }

  return (
    <p
      className={`${borderColor} ${textColor} ${backgroundColor} inline-block rounded-[4px] border px-3 py-1.5 text-xs font-medium`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </p>
  )
}

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

// ==================== Report COLUMNS CONFIGURATION ====================
export const ReportManagementColumns = defineColumns<{
  id: string
  no: number
  // report: string
  property: string
  address: string
  updated_at: string
  status: string
}>([
  {
    label: 'No.',
    width: '8%',
    accessor: 'no',
    sortable: true,
    formatter: (item, row) => {
      const num = typeof item === 'string' ? parseInt(item) : item
      return (
        <div className="flex items-center">
          <p className="text-forground text-xs">{num < 10 ? `0${num}` : num}</p>
        </div>
      )
    },
  },
  {
    label: 'Last Update',
    width: '20%',
    accessor: 'updated_at',
    sortable: true,
    formatter: (value, row) => {
      return (
        <div>
          <p className="text-forground text-xs">{formatUserDate(value)}</p>
        </div>
      )
    },
  },
  // {
  //   label: 'Report',
  //   width: '18%',
  //   accessor: 'report',
  //   sortable: true,
  //   formatter: (value, row) => {
  //     return <p className="text-forground text-xs">{value}</p>
  //   },
  // },
  {
    label: 'Property',
    width: '22%',
    accessor: 'property',
    sortable: true,
    formatter: (value, row) => {
      return (
        <div>
          <p className="text-forground text-xs">{value}</p>
        </div>
      )
    },
  },
  {
    label: 'Address',
    width: '15%',
    accessor: 'address',
    sortable: true,
    formatter: (value, row) => {
      return (
        <div>
          <p className="text-forground text-xs">{value}</p>
        </div>
      )
    },
  },
  {
    label: 'Status',
    width: '12%',
    accessor: 'status',
    sortable: true,
    formatter: (value, row) => {
      return <ReportStatusBadge status={value} />
    },
  },
  // {
  //   label: '',
  //   accessor: 'id',
  //   width: '5%',
  //   formatter: (value, row) => {
  //     return (
  //       <Button asChild variant="muted" size="icon" className="rounded-full">
  //         <Link href={`/manager/property-list/${row.id}`}>
  //           <EyeIcon />
  //         </Link>
  //       </Button>
  //     )
  //   },
  // },
])

// ==================== DEMO DATA ====================
export const demoReportData = [
  {
    id: 'report_001',
    no: 1,
    report: '2024 Annual Roof Inspection Review',
    property: 'Riverside Industrial Apartments',
    address: '1234 Sunset Blvd, Los Angeles, CA 90028',
    updated_at: '2026-01-15T10:30:00Z',
    status: 'good',
  },
  {
    id: 'report_002',
    no: 2,
    report: 'Fire Safety Compliance Audit',
    property: 'Green Valley Corporate Center',
    address: '9876 Wilshire Blvd, Beverly Hills, CA 90210',
    updated_at: '2026-01-18T14:00:00Z',
    status: 'good',
  },
  {
    id: 'report_003',
    no: 3,
    report: 'HVAC System Performance Assessment',
    property: 'Sunset Plaza Mall',
    address: '450 Market St, San Francisco, CA 94103',
    updated_at: '2026-01-20T09:15:00Z',
    status: 'fair',
  },
  {
    id: 'report_004',
    no: 4,
    report: 'Elevator Safety Inspection',
    property: 'Downtown Business Tower',
    address: '200 Main St, San Diego, CA 92101',
    updated_at: '2026-01-22T11:45:00Z',
    status: 'fair',
  },
  {
    id: 'report_005',
    no: 5,
    report: 'Parking Structure Structural Review',
    property: 'Bayview Commercial Plaza',
    address: '789 Harbor Dr, Long Beach, CA 90802',
    updated_at: '2026-01-25T13:20:00Z',
    status: 'poor',
  },
  {
    id: 'report_006',
    no: 6,
    report: 'Water Damage & Plumbing Inspection',
    property: 'Oceanfront Residential Complex',
    address: '321 Ocean Ave, Santa Monica, CA 90401',
    updated_at: '2026-01-28T16:10:00Z',
    status: 'good',
  },
  {
    id: 'report_007',
    no: 7,
    report: 'Electrical System Safety Check',
    property: 'Silver Lake Office Suites',
    address: '654 Silver Lake Blvd, Los Angeles, CA 90026',
    updated_at: '2026-02-01T08:30:00Z',
    status: 'good',
  },
  {
    id: 'report_008',
    no: 8,
    report: 'Annual Structural Integrity Evaluation',
    property: 'Golden Gate Tech Park',
    address: '1200 Innovation Way, Palo Alto, CA 94301',
    updated_at: '2026-02-03T15:00:00Z',
    status: 'good',
  },
]
