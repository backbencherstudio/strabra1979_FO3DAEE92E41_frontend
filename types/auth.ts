export const USER_ROLES = ['ADMIN', 'PROPERTY_MANAGER', 'AUTHORIZED_VIEWER', 'OPERATIONAL'] as const
export type IAuthUserRole = (typeof USER_ROLES)[number]

export const ROLE_LABELS: Record<IAuthUserRole, string> = {
  ADMIN: 'Admin',
  PROPERTY_MANAGER: 'Property Manager',
  AUTHORIZED_VIEWER: 'Viewer',
  OPERATIONAL: 'Operational',
}

export interface AuthCredential {
  token?: string | null
  role?: IAuthUserRole | null
  refreshToken?: string | null
}

export const RoleUtils = {
  isAdmin: (role?: IAuthUserRole | null) => role?.toUpperCase() === 'ADMIN',
  isPropertyManager: (role?: IAuthUserRole | null) => role?.toUpperCase() === 'PROPERTY_MANAGER',
  isAuthorizedViewer: (role?: IAuthUserRole | null) => role?.toUpperCase() === 'AUTHORIZED_VIEWER',
  isOperational: (role?: IAuthUserRole | null) => role?.toUpperCase() === 'OPERATIONAL',
  isPublic: (role?: IAuthUserRole | null) => role == null,

  hasRole: (role: IAuthUserRole | null | undefined, allowedRoles: IAuthUserRole[]): boolean => {
    if (!role) return false
    return allowedRoles.includes(role)
  },
}

export type IAuthUser = {
  id: string
  name?: string
  username: string
  email: string
  avatar: string
  role: IAuthUserRole
  created_at: string
}

export interface ILoginParams {
  email: string
  password: string
}

export interface ILoginPayload {
  id: string
  type: string
  access_token: string
  refresh_token: string
  role: IAuthUserRole
}

export interface IAuthRegisterParams {
  username: string
  role: IAuthUserRole
  email: string
  password: string
}

export interface IAuthRegisterResponse {
  id: string
  email: string
  username: string
  role: string
  status: string
}

export interface IAuthVerifyEmailParams {
  email: string
  token: string
}

export interface IAuthChangePasswordParams {
  current_password: string
  new_password: string
  confirm_new_password: string
}

export type IAuthRefreshTokenPayload = {
  success: boolean
  authorization: {
    type: 'bearer'
    access_token: string
  }
}

export type IAuthUpdateUserParams = {
  username: string
  role: string
  email: string
  password: string
  country: string
  state: string
  city: string
  local_government: string
  zip_code: string
  phone_number: string
  address: string
  gender: string
  date_of_birth: string
}
