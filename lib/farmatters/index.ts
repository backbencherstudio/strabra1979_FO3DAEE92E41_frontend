export * from './number'

import qs from 'qs'

export function createQueryParams<T>(params: T): string {
  return qs.stringify(params, { addQueryPrefix: true }) // Automatically adds `?` at the beginning
}
