'use client'

import { config } from '@/constant'
import { useAuth } from '@/redux/features/auth/useAuth'
import { useAppDispatch } from '@/redux/store'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { initSocket } from './socketListeners'

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
      console.log('=============== Event:', event, '====================')
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
