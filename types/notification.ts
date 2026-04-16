import { IUserBasicInfo } from './user'

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
  notification_event: {
    id: string
    created_at: string
    updated_at: string
    status: number
    type: string
    text: string
  }
  sender: IUserBasicInfo
}
