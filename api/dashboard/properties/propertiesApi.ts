import { baseApi } from '@/api/baseApi'
import type {
  ICreatePropertyPayload,
  IPropertyDashboardAccessResponse,
  IPropertyListItem,
  IRevokeDashboardAccessPayload,
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
    getPropertyDashboardAccessList: builder.query<
      WithApiStatus<IPropertyDashboardAccessResponse>,
      string
    >({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access-list`,
        method: 'GET',
      }),
      providesTags: ['PropertyDashboard'] as const,
    }),
    revokeDashboardAccess: builder.mutation<WithApiStatus<void>, IRevokeDashboardAccessPayload>({
      query: ({ dashboardId, targetUserId }) => ({
        url: `/properties/dashboard/${dashboardId}/access/users/${targetUserId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PropertyDashboard'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
} = propertiesApi
export default propertiesApi
