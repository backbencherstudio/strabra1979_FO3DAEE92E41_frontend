'use client'

import { config } from '@/constant'
import { useAuth } from '@/redux/features/auth/useAuth'
import { useAppDispatch } from '@/redux/store'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { initSocket } from './socketListeners'
import { isDevEnv } from '@/lib/utils'

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
      auth: { token },
      transports: ['websocket'],
    })

    if (isDevEnv()) {
      socket.on('connect', () => {
        console.info('Socket connected:', socket.id)
      })
      socket.on('disconnect', () => {
        console.info('Socket disconnected')
      })
      socket.onAny((event, data) => {
        console.info('=============== Event:', event, '====================')
        console.info('Payload:', data)
      })
    }

    socket.on('connect_error', (err) => {
      console.error('Socket error:', err.message)
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
