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
  is_set_timezone_automatic: boolean
  email_verified_at?: string
  notif_pm_new_property_dashboard_assigned: boolean
  notif_pm_property_dashboard_access_request: boolean
  notif_pm_property_dashboard_update: boolean
  notif_av_new_property_dashboard_invitation: boolean
  notif_av_access_request_update: boolean
  notif_av_property_dashboard_update: boolean
  notif_ot_new_inspection_assigned: boolean
  notif_ot_due_inspection: boolean
  notif_ot_incomplete_inspection_report: boolean
  notif_admin_new_user_registration: boolean
  notif_admin_due_inspection: boolean
  notif_admin_new_inspection_report_update: boolean
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

export interface UpdateTimezonePayload {
  auto_timezone: boolean
  timezone?: string | null
}
export interface UpdateTimezoneResponse {
  id: string
  timezone: string
  updated_at: string
}

export type INotificationConfigPayload = {
  notif_pm_new_property_dashboard_assigned: boolean
  notif_pm_property_dashboard_access_request: boolean
  notif_pm_property_dashboard_update: boolean

  notif_av_new_property_dashboard_invitation: boolean
  notif_av_access_request_update: boolean
  notif_av_property_dashboard_update: boolean

  notif_ot_new_inspection_assigned: boolean
  notif_ot_due_inspection: boolean
  notif_ot_incomplete_inspection_report: boolean

  notif_admin_new_user_registration: boolean
  notif_admin_due_inspection: boolean
  notif_admin_new_inspection_report_update: boolean
}

export interface INotificationConfigResponse extends Partial<INotificationConfigPayload> {
  id: string
  updated_at: string
}

export interface INotificationConfigResponse extends Partial<INotificationConfigPayload> {
  id: string
  updated_at: string
}

export interface IUserLevelNotificationSettingsResponse extends IUserLevelNotificationSettings {
  id: string
  created_at: string
  updated_at: string
  updated_by: string
}

export type IUserLevelNotificationSettings = {
  pm_new_property_dashboard_assigned: boolean
  pm_property_dashboard_access_request: boolean
  pm_property_dashboard_update: boolean

  av_new_property_dashboard_invitation: boolean
  av_access_request_update: boolean
  av_property_dashboard_update: boolean

  ot_new_inspection_assigned: boolean
  ot_due_inspection: boolean
  ot_incomplete_inspection_report: boolean

  admin_new_user_registration: boolean
  admin_new_inspection_report_update: boolean
  admin_due_inspection: boolean
}

export interface IBrandingSettingsResponse {
  id: string
  created_at: string
  updated_at: string
  updated_by: string
  platform_name: string
  platform_logo_url: string
  signup_onboarding_image_url: string
  login_onboarding_image_url: string
  primary_color: string
  primary_color_label: string
}
