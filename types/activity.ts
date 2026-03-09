export interface IActivityLogListItem {
  id: string
  created_at: string
  category: 'PROPERTY_DASHBOARD_UPDATE' | 'USER_ACCESS'
  message: string
  actor_role: string
}
