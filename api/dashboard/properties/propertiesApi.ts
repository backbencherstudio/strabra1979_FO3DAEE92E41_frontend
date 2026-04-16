import { baseApi } from '@/api/baseApi'
import type {
  AssignUserResponse,
  IAssignUserParams,
  ICheckPropertyAccessResponse,
  ICreatePropertyPayload,
  IFilterPayload,
  IPaginationPayload,
  IPropertyDashboardAccessResponse,
  IPropertyDashboardDetails,
  IPropertyListItem,
  IRevokeDashboardAccessPayload,
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
    getProperties: builder.query<
      WithPaginationAndStatus<IPropertyListItem[]>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (arg) => ({
        url: `/properties`,
        params: arg ?? undefined,
      }),
      providesTags: ['Property'] as const,
    }),

    getPropertyDashboarIdCheck: builder.query<WithApiStatus<IPropertyDashboardDetails>, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access/check`,
        providesTags: ['PropertyDashboard'] as const,
      }),
    }),

    //property check
    getCheckPropertyAccess: builder.query<ICheckPropertyAccessResponse, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access/check`,
      }),
    }),

    //property id request
    createDashboardAccessRequest: builder.mutation<
      WithApiStatus<void>,
      { dashboardId: string; message?: string }
    >({
      query: ({ dashboardId, message }) => ({
        url: `/properties/dashboard/${dashboardId}/access/request`,
        method: 'POST',
        body: { message },
      }),
    }),

    getPropertiesId: builder.query<
      WithPaginationAndStatus<IPropertyListItem[]>,
      (IPaginationPayload & IFilterPayload) | void
    >({
      query: (arg) => ({
        url: `/properties`,
        params: arg ?? undefined,
      }),
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
    getPropertyDashboardDetails: builder.query<WithApiStatus<IPropertyDashboardDetails>, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}`,
        providesTags: ['PropertyDashboard'] as const,
      }),
    }),
    // TODO: use invalidatesTags in assignUserToProperty
    assignUserToProperty: builder.mutation<WithApiStatus<AssignUserResponse>, IAssignUserParams>({
      query: ({ dashboardId, userId, expiresAt }) => ({
        url: `/properties/dashboard/${dashboardId}/assign-user`,
        method: 'POST',
        invalidatesTags: ['AccessList', 'Property'],
        body: {
          userId,
          expiresAt,
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
    // TODO: use with Revoke User Access dialog
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
  useGetPropertiesIdQuery,
  useCreatePropertyMutation,
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
  useAssignUserToPropertyMutation,
  useSetAccessExpirationMutation,

  useGetPropertyDashboardDetailsQuery,

  useCreateDashboardAccessRequestMutation,
  useLazyGetCheckPropertyAccessQuery,
} = propertiesApi
export default propertiesApi
