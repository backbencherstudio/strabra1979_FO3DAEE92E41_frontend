export interface WithApiStatus<T> {
  data: T
  success: boolean
  message: string
}

export interface WithPaginationAndStatus<T> {
  data: T
  success: boolean
  message: string
  meta: IPagination
}

export type IPagination = {
  total: number
  page: number
  limit: number
  total_pages: number
  has_next_page: boolean
  has_prev_page: boolean
}
