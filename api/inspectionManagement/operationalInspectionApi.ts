import { baseApi } from '@/api/baseApi'
import type {
  IFilterPayload,
  IOperationalInspectionTableItem,
  IPaginationPayload,
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
  }),
  overrideExisting: false,
})

export const { useGetAllSheduledInspectionsAssignedToMeQuery } = operationalInspectionApi
export default operationalInspectionApi
