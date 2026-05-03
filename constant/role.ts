import { IAuthUserRole } from '@/types'
import { routes } from './routes'

export const TOKENS = {
  token: 'auth-token',
  role: 'role',
  refreshToken: 'refresh-token',
} as const

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

export function getDashboardPathWithRole(role: IAuthUserRole, dashboardId: string) {
  const userHomePath = getHomePageByRole(role)

  switch (role) {
    case 'ADMIN':
      return routes.admin.propertyDetail.build({ dashboardId })

    case 'PROPERTY_MANAGER':
      return routes.manager.propertyDetail.build({ dashboardId })

    case 'OPERATIONAL':
      return routes.operational.inspectionListItemDetail.build({ dashboardId })

    case 'AUTHORIZED_VIEWER':
      return routes.viewer.propertyDetail.build({ dashboardId })

    default:
      return userHomePath ?? routes.signin
  }
}
