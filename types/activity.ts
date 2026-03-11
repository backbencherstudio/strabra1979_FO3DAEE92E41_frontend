export const ACTIVITY_CATEGORIES = ['PROPERTY_DASHBOARD_UPDATE', 'USER_ACCESS'] as const
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number]

export interface IActivityLogListItem {
  id: string
  created_at: string
  category: ActivityCategory
  message: string
  actor_role: string
}
