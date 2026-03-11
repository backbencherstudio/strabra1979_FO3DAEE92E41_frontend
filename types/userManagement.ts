export type IUserListItem = {
  id: string
  email: string
  username: string
  first_name?: string
  last_name?: string
  avatar?: string
  role: string
  status?: IUserStatus
  approved_at?: string
  access_expires_at?: string
  created_at: string
  updated_at: string
}

export type IUserStatus = 'ACTIVE' | 'DEACTIVATED' | 'DELETED'
