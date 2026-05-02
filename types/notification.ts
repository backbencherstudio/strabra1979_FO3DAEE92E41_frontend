import { IUserBasicInfo } from './user'

export const NOTIFICATION_EVENTS = {
  // Property Manager / Authorized Viewer
  access_request: 'Access Request', // action
  access_approved: 'Access Approved',
  access_declined: 'Access Declined',
  dashboard_assigned: 'Dashboard Assigned', // link
  dashboard_shared: 'Dashboard Shared', // link
  dashboard_updated: 'Dashboard Updated', // link

  // Operational Team
  due_inspection: 'Due Inspection', // link
  new_inspection_assigned: 'New Inspection Assigned', // link

  // Admin
  new_user_registration: 'New User Registration',
  new_user_approval_request: 'New User Approval Request', // action
  inspection_report_update: 'Inspection Report Update', // link

  // User receives after admin decision
  account_approved: 'Account Approved',
  account_declined: 'Account Declined',
} as const

export type NotificationType = keyof typeof NOTIFICATION_EVENTS

export interface WithNotificationMetaAndStatus<T> {
  data: T
  success: boolean
  message: string
  meta: {
    total: number
    unreadCount: number
    page: number
    limit: number
    totalPages: number
  }
}

export type INotificationItem = {
  id: string
  created_at: string
  updated_at: string
  read_at?: string
  status: number
  sender_id: string
  receiver_id: string
  notification_event_id: string
  entity_id: string
  metadata: any
  notification_event: {
    id: string
    created_at: string
    updated_at: string
    type: NotificationType
    text: string
  }
  sender: IUserBasicInfo
  actions?: Record<string, INotificationActionItem>
}

// ==============================
// Action types
// ==============================

export const isValidMethod = (method: string): method is HttpMethod =>
  ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type INotificationActionItem = {
  action: 'reject' | 'approve'
  label: string
  dashboardId?: string
  requestId?: string
}

type ReviewAction = 'APPROVED' | 'DECLINED'

export type IReviewAccessRequestBody = {
  action: ReviewAction
  declineReason?: string
  expiresAt?: string
}

export type IReviewAccessRequestParams = {
  dashboardId: string
  requestId: string
}

// ==============================
// Base Types
// ==============================
export type BaseNotificationEvent<TType extends string, TMeta> = {
  notificationId: string
  type: TType
  text: string
  entityId: string
  isRead: boolean
  createdAt: string
  timestamp: string
  sender: IUserBasicInfo
  metadata: TMeta
  actions?: Record<string, INotificationActionItem>
}

// ==============================
// Metadata Definitions
// ==============================
export type DashboardAssignedMeta = {
  propertyId: string
  propertyName: string
  dashboardId: string
  link: {
    label: string
    href: string
  }
}

// ==============================
// Notification Map (SOURCE OF TRUTH)
// ==============================
type NotificationMap = {
  dashboard_assigned: DashboardAssignedMeta
  // message_received: MessageReceivedMeta
}

// Final Union Type
export type INotificationEventPayload = {
  [K in keyof NotificationMap]: BaseNotificationEvent<K, NotificationMap[K]>
}[keyof NotificationMap]

// ==============================
// Example Usage (Type Narrowing)
// ==============================
// export function handleNotification(n: NotificationEventPayload) {
//   switch (n.type) {
//     case 'dashboard_assigned': {
//     n.metadata.dashboardId
//     n.metadata.link.href
//       break
//     }
//
//     // case 'user_invited':
//     //   break
//
//     default:
//       break
//   }
// }
