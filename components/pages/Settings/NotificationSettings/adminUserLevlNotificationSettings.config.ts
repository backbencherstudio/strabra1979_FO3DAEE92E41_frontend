import { IUserLevelNotificationSettings } from '@/types'
import { NotificationSettingItem } from './NotificationSettingList'

export type AdminUserLevelNotificationSettingItem =
  NotificationSettingItem<IUserLevelNotificationSettings>

export const adminUserLevelManagerNotificationSettings: AdminUserLevelNotificationSettingItem[] = [
  {
    title: 'New Property Dashboard Assigned',
    key: 'pm_new_property_dashboard_assigned',
  },
  {
    title: 'Property Dashboard Access Request',
    key: 'pm_property_dashboard_access_request',
  },
  {
    title: 'Property Dashboard Update',
    key: 'pm_property_dashboard_update',
  },
]

export const adminUserLevelAuthorizedViewerNotificationSettings: AdminUserLevelNotificationSettingItem[] =
  [
    {
      title: 'New Property Dashboard Invitation',
      key: 'av_new_property_dashboard_invitation',
    },
    {
      title: 'Access Request update',
      key: 'av_access_request_update',
    },
    {
      title: 'Property Dashboard Update',
      key: 'av_property_dashboard_update',
    },
  ]

export const adminUserLevelOperatorNotificationSettings: AdminUserLevelNotificationSettingItem[] = [
  {
    title: 'New Inspection Assigned',
    key: 'ot_new_inspection_assigned',
  },
  {
    title: 'Due Inspection',
    key: 'ot_due_inspection',
  },
  {
    title: 'Incomplete Inspection Report',
    key: 'ot_incomplete_inspection_report',
  },
]
