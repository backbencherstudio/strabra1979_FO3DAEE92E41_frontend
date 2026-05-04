import { toast } from 'sonner'

export function hasStringKey<K extends string>(meta: unknown, key: K): meta is Record<K, string> {
  return (
    typeof meta === 'object' &&
    meta !== null &&
    key in meta &&
    typeof (meta as Record<string, unknown>)[key] === 'string'
  )
}
export function hasDashboardId(meta: unknown): meta is { dashboardId: string } {
  return hasStringKey(meta, 'dashboardId')
}

export function hasInspectionId(meta: unknown): meta is { inspectionId: string } {
  return hasStringKey(meta, 'inspectionId')
}

export function hasRequestId(meta: unknown): meta is { requestId: string } {
  return hasStringKey(meta, 'requestId')
}

export function hasUserId(meta: unknown): meta is { userId: string } {
  return hasStringKey(meta, 'userId')
}

export function hasDashboardAndInspectionId(meta: unknown): meta is {
  dashboardId: string
  inspectionId: string
} {
  return hasDashboardId(meta) && hasInspectionId(meta)
}

export function handleInvalidNotificationMeta(meta: unknown) {
  console.error('Invalid notification metadata:', meta)

  toast.error('Unable to open item', {
    description: 'This notification is missing required information. Please try again later.',
  })
}
