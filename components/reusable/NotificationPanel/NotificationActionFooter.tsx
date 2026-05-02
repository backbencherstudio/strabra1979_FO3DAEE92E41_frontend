import { useReviewAccessRequestMutation } from '@/api/notification/notificationApi'
import { useUpdateUserStatusMutation } from '@/api/userManagement/userManagementApi'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/farmatters'
import {
  INotificationItem,
  NotificationType,
  INotificationActionItem,
  IReviewAccessRequestBody,
  IUserStatus,
} from '@/types'
import dayjs from 'dayjs'
import { toast } from 'sonner'

type NotificationAction = {
  label: string
  // label: 'Approve' | 'Decline'
  action: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'muted' | 'ghost' | 'link'
}
type NotificationActionMap = Partial<Record<NotificationType, NotificationAction[]>>

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
          // const body: IReviewAccessRequestBody = {
          //   action,
          //   ...(action === 'DECLINED' && {
          //     declineReason: 'Access is only available after contract signing.',
          //   }),
          //   ...(action === 'APPROVED' && { expiresAt }),
          // }

          // reviewAccessRequest({
          //   dashboardId: item.actions. ?? '',
          //   requestId: payload.requestId ?? '',
          //   ...body,
          // })
        },
      },
      {
        label: 'Decline',
        variant: 'outline',
        action() {},
      },
    ], // action
    new_user_approval_request: [
      {
        label: 'Approve',
        variant: 'default',
        action() {
          onConfirmTogleDeactivateStatus(item.metadata.userId, 'ACTIVE')
        },
      },
      {
        label: 'Decline',
        variant: 'outline',
        action() {},
      },
    ], // link
  }

  // onClick={() => {
  //   if (notification_event.type === 'access_request') {
  //     handlePropertyAccessRequest(
  //       action.action === 'approve' ? 'APPROVED' : 'DECLINED',
  //       action,
  //     )
  //   }

  //   if (notification_event.type === 'new_user_approval_request') {
  //     handlePropertyAccessRequest(
  //       action.action === 'approve' ? 'APPROVED' : 'DECLINED',
  //       action,
  //     )
  //   }
  // }}

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
