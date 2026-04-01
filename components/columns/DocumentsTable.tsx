'use client'

import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { defineColumns } from '../reusable/table/CustomTable'

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

type DocumentsTableItem = {
  no: number
  id: string
  report: string
  size: string
  address: string
  updated_at: string
}

// ==================== Report COLUMNS CONFIGURATION ====================
export const DocumentsTableColumns = defineColumns<DocumentsTableItem>([
  {
    label: 'Name',
    width: '65%',
    accessor: 'report',
    sortable: true,
    formatter: (value, row) => {
      return <p className="text-forground text-xs">{value}</p>
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
  {
    label: 'File Size',
    width: '10%',
    accessor: 'size',
    sortable: true,
    formatter: (value, row) => {
      return (
        <div>
          <p className="text-forground text-xs uppercase">{value}</p>
        </div>
      )
    },
  },
  {
    label: '',
    accessor: 'no',
    width: '5%',
    formatter: (value, row) => {
      return (
        <Button asChild variant="muted" size="icon" className="rounded-full">
          <Link href={`#`}>
            {/* <Link href={`/property/${row.id}/reports`}> */}
            <EyeIcon />
          </Link>
        </Button>
      )
    },
  },
])

// ==================== DEMO DATA ====================
export const demoDocumentsData: DocumentsTableItem[] = [
  {
    id: 'report_001',
    no: 1,
    report: '2024 Annual Roof Inspection Review',
    size: '3.7mb',
    address: '1234 Sunset Blvd, Los Angeles, CA 90028',
    updated_at: '2026-01-15T10:30:00Z',
  },
  {
    id: 'report_002',
    no: 2,
    report: 'Fire Safety Compliance Audit',
    size: '1.9mb',
    address: '9876 Wilshire Blvd, Beverly Hills, CA 90210',
    updated_at: '2026-01-18T14:00:00Z',
  },
  {
    id: 'report_003',
    no: 3,
    report: 'HVAC System Performance Assessment',
    size: '4.3mb',
    address: '450 Market St, San Francisco, CA 94103',
    updated_at: '2026-01-20T09:15:00Z',
  },
  {
    id: 'report_004',
    no: 4,
    report: 'Elevator Safety Inspection',
    size: '2.0mb',
    address: '200 Main St, San Diego, CA 92101',
    updated_at: '2026-01-22T11:45:00Z',
  },
  {
    id: 'report_005',
    no: 5,
    report: 'Parking Structure Structural Review',
    size: '3.7mb',
    address: '789 Harbor Dr, Long Beach, CA 90802',
    updated_at: '2026-01-25T13:20:00Z',
  },
  {
    id: 'report_006',
    no: 6,
    report: 'Water Damage & Plumbing Inspection',
    size: '3.7mb',
    address: '321 Ocean Ave, Santa Monica, CA 90401',
    updated_at: '2026-01-28T16:10:00Z',
  },
  {
    id: 'report_007',
    no: 7,
    report: 'Electrical System Safety Check',
    size: '3.7mb',
    address: '654 Silver Lake Blvd, Los Angeles, CA 90026',
    updated_at: '2026-02-01T08:30:00Z',
  },
  {
    id: 'report_008',
    no: 8,
    report: 'Annual Structural Integrity Evaluation',
    size: '3.7mb',
    address: '1200 Innovation Way, Palo Alto, CA 94301',
    updated_at: '2026-02-03T15:00:00Z',
  },
]
