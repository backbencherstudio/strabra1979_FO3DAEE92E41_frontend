import { INotificationItem, INotificationActionItem, IReviewAccessRequestBody } from '@/types'
import { memo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useReviewAccessRequestMutation } from '@/api/notification/notificationApi'
import dayjs from 'dayjs'

interface NotificationPanelItemProps extends React.ComponentProps<'div'> {
  time: string
  title: string
  avatar?: React.ReactNode
  subtitle?: string
  footer?: React.ReactNode
  isUnread?: boolean
}

export function NotificationPanelItem({
  time,
  title,
  avatar,
  subtitle,
  footer,
  isUnread = false,
  children,
  className,
  ...props
}: NotificationPanelItemProps) {
  return (
    <div
      {...props}
      className={cn('flex gap-3 px-6 py-4', className, { 'bg-disabled-0': isUnread })}
    >
      <div className="shrink-0">{avatar}</div>

      <div className="flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-foreground font-semibold">{title}</p>
            {subtitle && <p className="text-gray-black-300 text-sm">{subtitle}</p>}
          </div>
          <div className="relative flex shrink-0 items-center gap-1">
            <span className="text-gray-black-200 text-sm whitespace-nowrap">{time}</span>
            {isUnread ? (
              <span className="bg-mid-orange absolute top-1/2 -right-3 size-1.5 -translate-y-1/2 rounded-full" />
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="text-foreground mt-1 text-sm">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </div>
  )
}

export function renderNotificationText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export const NotificationText = memo(({ text }: { text: string }) => {
  if (!text) return null

  return <>{renderNotificationText(text)}</>
})
NotificationText.displayName = 'NotificationText'

export const RenderFooter = ({ actions, notification_event }: INotificationItem) => {
  const [reviewAccessRequest, { isLoading }] = useReviewAccessRequestMutation()

  const handleAccessRequest = useCallback(
    (action: 'APPROVED' | 'DECLINED', payload: INotificationActionItem) => {
      const expiresAt = dayjs().add(1, 'year').toISOString()

      const body: IReviewAccessRequestBody = {
        action,
        ...(action === 'DECLINED' && {
          declineReason: 'Access is only available after contract signing.',
        }),
        ...(action === 'APPROVED' && { expiresAt }),
      }

      reviewAccessRequest({
        dashboardId: payload.dashboardId ?? '',
        requestId: payload.requestId ?? '',
        ...body,
      })
    },
    [reviewAccessRequest],
  )

  if (!actions) return null

  const actionList = Object.entries(actions).map(([key, value]) => ({
    key,
    ...value,
  }))

  return (
    <div className="flex gap-3 *:flex-1">
      {actionList.map((action) => (
        <Button
          key={action.key}
          variant={action.key === 'decline' ? 'outline' : 'default'}
          disabled={isLoading}
          onClick={() => {
            if (notification_event.type === 'access_request') {
              handleAccessRequest(action.action === 'approve' ? 'APPROVED' : 'DECLINED', action)
            }
          }}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
