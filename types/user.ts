import { IAuthUserRole } from './auth'

export interface IUserBasicInfo {
  id: string
  username: string
  email?: string
  name?: string
  avatar?: string | null
  role?: IAuthUserRole
}


export interface IPropertyManager extends IUserBasicInfo {
  role: 'PROPERTY_MANAGER'
}
