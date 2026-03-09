import { baseApi } from '@/api/baseApi'
import type { IUserProfile, WithApiStatus } from '@/types'

export type IPropertyListItem = {
  id: string
  name: string
  address: string
  propertyType: string
  nextInspectionDate: string
  propertyManagerId: string
  activeTemplateId: string
  status: string
  createdAt: string
  updatedAt: string
  propertyManager: {
    id: string
    name?: string
    email?: string
    avatar?: string
    inspections: Array<string>
  }
  dashboard: {
    id: string
    updatedAt: string
  }
}

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
