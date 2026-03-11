import { IAuthUserRole } from '.'

export interface WithApiStatus<T> {
  data: T
  success: boolean
  message: string
}

export interface WithPaginationAndStatus<T> {
  data: T
  success: boolean
  message: string
  meta: IPaginationMetaData
}

export type IPaginationMetaData = {
  total: number
  page: number
  limit: number
  total_pages: number
  has_next_page: boolean
  has_prev_page: boolean
}

export type IPaginationPayload = {
  page?: number
  limit?: number
}

export type IFilterPayload<TCategory extends string | undefined = string> = {
  category?: TCategory
  dateFrom?: string
  dateTo?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  role?: IAuthUserRole
  status?: 'ACTIVE' | 'DEACTIVATED' | 'DELETED'
}
