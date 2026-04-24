import { baseApi } from '@/api/baseApi'
import type { WithApiStatus } from '@/types'
import { ICreateHeaderFieldParams, IInspectionCriteria } from '@/types/criteria'

const criteriaManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInspectionCriteria: builder.query<WithApiStatus<IInspectionCriteria[]>, void>({
      query: () => ({
        url: `/inspection-criteria`,
      }),
      providesTags: ['InspectionCriteria'],
    }),
    createNewHeaderField: builder.mutation<WithApiStatus<void>, ICreateHeaderFieldParams>({
      query: ({ criteriaId, ...data }) => ({
        url: `/inspection-criteria/${criteriaId}/header-fields`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),
    deleteCustomHeaderField: builder.mutation<
      WithApiStatus<void>,
      { fieldKey: string; criteriaId: string }
    >({
      query: ({ criteriaId, fieldKey }) => ({
        url: `/inspection-criteria/${criteriaId}/header-fields/${fieldKey}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllInspectionCriteriaQuery,
  useCreateNewHeaderFieldMutation,
  useDeleteCustomHeaderFieldMutation,
} = criteriaManagementApi
export default criteriaManagementApi
