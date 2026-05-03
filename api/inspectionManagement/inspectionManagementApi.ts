import { baseApi } from '@/api/baseApi'
import type {
  IDashboardInspectionListItem,
  IFilterPayload,
  IPaginationPayload,
  IAdminScheduledInspectinTableItem,
  IScheduleInspectionParams,
  IScheduleInspectionResponse,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

const inspectionManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    scheduleInspection: builder.mutation<
      WithApiStatus<IScheduleInspectionResponse>,
      IScheduleInspectionParams
    >({
      query: ({ dashboardId, scheduledAt, assignedTo }) => ({
        url: `/properties/dashboard/${dashboardId}/schedule-inspection`,
        method: 'POST',
        body: {
          scheduledAt,
          assignedTo,
        },
      }),
      invalidatesTags: ['AccessList', 'PropertyList', 'InspectionManagement'],
    }),
    getAllSheduledInspections: builder.query<
      WithPaginationAndStatus<IAdminScheduledInspectinTableItem[]>,
      (IPaginationPayload & IFilterPayload & { assignedTo?: string }) | void
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
    getSingleInspectionWithId: builder.query<WithApiStatus<IDashboardInspectionListItem>, string>({
      query: (id) => ({
        url: `/inspections/${id}`,
      }),
      providesTags: ['InspectionManagement'] as const,
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

export const {
  useScheduleInspectionMutation,
  useGetAllSheduledInspectionsQuery,
  useDeleteSingleInspectionWithIdMutation,
  useGetSingleInspectionWithIdQuery,
} = inspectionManagementApi
export default inspectionManagementApi
