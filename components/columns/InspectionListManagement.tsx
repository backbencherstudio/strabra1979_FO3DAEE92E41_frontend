'use client'

import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ProgressStatusBadge, {
  InspectionProgressStatus,
} from '../dashboard/ProgressStatusBadge/ProgressStatusBadge'

// Define ColumnConfig interface
interface ColumnConfig {
  label: React.ReactNode
  width: string
  accessor: string
  sortable?: boolean
  formatter?: (value: any, row: any) => React.ReactNode
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
export const InspectionListManagementColums: ColumnConfig[] = [
  {
    label: 'Inspection ID',
    width: '8%',
    accessor: 'inspectin_id',
    formatter: (value: string, row: any) => {
      return (
        <div className="flex items-center">
          <p className="text-forground text-xs">{value}</p>
        </div>
      )
    },
  },
  {
    label: 'Property',
    width: '44%',
    accessor: 'property',
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-forground text-xs">{value}</p>
        </div>
      )
    },
  },
  {
    label: 'Property Type',
    width: '10%',
    accessor: 'property_type',
    formatter: (value: string, row: any) => {
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
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-forground text-xs">{value}</p>
        </div>
      )
    },
  },
  {
    label: 'Date',
    width: '10%',
    accessor: 'date',
    formatter: (value: string, row: any) => {
      return (
        <div>
          <p className="text-forground text-xs">{formatUserDate(value)}</p>
        </div>
      )
    },
  },
  {
    label: 'Status',
    width: '12%',
    accessor: 'status',
    formatter: (value: string, row: any) => {
      return <ProgressStatusBadge status={value} />
    },
  },
  {
    label: '',
    accessor: 'action',
    width: '5%',
    formatter: (value: any, row: any) => {
      return (
        <Button asChild variant="muted" size="icon" className="rounded-full">
          <Link href={`/operation/inspection-list/${row.id}`}>
            <EyeIcon />
          </Link>
        </Button>
      )
    },
  },
]

// ==================== DEMO DATA ====================
export const demoInspectionData: {
  inspectin_id: string
  report: string
  property: string
  property_type: string
  date: string
  address: string
  status: InspectionProgressStatus
}[] = [
  {
    inspectin_id: 'INS-2024-001',
    report: '2024 Annual Roof Inspection Review',
    property: 'Riverside Industrial Apartments',
    property_type: 'Commercial',
    date: '2026-01-15T10:30:00Z',
    address: '1234 Sunset Blvd, Los Angeles, USA',
    status: 'ASSIGNED',
  },
  {
    inspectin_id: 'INS-2024-002',
    report: 'Quarterly Fire Safety Inspection',
    property: 'Green Valley Office Park',
    property_type: 'Commercial',
    date: '2026-01-18T09:00:00Z',
    address: '88 Market Street, San Francisco, USA',
    status: 'IN_PROGRESS',
  },
  {
    inspectin_id: 'INS-2024-003',
    report: 'Residential Plumbing & Leak Assessment',
    property: 'Oakwood Residential Complex',
    property_type: 'Residential',
    date: '2026-01-20T13:15:00Z',
    address: '450 Pine Ave, San Diego, USA',
    status: 'DUE',
  },
  {
    inspectin_id: 'INS-2024-004',
    report: 'Elevator Operational Safety Review',
    property: 'Downtown Business Tower',
    property_type: 'Commercial',
    date: '2026-01-22T11:45:00Z',
    address: '200 Main St, Chicago, USA',
    status: 'COMPLETED',
  },
  {
    inspectin_id: 'INS-2024-005',
    report: 'Electrical Wiring Safety Audit',
    property: 'Maple Heights Apartments',
    property_type: 'Residential',
    date: '2026-01-25T15:30:00Z',
    address: '72 Maple Drive, Dallas, USA',
    status: 'ASSIGNED',
  },
  {
    inspectin_id: 'INS-2024-006',
    report: 'HVAC Efficiency & Maintenance Check',
    property: 'Sunset Plaza Mall',
    property_type: 'Commercial',
    date: '2026-01-28T08:20:00Z',
    address: '900 Sunset Blvd, Miami, USA',
    status: 'IN_PROGRESS',
  },
  {
    inspectin_id: 'INS-2024-007',
    report: 'Structural Integrity Inspection',
    property: 'Lakeside Villas',
    property_type: 'Residential',
    date: '2026-02-01T10:00:00Z',
    address: '15 Lake View Rd, Seattle, USA',
    status: 'DUE',
  },
  {
    inspectin_id: 'INS-2024-008',
    report: 'Annual Safety Compliance Inspection',
    property: 'Golden Gate Tech Center',
    property_type: 'Commercial',
    date: '2026-02-03T14:40:00Z',
    address: '1200 Innovation Way, Austin, USA',
    status: 'COMPLETED',
  },
]
