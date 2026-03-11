import { baseApi } from '@/api/baseApi'
import type {
  ActivityCategory,
  IActivityLogListItem,
  IFilterPayload,
  IPaginationPayload,
  WithPaginationAndStatus,
} from '@/types'

const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLog: builder.query<
      WithPaginationAndStatus<IActivityLogListItem[]>,
      (IPaginationPayload & IFilterPayload<ActivityCategory>) | void
    >({
      query: (arg) => ({
        url: `/activity-logs`,
        params: arg ?? undefined,
      }),
      providesTags: ['ActivityLog'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetActivityLogQuery } = activityLogApi
export default activityLogApi
