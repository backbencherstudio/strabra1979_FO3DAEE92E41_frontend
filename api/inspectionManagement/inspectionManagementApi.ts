import { baseApi } from '@/api/baseApi'
import type {
  IFilterPayload,
  IPaginationPayload,
  IScheduledInspectinListItem,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSheduledInspections: builder.query<
      WithPaginationAndStatus<IScheduledInspectinListItem[]>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (args) => ({
        url: `/inspections/scheduled/all`,
        params: args ?? undefined,
      }),
      providesTags: ['InspectionManagement'] as const,
    }),
    deleteSingleInspectionWithId: builder.mutation<WithApiStatus<void>, string>({
      query: (id) => ({
        url: `/inspections/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InspectionManagement'],
    }),
    // updateUserStatus: builder.mutation<
    //   IUserListItem,
    //   { id: string; status: 'ACTIVE' | 'DEACTIVATED' | 'DELETED' }
    // >({
    //   query: ({ id, status }) => ({
    //     url: `/user-management/${id}/status`,
    //     method: 'PATCH',
    //     body: { status },
    //   }),
    //   invalidatesTags: ['UserManagement'],
    // }),
  }),
  overrideExisting: false,
})

export const { useGetAllSheduledInspectionsQuery, useDeleteSingleInspectionWithIdMutation } = userManagementApi
export default userManagementApi
