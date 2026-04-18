import { IAuthUserRole } from './auth'

export interface IUserBasicInfo {
  id: string
  username: string
  email?: string
  name?: string
  first_name?: string
  last_name?: string
  avatar?: string
  role?: IAuthUserRole
}


export interface IPropertyManager extends IUserBasicInfo {
  role: 'PROPERTY_MANAGER'
}
