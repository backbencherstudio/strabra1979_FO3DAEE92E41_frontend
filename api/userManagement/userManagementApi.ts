import { baseApi } from '@/api/baseApi'
import type {
  IAuthUserRole,
  IFilterPayload,
  IPaginationPayload,
  IUserListItem,
  IUserStatus,
  WithApiStatus,
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
    updateUserStatus: builder.mutation<IUserListItem, { id: string; status: IUserStatus }>({
      query: ({ id, status }) => ({
        url: `/user-management/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['UserManagement'],
    }),
    updateUserRole: builder.mutation<WithApiStatus<void>, { id: string; role: IAuthUserRole }>({
      query: ({ id, role }) => ({
        url: `/user-management/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['UserManagement'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserListQuery, useUpdateUserStatusMutation, useUpdateUserRoleMutation } =
  userManagementApi
export default userManagementApi
