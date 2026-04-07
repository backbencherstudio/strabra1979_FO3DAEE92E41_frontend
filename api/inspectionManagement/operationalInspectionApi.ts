import { baseApi } from '@/api/baseApi'
import type {
  IFilterPayload,
  IOperationalInspectionTableItem,
  IPaginationPayload,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

const operationalInspectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSheduledInspectionsAssignedToMe: builder.query<
      WithPaginationAndStatus<IOperationalInspectionTableItem[]>,
      (IPaginationPayload & IFilterPayload<undefined>) | void
    >({
      query: (args) => ({
        url: `/inspections/scheduled/my`,
        params: args ?? undefined,
      }),
      providesTags: ['InspectionManagement'] as const,
    }),
    startAScheduledInspection: builder.query<
      WithApiStatus<{ scheduledInspectionId: string; dashboardId: string }>,
      { scheduledInspectionId: string }
    >({
      query: ({ scheduledInspectionId }) => ({
        url: `/inspections/scheduled/${scheduledInspectionId}/start`,
      }),
      providesTags: ['InspectionManagement'] as const,
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllSheduledInspectionsAssignedToMeQuery } = operationalInspectionApi
export default operationalInspectionApi
