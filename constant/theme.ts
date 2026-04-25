export const HEALTH_THRESHHOLD_KEYS = ['good', 'fair', 'poor'] as const
export type HealthThreshholdKey = (typeof HEALTH_THRESHHOLD_KEYS)[number]

export const HEALTH_THRESHHOLD_COLOR = {
  good: 'var(--success)',
  fair: 'var(--warning)',
  poor: 'var(--danger)',
} as const
