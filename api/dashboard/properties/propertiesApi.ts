import { baseApi } from '@/api/baseApi'
import type {
  ICreatePropertyPayload,
  IPropertyListItem,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<WithPaginationAndStatus<IPropertyListItem[]>, void>({
      query: () => `/properties`,
      providesTags: ['Property'] as const,
    }),
    createProperty: builder.mutation<WithApiStatus<void>, ICreatePropertyPayload>({
      query: (body) => ({
        url: '/properties',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Property'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPropertiesQuery, useCreatePropertyMutation } = propertiesApi
export default propertiesApi
