import { increment, setUnreadCount } from '@/redux/features/notification/notificationSlice'
import { AppDispatch, store } from '@/redux/store'
import { INotificationEventPayload, NOTIFICATION_EVENTS } from '@/types'
import { Socket } from 'socket.io-client'
import notificationApi from '../notification/notificationApi'

export const initSocket = (socket: Socket, dispatch: AppDispatch) => {
  // Unread count
  socket.on('notification:unread_count', (data) => {
    dispatch(setUnreadCount(data.count))
  })

  Object.keys(NOTIFICATION_EVENTS).map((eventName) => {
    socket.on(`notification:${eventName}`, (data: INotificationEventPayload) => {
      dispatch(increment())
      store.dispatch(
        notificationApi.util.updateQueryData('getNotifications', {}, (draft) => {
          if (!draft?.data) return

          const exists = draft.data.some((n) => n.id === data.notificationId)
          if (exists) return

          draft.data.unshift({
            id: data.notificationId,
            sender_id: data.sender.id,
            receiver_id: '',
            created_at: data.createdAt,
            updated_at: data.createdAt,
            entity_id: data.entityId,
            status: data.isRead ? 0 : 1,
            notification_event_id: data.notificationId,
            actions: data.actions,
            notification_event: {
              id: data.notificationId,
              type: data.type,
              text: data.text,
              created_at: data.createdAt,
              updated_at: data.createdAt,
            },
            sender: data.sender,
            metadata: data.metadata,
          })

          if (draft.meta) {
            const meta = draft.meta
            meta.total += 1
            meta.unreadCount += 1
            meta.totalPages = Math.ceil(meta.total / meta.limit)
          }
        }),
      )
    })
  })
}
