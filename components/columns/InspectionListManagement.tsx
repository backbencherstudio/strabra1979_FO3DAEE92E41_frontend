'use client'

import { useDeleteSingleInspectionWithIdMutation } from '@/api/inspectionManagement/inspectionManagementApi'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { formatDate, getErrorMessage, naIfEmpty } from '@/lib/farmatters'
import {
  InspectionProgressStatus,
  IAdminScheduledInspectinTableItem,
  IAuthUser,
  RoleUtils,
  IAuthUserRole,
  IScheduledInspectionTableItem,
} from '@/types'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ProgressStatusBadge from '../dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { Edit } from '../icons/Edit'
import { Trush } from '../icons/Trush'
import ConfirmDialog from '../reusable/ConfirmDialog/ConfirmDialog'
import { defineColumns } from '../reusable/table/CustomTable'
import { AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'
import { IOperationalInspectionTableItem } from '@/types/operationalInspection'
import { useAuth } from '@/redux/features/auth/useAuth'

// ==================== DATE FORMATTER ====================
const formatUserDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

// ==================== Report COLUMNS CONFIGURATION ====================
export const OPERATIONAL_RECENT_INSPECTION_LIST_MANAGEMENT_COLUMS =
  defineColumns<IScheduledInspectionTableItem>([
    {
      label: 'Inspection ID',
      accessor: 'id',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Property',
      accessor: 'property',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Address',
      accessor: 'address',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Date',
      accessor: 'scheduledAt',
      formatter: (value) => naIfEmpty(formatDate(value)),
    },
    {
      label: 'Status',
      accessor: 'status',
      formatter: (value) => <ProgressStatusBadge status={value} />,
    },
    {
      label: '',
      accessor: 'id',
      formatter: (_, row) => <InspectinListItemAction {...row} />,
    },
  ])

export const OPERATIONAL_INSPECTION_LIST_MANAGEMENT_COLUMS =
  defineColumns<IOperationalInspectionTableItem>([
    {
      label: 'Inspection ID',
      accessor: 'inspectionId',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Property',
      accessor: 'propertyName',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Property Type',
      accessor: 'propertyType',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Address',
      accessor: 'address',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Date',
      accessor: 'scheduledAt',
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

// ==================== Report COLUMNS CONFIGURATION ====================
export const ADMIN_INSPECTION_LIST_MANAGEMENT_COLUMS =
  defineColumns<IAdminScheduledInspectinTableItem>([
    {
      label: 'Inspection ID',
      accessor: 'inspectionId',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Property',
      accessor: 'propertyName',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Property Type',
      accessor: 'propertyType',
      formatter: (value) => naIfEmpty(value),
    },
    {
      label: 'Address',
      accessor: 'address',
      formatter: (value) => naIfEmpty(value),
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

function InspectinListItemAction({
  id,
  inspectionId,
  dashboardId,
}: {
  id?: string
  inspectionId?: string
  dashboardId?: string
}) {
  const [deleteSingleInspectinWithId, { isLoading }] = useDeleteSingleInspectionWithIdMutation()
  const { role } = useAuth()

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
      <Button
        onClick={() => {
          if (!inspectionId || !role) {
            return
          }

          const inspectionDetailRouteByRole = {
            ADMIN: routes.admin.inspectionListItemDetail,
            OPERATIONAL: routes.operational.inspectionListItemDetail,
            PROPERTY_MANAGER: null,
            AUTHORIZED_VIEWER: null,
          } as const

          const route = inspectionDetailRouteByRole[role]
          if (!route) return // optional safety

          router.push(route.build({ inspectionId }, { dashboardId }))
        }}
        disabled={!inspectionId}
        variant="muted"
        size="icon"
        className="rounded-full"
      >
        <EyeIcon />
      </Button>

      {/* Show edit & delete only for admin */}
      {RoleUtils.isAdmin(role) ? (
        <>
          <Button
            onClick={() => {
              if (!inspectionId) {
                return
              }

              // TODO: add edit option
              router.push(
                routes.admin.inspectionListItemDetail.build(
                  { inspectionId },
                  { edit: 'true', dashboardId },
                ),
              )
            }}
            disabled={!inspectionId}
            variant="muted"
            size="icon"
            className="rounded-full"
          >
            <Edit />
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
        </>
      ) : null}
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
