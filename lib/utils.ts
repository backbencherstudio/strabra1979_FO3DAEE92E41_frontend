import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function isArrayEmpty<T>(value: T[] | null | undefined): value is null | undefined | [] {
  return !Array.isArray(value) || value.length === 0
}

export function mergeConfig<T extends object>(defaultConfig: T, userConfig: Partial<T>): T {
  return { ...defaultConfig, ...userConfig }
}

export function isDevEnv() {
  return process.env.NODE_ENV === 'development'
}

export function maskEmail(email: string) {
  const [name, domain] = email.split('@')

  if (!name || !domain) return email

  if (name.length <= 2) {
    return `${name[0]}*@${domain}`
  }

  const visible = name.slice(0, 3)
  const masked = '*'.repeat(name.length - 3)

  return `${visible}${masked}@${domain}`
}
