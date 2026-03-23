import { IAuthUserRole } from '@/types'

export const TOKENS = {
  token: 'auth-token',
  role: 'role',
  refreshToken: 'refresh-token',
} as const

export const publicRoutes = ['/signin', '/signup']

export const roleRoutes: Record<string, IAuthUserRole[]> = {
  '/': ['AUTHORIZED_VIEWER'],
  '/settings': ['AUTHORIZED_VIEWER'],
  '/property': ['AUTHORIZED_VIEWER'],

  '/admin': ['ADMIN'],

  '/manager': ['PROPERTY_MANAGER'],

  '/operation': ['OPERATIONAL'],
} as const

export const roleHomePage: Record<IAuthUserRole, string> = {
  AUTHORIZED_VIEWER: '/',
  ADMIN: '/admin',
  PROPERTY_MANAGER: '/manager',
  OPERATIONAL: '/operation',
}

export const getHomePageByRole = (role: IAuthUserRole): string => {
  return roleHomePage[role]
}
