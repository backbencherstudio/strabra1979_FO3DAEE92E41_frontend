import { baseApi } from '@/api/baseApi'
import type { WithApiStatus } from '@/types'
import { ICreateFieldFieldParams, ICreateHeaderFieldParams, IInspectionCriteria } from '@/types'

const criteriaManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInspectionCriteria: builder.query<WithApiStatus<IInspectionCriteria[]>, void>({
      query: () => ({
        url: `/inspection-criteria`,
      }),
      providesTags: ['InspectionCriteria'],
    }),

    // headerFields
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
    editAHeaderField: builder.mutation<
      WithApiStatus<void>,
      { fieldKey: string; criteriaId: string; payload: Partial<ICreateHeaderFieldParams> }
    >({
      query: ({ criteriaId, fieldKey, payload }) => ({
        url: `/inspection-criteria/${criteriaId}/header-fields/${fieldKey}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),

    // Scoring Filed
    createScoringField: builder.mutation<WithApiStatus<void>, ICreateFieldFieldParams>({
      query: ({ criteriaId, ...data }) => ({
        url: `/inspection-criteria/${criteriaId}/scoring-categories`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),
    deleteACustomScoringCategory: builder.mutation<
      WithApiStatus<void>,
      { fieldKey: string; criteriaId: string }
    >({
      query: ({ criteriaId, fieldKey }) => ({
        url: `/inspection-criteria/${criteriaId}/scoring-categories/${fieldKey}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),
    editAScoringField: builder.mutation<
      WithApiStatus<void>,
      { fieldKey: string; criteriaId: string; payload: Partial<ICreateFieldFieldParams> }
    >({
      query: ({ criteriaId, fieldKey, payload }) => ({
        url: `/inspection-criteria/${criteriaId}/scoring-categories/${fieldKey}`,
        method: 'PATCH',
        body: payload,
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
  useEditAHeaderFieldMutation,
  useCreateScoringFieldMutation,
  useDeleteACustomScoringCategoryMutation,
  useEditAScoringFieldMutation,
} = criteriaManagementApi
export default criteriaManagementApi
