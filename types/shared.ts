export interface WithApiStatus<T> {
  data: T
  success: boolean
  message: string
}

export interface WithPaginationAndStatus<T> {
  data: T
  success: boolean
  message: string
  meta_data: {
    total: number
    page: number
    limit: number
  }
}
