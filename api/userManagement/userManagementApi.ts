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
      WithPaginationAndStatus<IUserListItem>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (args) => ({
        url: `/user-management`,
        params: args ?? undefined,
      }),
      providesTags: ['UserList'] as const,
    }),
    // updateGeneralSetting: builder.mutation<
    //   WithApiStatus<IProfileGeneralSettingResponse>,
    //   Partial<IProfileGeneralSettingParams>
    // >({
    //   query: (body) => {
    //     return {
    //       url: '/profile/general',
    //       method: 'PATCH',
    //       body: body,
    //     }
    //   },
    //   invalidatesTags: ['Me'],
    // }),
  }),
  overrideExisting: false,
})

export const { useGetUserListQuery } = userManagementApi
export default userManagementApi
