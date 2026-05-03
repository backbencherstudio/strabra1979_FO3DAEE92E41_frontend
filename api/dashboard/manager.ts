import {
  IFilterPayload,
  IPaginationPayload,
  IPropertyListItem,
  WithPaginationAndStatus,
} from '@/types'
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
      providesTags: ['PropertyList'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetReportsQuery } = manager
export default manager
