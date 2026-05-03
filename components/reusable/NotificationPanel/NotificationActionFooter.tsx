import { useReviewAccessRequestMutation } from '@/api/notification/notificationApi'
import { useUpdateUserStatusMutation } from '@/api/userManagement/userManagementApi'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/farmatters'
import { INotificationItem, IUserStatus, NotificationType } from '@/types'
import { toast } from 'sonner'

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
}

export const NotificationActionFooter = (item: INotificationItem) => {
  const { notification_event, metadata } = item
  const [reviewAccessRequest, { isLoading }] = useReviewAccessRequestMutation()
  const [updateUserStatus, { isLoading: updatingUserStatus }] = useUpdateUserStatusMutation()

  async function onConfirmTogleDeactivateStatus(userId: string, status: IUserStatus) {
    try {
      await updateUserStatus({
        id: userId,
        status,
      }).unwrap()

      toast.message('User approved successfully')
    } catch (error) {
      toast.error('Failed to update user status', {
        description: getErrorMessage(error),
      })
    }
  }

  const ACTION_EVENTS: NotificationActionMap = {
    access_request: [
      {
        label: 'Approve',
        variant: 'destructive',
        async action() {
          const metadata = item.metadata as INotificationMeta['access_request']

          // console.table(item.metadata.dashboardId)
          // alert('viewer access_request')
          // // const body: IReviewAccessRequestBody = {
          // //   action,
          // //   ...(action === 'DECLINED' && {
          // //     declineReason: 'Access is only available after contract signing.',
          // //   }),
          // //   ...(action === 'APPROVED' && { expiresAt }),
          // // }
          //
          // try {
          //   const res = await reviewAccessRequest({
          //     dashboardId: metadata.dashboardId,
          //     requestId: metadata.requestId,
          //     action: 'APPROVED',
          //   }).unwrap()
          //
          //   toast.success(res.message || 'Success message')
          // } catch (err) {
          //   toast.error('Error title', {
          //     description: getErrorMessage(err),
          //   })
          // }
        },
      },
      {
        label: 'Decline',
        variant: 'outline',
        action() {
          const metadata = item.metadata as INotificationMeta['access_request']
          reviewAccessRequest({
            dashboardId: metadata.dashboardId,
            requestId: metadata.requestId,
            action: 'DECLINED',
            declineReason: 'Access is only available after contract signing.',
          })
        },
      },
    ],
    new_user_approval_request: [
      {
        label: 'Approve User',
        variant: 'default',
        action() {
          const metadata = item.metadata as INotificationMeta['new_user_approval_request']

          onConfirmTogleDeactivateStatus(metadata.userId, 'ACTIVE')
        },
      },
      {
        label: 'Decline',
        variant: 'outline',
        action() {},
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
          disabled={isLoading}
          onClick={action.action}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
