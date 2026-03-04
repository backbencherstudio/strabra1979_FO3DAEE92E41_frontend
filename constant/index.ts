import { IAuthUserRole } from '@/types'

const day1 = 60 * 60 * 24
export const cookieAge = {
  day1,
  day7: day1 * 7,
  day30: day1 * 30,
}

export const baseApiURL =
  process.env.NEXT_PUBLIC_API_URL || 'https://range-attorneys-flux-firewall.trycloudflare.com/api'

export const TOKENS = {
  token: 'auth-token',
  role: 'role',
  refreshToken: 'refresh-token',
} as const

export const publicRoutes = ['/signin', '/signup']

export const roleRoutes: Record<string, IAuthUserRole[]> = {
  '/': ['AUTHORIZED_VIEWER'],
  '/admin': ['ADMIN'],
  '/manager': ['PROPERTY_MANAGER'],
  '/operation': ['OPERATIONAL'],
}

export const roleHomePage: Record<IAuthUserRole, string> = {
  AUTHORIZED_VIEWER: '/',
  ADMIN: '/admin',
  PROPERTY_MANAGER: '/manager',
  OPERATIONAL: '/operation',
}
