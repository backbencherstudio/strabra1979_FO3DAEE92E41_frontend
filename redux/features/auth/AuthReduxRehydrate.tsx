'use client'
import { useEffect, useEffectEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { AuthCredential } from '@/types'

interface Props {
  credentials: AuthCredential
}

export default function AuthReduxRehydrate({ credentials }: Props) {
  const dispatch = useDispatch()

  const initCredintial = useEffectEvent(() => {
    if (credentials) {
      dispatch(setCredentials(credentials))
    }
  })

  useEffect(() => {
    initCredintial()
  }, [])

  // Renders nothing, just syncs state
  return null
}
