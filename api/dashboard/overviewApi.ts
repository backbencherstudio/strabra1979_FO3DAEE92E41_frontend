import { WithApiStatus } from '@/types'
import { IOverviewAdmin } from '@/types/overview'
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
  }),
  overrideExisting: false,
})

export const { useGetAdminOverviewQuery } = overviewApi
export default overviewApi
