import { baseApi } from '@/api/baseApi'
import type { IPropertyListItem, WithApiStatus } from '@/types'

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<IPropertyListItem[], void>({
      query: () => `/properties`,
      providesTags: ['Property'] as const,
      transformResponse: (res: WithApiStatus<IPropertyListItem[]>) => res.data,
    }),
  }),
  overrideExisting: false,
})

export const { useGetPropertiesQuery } = propertiesApi
export default propertiesApi
