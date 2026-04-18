import { baseApi } from '@/api/baseApi'
import { INotificationItem, IPaginationPayload, WithNotificationMetaAndStatus } from '@/types'

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      WithNotificationMetaAndStatus<INotificationItem[]>,
      IPaginationPayload
    >({
      query: (args) => ({
        url: `/notifications`,
        params: args ?? undefined,
      }),
      providesTags: ['Notification'],
    }),

    markAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetNotificationsQuery } = notificationApi
export default notificationApi
