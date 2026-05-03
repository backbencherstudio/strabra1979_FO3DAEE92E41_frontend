'use client'

import { useDeleteSingleInspectionWithIdMutation } from '@/api/inspectionManagement/inspectionManagementApi'
import { Button } from '@/components/ui/button'
import { routes } from '@/constant'
import { formatDate, getErrorMessage, naIfEmpty } from '@/lib/farmatters'
import { useAuth } from '@/redux/features/auth/useAuth'
import {
  IAdminScheduledInspectinTableItem,
  InspectionProgressStatus,
  IScheduledInspectionTableItem,
  RoleUtils,
} from '@/types'
import { IOperationalInspectionTableItem } from '@/types/operationalInspection'
import { EyeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ProgressStatusBadge from '../dashboard/ProgressStatusBadge/ProgressStatusBadge'
import { Edit } from '../icons/Edit'
import { Trush } from '../icons/Trush'
import ConfirmDialog from '../reusable/ConfirmDialog/ConfirmDialog'
import { defineColumns } from '../reusable/table/CustomTable'
import { AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'

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
          if (!dashboardId || !role) {
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

          router.push(route.build({ dashboardId }, { inspectionId }))
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
              if (!dashboardId) {
                return
              }

              router.push(
                routes.admin.inspectionListItemDetail.build(
                  { dashboardId },
                  { edit: 'true', inspectionId, scheduledInspectionId: id },
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
