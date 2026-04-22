import { baseApi } from '@/api/baseApi'
import type { WithApiStatus } from '@/types'
import { IInspectionCriteria } from '@/types/criteria'

const criteriaManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInspectionCriteria: builder.query<WithApiStatus<IInspectionCriteria[]>, void>({
      query: () => ({
        url: `/inspection-criteria`,
      }),
      providesTags: ['InspectionCriteria'],
    }),
    createNewHeaderField: builder.mutation<WithApiStatus<void>, void>({
      query: (data) => ({
        url: `/inspection-criteria/{criteriaId}/header-fields`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllInspectionCriteriaQuery } = criteriaManagement
export default criteriaManagement
