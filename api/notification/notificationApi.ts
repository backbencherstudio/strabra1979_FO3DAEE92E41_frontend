import { baseApi } from '@/api/baseApi'
import { INotificationItem, WithPaginationAndStatus } from '@/types'

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<WithPaginationAndStatus<INotificationItem[]>, number>({
      query: (page = 1) => `/notifications?page=${page}`,
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

export const {} = notificationApi
export default notificationApi
