import { baseApi } from '@/api/baseApi'
import type {
  AssignUserResponse,
  IAssignUserParams,
  ICreatePropertyPayload,
  IPropertyDashboardAccessResponse,
  IPropertyListItem,
  IRevokeDashboardAccessPayload,
  IScheduleInspectionParams,
  IScheduleInspectionResponse,
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
    assignUserToProperty: builder.mutation<WithApiStatus<AssignUserResponse>, IAssignUserParams>({
      query: ({ dashboardId, userId, expiresAt }) => ({
        url: `/properties/dashboard/${dashboardId}/assign-user`,
        method: 'POST',
        body: {
          userId,
          expiresAt,
        },
      }),
    }),
    scheduleInspection: builder.mutation<
      WithApiStatus<IScheduleInspectionResponse>,
      IScheduleInspectionParams
    >({
      query: ({ dashboardId, scheduledAt, assignedTo }) => ({
        url: `/properties/dashboard/${dashboardId}/schedule-inspection`,
        method: 'POST',
        body: {
          scheduledAt,
          assignedTo,
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
  useAssignUserToPropertyMutation,
  useScheduleInspectionMutation,
} = propertiesApi
export default propertiesApi
