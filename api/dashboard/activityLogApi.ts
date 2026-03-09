import { baseApi } from '@/api/baseApi'
import type { IActivityLogListItem, WithPaginationAndStatus } from '@/types'

const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query<WithPaginationAndStatus<IActivityLogListItem[]>, void>({
      query: () => `/activity-logs`,
      providesTags: ['ActivityLog'] as const,
      // transformResponse: (res: WithApiStatus<IActivityLogListItem[]>) => res.data,
    }),
  }),
  overrideExisting: false,
})

export const { useGetActivityLogQuery } = activityLogApi
export default activityLogApi
