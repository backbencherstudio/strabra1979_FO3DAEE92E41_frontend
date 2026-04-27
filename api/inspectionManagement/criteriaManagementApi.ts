import { baseApi } from '@/api/baseApi'
import type {
  EditTextAreaFieldType,
  IEditTextAreaFieldParams,
  IInspectionHealthThresholdConfig,
  WithApiStatus,
} from '@/types'
import { ICreateHeaderFieldParams, ICreateScoringFieldParams, IInspectionCriteria } from '@/types'

export type ICreateMediaFieldPayload = {
  label: string
  placeholder: string
  isMediaFile: boolean
  isEmbedded: boolean
  accept: string[]
}

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
      { fieldKey: string; criteriaId: string; data: Partial<ICreateHeaderFieldParams> }
    >({
      query: ({ criteriaId, fieldKey, data }) => ({
        url: `/inspection-criteria/${criteriaId}/header-fields/${fieldKey}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),

    // media-fields
    createCustomMediaField: builder.mutation<
      WithApiStatus<void>,
      { criteriaId: string; data: ICreateMediaFieldPayload }
    >({
      query: ({ criteriaId, data }) => ({
        url: `/inspection-criteria/${criteriaId}/media-fields`,
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['InspectionCriteria'],
    }),
    editCustomMediaField: builder.mutation<
      WithApiStatus<void>,
      {
        criteriaId: string
        fieldKey: string
        data: Partial<ICreateMediaFieldPayload>
      }
    >({
      query: ({ criteriaId, fieldKey, data }) => ({
        url: `/inspection-criteria/${criteriaId}/media-fields/${fieldKey}`,
        method: 'PATCH',
        body: data,
      }),

      invalidatesTags: ['InspectionCriteria'],
    }),

    // Scoring Field
    createScoringField: builder.mutation<WithApiStatus<void>, ICreateScoringFieldParams>({
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
      { fieldKey: string; criteriaId: string; payload: Partial<ICreateScoringFieldParams> }
    >({
      query: ({ criteriaId, fieldKey, payload }) => ({
        url: `/inspection-criteria/${criteriaId}/scoring-categories/${fieldKey}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),

    // NTE & Additional notes config
    editTextAreaInputField: builder.mutation<
      WithApiStatus<void>,
      {
        criteriaId: string
        fieldType: EditTextAreaFieldType
        payload: Partial<IEditTextAreaFieldParams>
      }
    >({
      query: ({ criteriaId, payload, fieldType }) => ({
        url:
          fieldType === 'NTE'
            ? `/inspection-criteria/${criteriaId}/nte-config`
            : `/inspection-criteria/${criteriaId}/additional-notes-config`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['InspectionCriteria'],
    }),

    // health threshold config
    updateHealthThresholdConfig: builder.mutation<
      WithApiStatus<void>,
      {
        criteriaId: string
        payload: IInspectionHealthThresholdConfig
      }
    >({
      query: ({ criteriaId, payload }) => ({
        url: `/inspection-criteria/${criteriaId}/health-threshold-config`,
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
  useEditTextAreaInputFieldMutation,
  useUpdateHealthThresholdConfigMutation,
  useCreateCustomMediaFieldMutation,
  useEditCustomMediaFieldMutation
} = criteriaManagementApi
export default criteriaManagementApi
