import { WithApiStatus } from '@/types'
import { IOverviewAdmin, IOverviewOperational } from '@/types/overview'
import { baseApi } from '../baseApi'

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query<WithApiStatus<IOverviewAdmin>, void>({
      query: (arg) => ({
        url: `/overview/me`,
        params: arg ?? undefined,
      }),
      providesTags: ['Overview'] as const,
    }),
    getOperatorOverview: builder.query<WithApiStatus<IOverviewOperational>, void>({
      query: (arg) => ({
        url: `/overview/me`,
        params: arg ?? undefined,
      }),
      providesTags: ['Overview'] as const,
    }),

    getManagerOverview: builder.query<WithApiStatus<any>, void>({
      query: (arg) => ({
        url: `/overview/me`,
        params: arg ?? undefined,
      }),
      providesTags: ['Overview'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetAdminOverviewQuery, useGetOperatorOverviewQuery,useGetManagerOverviewQuery } = overviewApi
export default overviewApi
