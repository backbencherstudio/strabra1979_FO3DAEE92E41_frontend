export const Role = {
  ADMIN: 'ADMIN',
  PROPERTY_MANAGER: 'PROPERTY_MANAGER',
  AUTHORIZED_VIEWER: 'AUTHORIZED_VIEWER',
  OPERATIONAL: 'OPERATIONAL',
} as const
export type IAuthUserRole = keyof typeof Role

export interface AuthCredential {
  token?: string | null
  role?: IAuthUserRole | null
  refreshToken?: string | null
}

export const RoleUtils = {
  isAdmin: (role?: IAuthUserRole | null) => role === 'ADMIN',
  isPropertyManager: (role?: IAuthUserRole | null) => role === 'PROPERTY_MANAGER',
  isAuthorizedViewer: (role?: IAuthUserRole | null) => role === 'AUTHORIZED_VIEWER',
  isOperational: (role?: IAuthUserRole | null) => role === 'OPERATIONAL',
  isPublic: (role?: IAuthUserRole | null) => role == null,

  hasRole: (role: IAuthUserRole | null | undefined, allowedRoles: IAuthUserRole[]): boolean => {
    if (!role) return false
    return allowedRoles.includes(role)
  },
}

export type IRefreshTokenPayload = {
  success: boolean
  authorization: {
    type: 'bearer'
    access_token: string
  }
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

export interface IAuthUser {
  id: string
  name: string
  email: string
  avatar: string | null
  avatar_url: string | null
  address: string | null
  phone_number: string | null
  type: 'user' | 'admin' // User Role
  gender: 'male' | 'female' | 'other' | null
  date_of_birth: string | null // ISO date string
  created_at: string // ISO datetime string
}

export type IAuthUpdateUserParams = Omit<Partial<IAuthUser>, 'avatar'> & {
  avatar?: File
}

export interface IAuthRegisterParams {
  name: string
  email: string
  password: string
}

export interface IAuthRegisterResponse {
  success: boolean
  message: string
}

export interface IAuthVerifyEmailParams {
  email: string
  token: string
}

export interface IAuthChangePasswordParams {
  old_password: string
  new_password: string
}
