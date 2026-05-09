import { routes } from '@/constant'
import React from 'react'
import { toast } from 'sonner'

export function handleContactAdminRedirect(router: { push: (url: string) => void }) {
  toast.error('Access restricted', {
    description: 'Your account requires administrator approval. Please contact your administrator.',
  })
  router.push(routes.contactAdmin)
}

export function shouldRedirectToContactAdmin(msg: string) {
  return msg === 'CONTACT_ADMIN'
}

export function getErrorMessage(
  error: unknown,
  defaultMessage = 'Something went wrong. Please try again.',
): string {
  if (!error) return defaultMessage

  // RTK Query / fetchBaseQuery error shape
  if (typeof error === 'object' && error !== null) {
    const err = error as any

    // Handle array of messages (NestJS validation errors)
    if (Array.isArray(err?.data?.message) && err.data.message.length > 0) {
      return err.data.message[0] // Return first error message
      // OR join all messages:
      // return err.data.message.join(", ");
    }

    // Handle single message string
    if (typeof err?.data?.message === 'string') {
      return err.data.message
    }

    // Handle direct message
    if (typeof err?.message === 'string') {
      return err.message
    }

    // Handle error string
    if (typeof err?.error === 'string') {
      return err.error
    }

    // Handle status text
    if (typeof err?.status === 'number' && typeof err?.statusText === 'string') {
      return `${err.status}: ${err.statusText}`
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return defaultMessage
}

export const notAvailableLabel = '........'

export function naIfEmpty<T>(value: T, formatter?: (val: T) => T): T {
  if (value === null || value === undefined || value === '') {
    return notAvailableLabel as T
  }

  return formatter ? formatter(value) : value
}

export function withNAf<T>(
  value: T,
  formatter?: (val: T) => React.ReactNode,
): string | React.ReactNode {
  if (value === null || value === undefined || value === '') {
    return 'N/A'
  }

  return formatter ? formatter(value) : (value as React.ReactNode)
}

export function withNA<T>(value: T, formatter?: (val: T) => string): string {
  if (value === null || value === undefined || value === '') {
    return 'N/A'
  }

  return formatter ? formatter(value) : (value as string)
}
