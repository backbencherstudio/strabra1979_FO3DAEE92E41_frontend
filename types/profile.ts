export type IUserProfile = {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  avatar?: string
  role: string
  status: string
  timezone: string
  email_verified_at: string
  notif_new_property_dashboard_assigned: boolean
  notif_property_dashboard_access_request: boolean
  notif_property_dashboard_update: boolean
  created_at: string
  updated_at: string
}

export type IProfileGeneralSettingParams = {
  first_name: string
  last_name: string
  email: string
}

export type IProfileGeneralSettingResponse = {
  id: string
  email: string
  first_name: string
  last_name: string
  updated_at: string
}
