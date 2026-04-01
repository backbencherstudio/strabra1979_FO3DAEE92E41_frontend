'use client'

import { useDeleteSingleInspectionWithIdMutation } from '@/api/inspectionManagement/inspectionManagementApi'
import { Button } from '@/components/ui/button'
import { formatDate, getErrorMessage, naIfEmpty } from '@/lib/farmatters'
import { IScheduledInspectinListItem } from '@/types'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import ProgressStatusBadge, {
  InspectionProgressStatus,
} from '../dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { Edit } from '../icons/Edit'
import { Trush } from '../icons/Trush'
import ConfirmDialog from '../reusable/ConfirmDialog/ConfirmDialog'
import { ColumnConfig, defineColumns } from '../reusable/table/CustomTable'
import { AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { routes } from '@/constant'

// Define ColumnConfig interface

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

// ==================== Report COLUMNS CONFIGURATION ====================
export const InspectionListManagementColums = defineColumns<{
  inspectin_id: string
  report: string
  property: string
  property_type: string
  date: string
  address: string
  status: InspectionProgressStatus
}>([
  {
    label: 'Inspection ID',
    width: '8%',
    accessor: 'inspectin_id',
    formatter: (value, row) => {
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
    formatter: (value, row) => {
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
    formatter: (value, row) => {
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
    formatter: (value, row) => {
      return (
        <div>
          <p className="text-forground text-xs">{formatDate(value)}</p>
        </div>
      )
    },
  },
  {
    label: 'Status',
    width: '12%',
    accessor: 'status',
    formatter: (value, row) => {
      return <ProgressStatusBadge status={value as InspectionProgressStatus} />
    },
  },
  {
    label: '',
    accessor: 'inspectin_id',
    width: '5%',
    formatter: (value, row) => {
      return (
        <Button asChild variant="muted" size="icon" className="rounded-full">
          <Link href={`/operation/inspection-list/${row.inspectin_id}`}>
            <EyeIcon />
          </Link>
        </Button>
      )
    },
  },
])

// ==================== Report COLUMNS CONFIGURATION ====================
export const AdminInspectionListManagementColums = defineColumns<IScheduledInspectinListItem>([
  {
    label: 'Inspection ID',
    accessor: 'inspectionId',
    formatter: (value) => naIfEmpty(value),
  },
  {
    label: 'Property',
    accessor: 'propertyName',
  },
  {
    label: 'Property Type',
    accessor: 'propertyType',
    formatter: (value) => naIfEmpty(value),
  },
  {
    label: 'Address',
    accessor: 'address',
  },
  {
    label: 'Created At',
    accessor: 'createdAt',
    formatter: (value) => formatDate(value),
  },
  {
    label: 'Next Inspection',
    accessor: 'nextInspectionDate',
    formatter: (value) => naIfEmpty(formatDate(value)),
  },
  {
    label: 'Status',
    accessor: 'status',
    formatter: (value) => {
      return <ProgressStatusBadge status={value as InspectionProgressStatus} />
    },
  },
  {
    label: '',
    accessor: 'id',
    formatter: (_, row) => <InspectinListItemAction {...row} />,
  },
])

function InspectinListItemAction({ id, inspectionId }: IScheduledInspectinListItem) {
  const [deleteSingleInspectinWithId, { isLoading }] = useDeleteSingleInspectionWithIdMutation()

  const handleDelete = async (deleteId?: string) => {
    if (!deleteId) {
      toast.error('Found invalid InspectionID')
      return
    }

    try {
      await deleteSingleInspectinWithId(deleteId).unwrap()
      toast.success('Inspection deleted successfully')
    } catch (error) {
      toast.error('Failed to delete inspection', { description: getErrorMessage(error) })
    }
  }
  const router = useRouter()

  return (
    <div className="flex gap-2">
      {/* // TODO: add view & edit option */}
      <Button
        onClick={() => {
          if (!inspectionId) {
            return
          }

          router.push(routes.admin.inspectionListItemDetail.build({ inspectionId }))
        }}
        disabled={!inspectionId}
        variant="muted"
        size="icon"
        className="rounded-full"
      >
        <EyeIcon />
      </Button>

      <Button disabled={!inspectionId} asChild variant="muted" size="icon" className="rounded-full">
        <Link href={`/admin/inspection-list/${inspectionId}`}>
          <Edit />
        </Link>
      </Button>

      <ConfirmDialog
        title="Delete Inspection Report"
        desc="Are you sure you want to delete this Inspection Report?"
        trigger={
          <Button variant="muted" size="icon" className="text-destructive rounded-full">
            <Trush />
          </Button>
        }
      >
        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={isLoading}
          onClick={() => handleDelete(id)}
          variant="destructive"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </AlertDialogAction>
      </ConfirmDialog>
    </div>
  )
}

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
