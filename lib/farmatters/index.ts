export * from './number'
export * from './error'
export * from './date'

import qs from 'qs'

export function createQueryParams<T>(params: T): string {
  return qs.stringify(params, { addQueryPrefix: true }) // Automatically adds `?` at the beginning
}
