'use client'
import { openRoutes, publicRoutes, routes } from '@/constant'
import { AuthCredential, AuthToken } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useEffectEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useAuth } from './useAuth'
import { baseApi } from '@/api/baseApi'
import { deleteAuthCookies } from '@/lib/actions/auth'

interface Props extends React.PropsWithChildren {
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

  const { token } = useAuth()
  const path = usePathname()
  const router = useRouter()

  const redirectToAuthPage = useEffectEvent(async (token: AuthToken) => {
    if (token === null) {
      const inPublicRoute = publicRoutes.some((route) => path.startsWith(route))
      const isOpenRoute = openRoutes.some((route) => path.startsWith(route))

      if (!inPublicRoute && !isOpenRoute) {
        await deleteAuthCookies()
        router.push(routes.signin)
        dispatch(baseApi.util.resetApiState())
      }
    }
  })

  useEffect(() => {
    redirectToAuthPage(token)
  }, [token])

  // Renders nothing, just syncs state
  return null
}
