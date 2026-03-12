import { baseApi } from '@/api/baseApi'
import type {
  IFilterPayload,
  IPaginationPayload,
  IUserListItem,
  WithPaginationAndStatus,
} from '@/types'

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query<
      WithPaginationAndStatus<IUserListItem[]>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (args) => ({
        url: `/user-management`,
        params: args ?? undefined,
      }),
      providesTags: ['UserManagement'] as const,
    }),
    updateUserStatus: builder.mutation<
      IUserListItem,
      { id: string; status: 'ACTIVE' | 'DEACTIVATED' | 'DELETED' }
    >({
      query: ({ id, status }) => ({
        url: `/user-management/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['UserManagement'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserListQuery, useUpdateUserStatusMutation } = userManagementApi
export default userManagementApi
