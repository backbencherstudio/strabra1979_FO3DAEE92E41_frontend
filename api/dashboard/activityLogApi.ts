import { baseApi } from '@/api/baseApi'
import type { IActivityLogListItem, IPaginationPayload, WithPaginationAndStatus } from '@/types'

const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query<
      WithPaginationAndStatus<IActivityLogListItem[]>,
      IPaginationPayload | void
    >({
      query: (arg) => ({
        url: `/activity-logs`,
        params: arg ?? undefined,
      }),
      providesTags: ['ActivityLog'] as const,
      // transformResponse: (res: WithApiStatus<IActivityLogListItem[]>) => res.data,
    }),
  }),
  overrideExisting: false,
})

export const { useGetActivityLogQuery } = activityLogApi
export default activityLogApi
