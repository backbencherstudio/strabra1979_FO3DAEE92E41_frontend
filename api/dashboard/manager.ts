import {
  IFilterPayload,
  IPaginationPayload,
  IPropertyListItem,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'
import { IOverviewAdmin, IOverviewOperational } from '@/types/overview'
import { baseApi } from '../baseApi'

const manager = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<
      WithPaginationAndStatus<IPropertyListItem[]>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (arg) => ({
        url: `/properties`,
        params: arg ?? undefined,
      }),
      providesTags: ['Property'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetReportsQuery } = manager
export default manager
