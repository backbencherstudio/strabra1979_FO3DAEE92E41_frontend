import { INotificationConfigPayload } from '@/types'
import { NotificationSettingItem } from './NotificationSettingList'

export type ProfileNotificationSettingItem = NotificationSettingItem<INotificationConfigPayload>

export const profileNotificationSettings: ProfileNotificationSettingItem[] = [
  {
    title: 'New Property Dashboard Invitation',
    key: 'notif_av_new_property_dashboard_invitation',
  },
  {
    title: 'Access Request update',
    key: 'notif_av_access_request_update',
  },
]

export const authorizedViewerNotificationSettings: ProfileNotificationSettingItem[] = [
  {
    title: 'New Property Dashboard Invitation',
    key: 'notif_av_new_property_dashboard_invitation',
  },
  {
    title: 'Access Request update',
    key: 'notif_av_access_request_update',
  },
  {
    title: 'Property Dashboard Update',
    key: 'notif_av_property_dashboard_update',
  },
]

export const managerNotificationSettings: ProfileNotificationSettingItem[] = [
  {
    title: 'New Property Dashboard Assigned',
    key: 'notif_pm_new_property_dashboard_assigned',
  },
  {
    title: 'Property Dashboard Access Request',
    key: 'notif_pm_property_dashboard_access_request',
  },
  {
    title: 'Property Dashboard Update',
    key: 'notif_pm_property_dashboard_update',
  },
]

export const operatorNotificationSettings: ProfileNotificationSettingItem[] = [
  {
    title: 'New Inspection Assigned',
    key: 'notif_ot_new_inspection_assigned',
  },
  {
    title: 'Due Inspection',
    key: 'notif_ot_due_inspection',
  },
]

export const adminNotificationSettings: ProfileNotificationSettingItem[] = [
  {
    title: 'New User Registration',
    key: 'notif_admin_new_user_registration',
  },
  {
    title: 'Due Inspection',
    key: 'notif_admin_due_inspection',
  },
  {
    title: 'New Inspection Report Update',
    key: 'notif_admin_new_inspection_report_update',
  },
]
