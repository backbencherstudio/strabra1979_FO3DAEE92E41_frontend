import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkSingleNotificationAsReadMutation,
} from '@/api/notification/notificationApi'
import { Notification, NotificationCircle } from '@/components/icons/Notification'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatTimeAgo, formatZeroPrefix, getErrorMessage } from '@/lib/farmatters'
import { selectNotificationUnreadCount } from '@/redux/features/notification/notificationSlice'
import { useSelector } from 'react-redux'
import UserAvatar from '../UserAvatar'
import { NotificationText, NotificationPanelItem, RenderFooter } from './NotificationPanelItem'
import { INotificationItem, NOTIFICATION_EVENTS, NotificationType } from '@/types'
import { toast } from 'sonner'
import { ArrowDown } from 'lucide-react'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

const showUserInfoFor = new Set<NotificationType>(['access_request', 'access_declined'])
function resolveNotificationUI(n: INotificationItem) {
  const event = n.notification_event

  const hasUserInfo = showUserInfoFor.has(event.type) && n?.sender?.username

  return {
    title: hasUserInfo
      ? n.sender.username
      : (NOTIFICATION_EVENTS[event.type] ?? event.type ?? 'Notification'),

    subtitle: hasUserInfo && n?.sender?.email ? n.sender.email : undefined,
  }
}

export default function NotificationPanel() {
  const count = useSelector(selectNotificationUnreadCount)

  const [page, setPage] = useState(1)
  const {
    data: { data: notifications = [], meta } = {},
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({ page: page, limit: 20 })

  const isLastPage = page == (meta?.totalPages ?? 1)

  const [markAllNotificationsAsRead, { isLoading: isMarkAllLoading }] =
    useMarkAllNotificationsAsReadMutation()
  async function handleMarkAllAsRead() {
    try {
      await markAllNotificationsAsRead().unwrap()
    } catch (err) {
      toast.error('Faild to update notification read status.', {
        description: getErrorMessage(err),
      })
    }
  }

  const [markSingleNotificationsAsRead, { isLoading: isMarkSingleLoading }] =
    useMarkSingleNotificationAsReadMutation()
  async function handleMarkSingleAsRead(id: string) {
    if (isMarkSingleLoading) return

    try {
      await markSingleNotificationsAsRead(id).unwrap()
    } catch (err) {
      toast.error('Faild to update notification read status.', {
        description: getErrorMessage(err),
      })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon-lg" variant="outline" className="relative rounded-full shadow-none">
          <Notification className="size-6" />
          {meta?.unreadCount ? (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex items-center justify-center rounded-lg px-1 pt-px text-center text-[10px]">
              {formatZeroPrefix(meta?.unreadCount)}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[90vw] max-w-117.5 translate-x-5 overflow-hidden rounded-3xl bg-white p-0"
      >
        <PopoverHeader className="flex flex-row items-center justify-between border-b p-6 pb-4.5">
          <PopoverTitle className="text-lg font-semibold md:text-2xl">Notification</PopoverTitle>
          <Button
            onClick={handleMarkAllAsRead}
            disabled={isMarkAllLoading}
            variant="link"
            className="px-0 text-xs"
          >
            Mark all as read
          </Button>
        </PopoverHeader>
        <section className="slim-scrollbar max-h-100 divide-y overflow-y-auto md:max-h-120">
          {notifications.map((n) => {
            const { title, subtitle } = resolveNotificationUI(n)
            // if (n.notification_event.type === 'access_request') {
            // }

            return (
              <NotificationPanelItem
                onClick={() => handleMarkSingleAsRead(n?.id)}
                isUnread={!n.read_at}
                key={n.id}
                title={title}
                subtitle={subtitle}
                time={formatTimeAgo(n.created_at)}
                footer={<RenderFooter {...n} />}
                avatar={
                  <UserAvatar
                    src={n?.sender?.avatar ?? undefined}
                    name={n?.sender?.username ?? n?.sender?.first_name}
                    className="border-pressed-100 size-12 border"
                  />
                }
              >
                <NotificationText text={n?.notification_event?.text} />
              </NotificationPanelItem>
            )
          })}

          {false && (
            <>
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
                footer={
                  <div className="flex gap-3 *:flex-1">
                    <Button>Accept</Button>
                    <Button variant="outline">Decline</Button>
                  </div>
                }
              >
                <p>
                  Requested to View <strong>Sunset Office Complex</strong> Property.
                </p>
              </NotificationPanelItem>

              {/* // Notification 2 — bell icon, link in content */}
              <NotificationPanelItem
                avatar={<NotificationCircle />}
                title="New Property Dashboard Assigned"
                time="4m ago"
              >
                <p>
                  You've been assigned to a new property dashboard by an admin.
                  <a href="#" className="text-blue-500 underline">
                    View Dashboard
                  </a>
                </p>
              </NotificationPanelItem>

              {/* // Notification 3 — bell icon, bold text + link */}
              <NotificationPanelItem
                avatar={<NotificationCircle />}
                title="Property Dashboard Updated"
                time="5m ago"
              >
                <p>
                  New files have been uploaded to <strong>Sunset Office Complex</strong>.{' '}
                  <a href="#" className="text-blue-500 underline">
                    View Dashboard
                  </a>
                </p>
              </NotificationPanelItem>

              <NotificationPanelItem
                avatar={<NotificationCircle />}
                title="Property Dashboard Updated"
                time="5m ago"
              >
                <p>
                  New files have been uploaded to <strong>Sunset Office Complex</strong>.{' '}
                  <a href="#" className="text-blue-500 underline">
                    View Dashboard
                  </a>
                </p>
              </NotificationPanelItem>
            </>
          )}

          <div className="flex justify-center px-3 py-3">
            <Button
              size="xs"
              className="hover:text-header w-full"
              variant="ghost"
              onClick={() => setPage((p) => p + 1)}
              disabled={isFetching || isLastPage}
            >
              {isFetching ? (
                <Spinner />
              ) : (
                <>
                  Show more
                  <ArrowDown />
                </>
              )}
            </Button>
          </div>
        </section>
      </PopoverContent>
    </Popover>
  )
}
