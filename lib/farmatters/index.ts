export * from './number'
export * from './error'
export * from './date'

import qs, { BooleanOptional, IStringifyOptions } from 'qs'

const DEFAULT_QUERY_OPTIONS: IStringifyOptions<BooleanOptional> = {
  addQueryPrefix: true, // Automatically adds `?` at the beginning
}

export function createQueryParams<T>(
  params: T,
  options: IStringifyOptions<BooleanOptional> = DEFAULT_QUERY_OPTIONS,
): string {
  return qs.stringify(params, options)
}
