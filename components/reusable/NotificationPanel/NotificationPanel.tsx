import { Notification, NotificationCircle } from '@/components/icons/Notification'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ReactNode } from 'react'
import UserAvatar from '../UserAvatar'

export default function NotificationPanel() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon-lg" variant="outline" className="rounded-full shadow-none">
          <Notification className="size-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[90vw] max-w-117.5 translate-x-5 overflow-hidden rounded-3xl bg-white p-0"
      >
        <PopoverHeader className="flex flex-row items-center justify-between border-b p-6 pb-4.5">
          <PopoverTitle className="text-lg font-semibold md:text-2xl">Notification</PopoverTitle>
          <Button variant="link" className="px-0">
            Mark all as read
          </Button>
        </PopoverHeader>
        <section className="slim-scrollbar max-h-100 divide-y overflow-y-auto pb-3 md:max-h-120">
          {/* // Notification 1 — with user avatar, accept/decline actions */}
          <NotificationPanelItem
            avatar={
              <UserAvatar
                src="https://i.pravatar.cc/150?img=8"
                name="Gustavo Xavier"
                className="border-pressed-100 size-12 border"
              />
            }
            title="Gustavo Xavier"
            subtitle="manhhachkt08@gmail.com"
            time="2m ago"
            isUnread={true}
            content={
              <p>
                Requested to View <strong>Sunset Office Complex</strong> Property.
              </p>
            }
            footer={
              <div className="flex gap-3 *:flex-1">
                <Button>Accept</Button>
                <Button variant="outline">Decline</Button>
              </div>
            }
          />

          {/* // Notification 2 — bell icon, link in content */}
          <NotificationPanelItem
            avatar={<NotificationCircle />}
            title="New Property Dashboard Assigned"
            time="4m ago"
            content={
              <p>
                You've been assigned to a new property dashboard by an admin.{' '}
                <a href="#" className="text-blue-500 underline">
                  View Dashboard
                </a>
              </p>
            }
          />

          {/* // Notification 3 — bell icon, bold text + link */}
          <NotificationPanelItem
            avatar={<NotificationCircle />}
            title="Property Dashboard Updated"
            time="5m ago"
            content={
              <p>
                New files have been uploaded to <strong>Sunset Office Complex</strong>.{' '}
                <a href="#" className="text-blue-500 underline">
                  View Dashboard
                </a>
              </p>
            }
          />

          <NotificationPanelItem
            avatar={<NotificationCircle />}
            title="Property Dashboard Updated"
            time="5m ago"
            content={
              <p>
                New files have been uploaded to <strong>Sunset Office Complex</strong>.{' '}
                <a href="#" className="text-blue-500 underline">
                  View Dashboard
                </a>
              </p>
            }
          />
        </section>
      </PopoverContent>
    </Popover>
  )
}

interface NotificationPanelItemProps {
  time: string
  title: string
  avatar?: ReactNode
  subtitle?: string
  content: string | ReactNode
  footer?: ReactNode
  isUnread?: boolean
}

export function NotificationPanelItem({
  time,
  title,
  avatar,
  subtitle,
  content,
  footer,
  isUnread = false,
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
        <div className="text-foreground mt-1 text-sm">{content}</div>

        {/* Footer */}
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </div>
  )
}
