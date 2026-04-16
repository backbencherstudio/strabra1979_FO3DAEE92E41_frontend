'use client'

import { config } from '@/constant'
import { useAuth } from '@/redux/features/auth/useAuth'
import { increment, setUnreadCount } from '@/redux/features/notification/notificationSlice'
import { AppDispatch, useAppDispatch } from '@/redux/store'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export function SocketProvider({ children }: PropsWithChildren) {
  const { token, isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) return
    if (socketRef.current) return // Prevent duplicate connections

    const socket = io(config.socketUrl, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    })

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('connect_error', (err) => {
      console.error('Socket error:', err.message)
    })

    socket.onAny((event, data) => {
      console.log('Event:', event)
      console.log('Payload:', data)
    })

    socket.on('error', (err) => {
      console.error(err.message)
    })

    socketRef.current = socket
    initSocket(socket, dispatch)

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [dispatch, isAuthenticated, token])

  return <>{children}</>
}

export const initSocket = (socket: Socket, dispatch: AppDispatch) => {
  // unread count
  socket.on('notification:unread_count', (data) => {
    console.warn('notification:unread_count ======================')
    // dispatch(setUnreadCount(data.count))
  })

  socket.on('notification', (data) => {
    console.warn('notification ======================')
    // dispatch(setUnreadCount(data.count))
  })

  // new notification
  socket.on('notification:dashboard_assigned', (data) => {
    console.warn('notification:dashboard_assigned ======================')
    // dispatch(increment())

    // inject into RTK cache
    // store.dispatch(
    //   notificationApi.util.updateQueryData(
    //     'getNotifications',
    //     1,
    //     (draft: any) => {
    //       if (!draft?.data) return
    //
    //       const exists = draft.data.some(
    //         (n: any) => n.id === data.notificationId
    //       )
    //       if (exists) return
    //
    //       draft.data.unshift({
    //         id: data.notificationId,
    //         created_at: data.createdAt,
    //         read_at: null,
    //         status: 1,
    //         entity_id: data.entityId,
    //         notification_event: {
    //           type: data.type,
    //           text: data.text,
    //         },
    //         sender: data.sender,
    //       })
    //     }
    //   )
    // )
  })
}
