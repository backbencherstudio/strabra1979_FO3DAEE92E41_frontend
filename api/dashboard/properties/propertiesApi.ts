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

export interface SetAccessExpirationPayload {
  dashboardId: string
  userId: string
  accessExpiresAt: string
}

export interface SetAccessExpirationResponse {
  id: string
  dashboardId: string
  userId: string
  accessExpiresAt: string
  updatedAt: string
}

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
    // TODO: use invalidatesTags in assignUserToProperty
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
    // TODO: use invalidatesTags in scheduleInspection
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

    // AccessList
    //==================================================================
    getPropertyDashboardAccessList: builder.query<
      WithApiStatus<IPropertyDashboardAccessResponse>,
      string
    >({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access-list`,
        method: 'GET',
      }),
      providesTags: ['AccessList'] as const,
    }),
    revokeDashboardAccess: builder.mutation<WithApiStatus<void>, IRevokeDashboardAccessPayload>({
      query: ({ dashboardId, targetUserId }) => ({
        url: `/properties/dashboard/${dashboardId}/access/users/${targetUserId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AccessList'],
    }),
    setAccessExpiration: builder.mutation<SetAccessExpirationResponse, SetAccessExpirationPayload>({
      query: ({ dashboardId, userId, accessExpiresAt }) => ({
        url: `/properties/dashboard/${dashboardId}/access/expiration`,
        method: 'PATCH',
        body: {
          userId,
          accessExpiresAt,
        },
      }),
      invalidatesTags: ['AccessList'],
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
  useSetAccessExpirationMutation,
} = propertiesApi
export default propertiesApi
