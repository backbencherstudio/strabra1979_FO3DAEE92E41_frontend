import { INotificationItem } from '@/types'
import { memo } from 'react'
import { Button } from '@/components/ui/button'

interface NotificationPanelItemProps extends React.PropsWithChildren {
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
}: NotificationPanelItemProps) {
  return (
    <div className="flex gap-3 px-6 py-4">
      <div className="shrink-0">{avatar}</div>

      <div className="flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-foreground font-semibold">{title}</p>
            {subtitle && <p className="text-gray-black-300 text-sm">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-gray-black-200 text-sm whitespace-nowrap">{time}</span>
            {isUnread && <span className="border-navy-300 mt-0.5 size-2.5 rounded-full" />}
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

export const RenderFooter = ({ notification_event }: INotificationItem) => {
  const { type } = notification_event

  if (type === 'access_request') {
    return (
      <div className="flex gap-3 *:flex-1">
        <Button>Accept</Button>
        <Button variant="outline">Decline</Button>
      </div>
    )
  }

  return null
}
