import { baseApi } from '@/api/baseApi'
import {
  INotificationItem,
  IPaginationPayload,
  isValidMethod,
  IReviewAccessRequestBody,
  IReviewAccessRequestParams,
  WithApiStatus,
  WithNotificationMetaAndStatus,
} from '@/types'

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

    markSingleNotificationAsRead: builder.mutation<WithApiStatus<void>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          notificationApi.util.updateQueryData('getNotifications', {}, (draft) => {
            if (!draft?.data) return
            const notification = draft.data.find((n) => n.id === id)
            if (notification) {
              notification.status = 0
              notification.read_at = new Date().toISOString()
            }
            if (draft.meta) {
              const meta = draft.meta as typeof draft.meta & { unreadCount: number }
              if (meta.unreadCount > 0) meta.unreadCount -= 1
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    markAllNotificationsAsRead: builder.mutation<WithApiStatus<void>, void>({
      query: () => ({
        url: `/notifications/read-all`,
        method: 'PATCH',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          notificationApi.util.updateQueryData('getNotifications', {}, (draft) => {
            if (!draft?.data) return
            const now = new Date().toISOString()
            draft.data.forEach((n) => {
              n.status = 0
              n.read_at = now
            })
            if (draft.meta) {
              const meta = draft.meta as typeof draft.meta & { unreadCount: number }
              meta.unreadCount = 0
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    dynamicAction: builder.mutation<WithApiStatus<void>, { method: string; url: string }>({
      query: ({ method, url }) => {
        if (!isValidMethod(method)) {
          throw new Error(`Invalid HTTP method: ${method}`)
        }
        if (!url || !url.startsWith('/')) {
          throw new Error(`Invalid URL: ${url}`)
        }

        return {
          url,
          method,
        }
      },
    }),

    reviewAccessRequest: builder.mutation<
      WithApiStatus<void>,
      IReviewAccessRequestParams & IReviewAccessRequestBody
    >({
      query: ({ dashboardId, requestId, ...body }) => {
        // runtime validation declineReason
        if (body.action === 'DECLINED' && !body.declineReason) {
          throw new Error('declineReason is required when action is DECLINED')
        }

        return {
          url: `/properties/dashboard/${dashboardId}/access/requests/${requestId}/review`,
          method: 'PATCH',
          body,
        }
      },

      // optional but recommended
      // invalidatesTags: (_result, _error, { requestId }) => [
      //   { type: 'AccessRequest', id: requestId },
      // ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetNotificationsQuery,
  useMarkSingleNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDynamicActionMutation,
  useReviewAccessRequestMutation,
} = notificationApi
export default notificationApi
