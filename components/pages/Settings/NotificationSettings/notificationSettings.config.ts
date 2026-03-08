// notificationSettings.config.ts
import { INotificationConfigPayload } from '@/types'

export type NotificationSettingItem = {
  title: string
  key: keyof INotificationConfigPayload
}

export const authorizedViewerNotificationSettings: NotificationSettingItem[] = [
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

export const managerNotificationSettings: NotificationSettingItem[] = [
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

export const operatorNotificationSettings: NotificationSettingItem[] = [
  {
    title: 'New Inspection Assigned',
    key: 'notif_ot_new_inspection_assigned',
  },
  {
    title: 'Due Inspection',
    key: 'notif_ot_due_inspection',
  },
]
