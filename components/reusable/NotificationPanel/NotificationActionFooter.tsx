'use client'

import { useReviewAccessRequestMutation } from '@/api/notification/notificationApi'
import { useUpdateUserStatusMutation } from '@/api/userManagement/userManagementApi'
import { Button } from '@/components/ui/button'
import { getDashboardPathWithRole, routes } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { useAuth } from '@/redux/features/auth/useAuth'
import { INotificationItem, IUserStatus, NotificationType, RoleUtils } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  handleInvalidNotificationMeta,
  hasDashboardAndInspectionId,
  hasDashboardId,
  hasRequestId,
  hasUserId,
} from './utils'

type NotificationAction = {
  label: string
  // label: 'Approve' | 'Decline'
  action: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'muted' | 'ghost' | 'link'
}
type NotificationActionMap = Partial<Record<NotificationType, NotificationAction[]>>

export type INotificationMeta = {
  access_request: {
    requestId: string
    hasActions: boolean
    dashboardId: string
    requesterId: string
    propertyName: string
    requesterName: string
    requesterEmail: string
  }
  new_user_approval_request: {
    hasActions: boolean
    userId: string
    userName: string
    userRole: string
  }
  common: {
    link: string
    propertyId: string
    inspectionId: string
    dashboardId: string
    propertyName: string
  }
}

interface NotificationActionFooterProps {
  item: INotificationItem
  closePanel: () => void
}

export const NotificationActionFooter = ({ item, closePanel }: NotificationActionFooterProps) => {
  const router = useRouter()
  const { role } = useAuth()
  const isOperationalRole = RoleUtils.isOperational(role)

  const { notification_event } = item
  const [reviewAccessRequest, { isLoading: isLoadingReviewAccessRequest }] =
    useReviewAccessRequestMutation()
  const [updateUserStatus, { isLoading: updatingUserStatus }] = useUpdateUserStatusMutation()

  async function onConfirmTogleDeactivateStatus(userId: string, status: IUserStatus) {
    if (updatingUserStatus) return

    try {
      await updateUserStatus({
        id: userId,
        status,
      }).unwrap()

      toast.message('New user approved successfully')
    } catch (error) {
      toast.error('Failed to approved user', {
        description: getErrorMessage(error),
      })
    }
  }

  const navigateToDashboardAction: NotificationAction = {
    label: isOperationalRole ? 'View Inspectins' : 'View Property',
    variant: 'outline',
    action() {
      if (!hasDashboardId(item.metadata) || !role) {
        handleInvalidNotificationMeta(item.metadata)
        return
      }

      const { dashboardId } = item.metadata

      if (isOperationalRole) {
        router.push(routes.operational.inspectionList)
      } else {
        router.push(getDashboardPathWithRole(role, dashboardId))
      }

      setTimeout(closePanel, 100)
    },
  }

  const ACTION_EVENTS: NotificationActionMap = {
    access_request: [
      {
        label: 'Approve Dashboard',
        variant: 'default',
        async action() {
          if (!hasDashboardId(item.metadata) || !hasRequestId(item.metadata)) {
            handleInvalidNotificationMeta(item.metadata)
            return
          }

          const { dashboardId, requestId } = item.metadata

          try {
            await reviewAccessRequest({
              dashboardId: dashboardId,
              requestId: requestId,
              action: 'APPROVED',
            }).unwrap()

            toast.success('Access request approved successfully')
          } catch (error) {
            toast.error('Failed to approve access request', {
              description: getErrorMessage(error),
            })
          }
        },
      },
      {
        label: 'Decline',
        variant: 'outline',
        async action() {
          if (!hasDashboardId(item.metadata) || !hasRequestId(item.metadata)) {
            handleInvalidNotificationMeta(item.metadata)
            return
          }

          const { dashboardId, requestId } = item.metadata

          try {
            await reviewAccessRequest({
              dashboardId: dashboardId,
              requestId: requestId,
              action: 'DECLINED',
              declineReason: 'Access is only available after contract signing.',
            }).unwrap()

            toast.success('Access request declined successfully')
          } catch (error) {
            toast.error('Failed to decline access request', {
              description: getErrorMessage(error),
            })
          }
        },
      },
    ],
    new_user_approval_request: [
      {
        label: 'Approve User',
        variant: 'default',
        action() {
          if (!hasUserId(item.metadata)) {
            handleInvalidNotificationMeta(item.metadata)
            return
          }

          const { userId } = item.metadata

          onConfirmTogleDeactivateStatus(userId, 'ACTIVE')
        },
      },
      {
        label: 'Decline Request',
        variant: 'outline',
        action() {},
      },
    ],
    new_user_registration: [
      {
        label: 'Approve User',
        variant: 'default',
        action() {
          if (!hasUserId(item.metadata)) {
            handleInvalidNotificationMeta(item.metadata)
            return
          }

          const { userId } = item.metadata

          onConfirmTogleDeactivateStatus(userId, 'ACTIVE')
        },
      },
      {
        label: 'Decline Request',
        variant: 'outline',
        action() {},
      },
    ],

    dashboard_assigned: [navigateToDashboardAction],
    dashboard_updated: [navigateToDashboardAction],
    dashboard_shared: [navigateToDashboardAction],
    new_inspection_assigned: [navigateToDashboardAction],
    due_inspection: [navigateToDashboardAction],

    inspection_report_update: [
      {
        label: 'View Report',
        variant: 'outline',
        action() {
          if (!RoleUtils.isAdmin(role)) {
            toast.error('Invalid User role')
            return
          }
          if (!hasDashboardAndInspectionId(item.metadata)) {
            handleInvalidNotificationMeta(item.metadata)
            return
          }

          const { dashboardId, inspectionId } = item.metadata

          const path = routes.admin.inspectionListItemDetail.build(
            { dashboardId: dashboardId },
            { inspectionId: inspectionId },
          )
          router.push(path)
          setTimeout(closePanel, 100)
        },
      },
    ],
  }

  const actions = ACTION_EVENTS[notification_event.type]
  if (!actions) return null

  return (
    <div className="flex gap-3 *:flex-1">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          disabled={isLoadingReviewAccessRequest || updatingUserStatus}
          onClick={action.action}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
