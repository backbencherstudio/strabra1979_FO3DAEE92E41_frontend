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
  IShareDashboardParams,
  SetAccessExpirationPayload,
  SetAccessExpirationResponse,
  WithApiStatus,
  WithPaginationAndStatus,
} from '@/types'

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<
      WithPaginationAndStatus<IPropertyListItem[]>,
      (IPaginationPayload & IFilterPayload & { view?: 'all' | 'assigned' }) | void
    >({
      query: (arg) => ({
        url: `/properties`,
        params: arg ?? undefined,
      }),
      providesTags: ['PropertyList'],
    }),

    deletePropertyDashboardAndAllRelatedData: builder.mutation<
      WithApiStatus<{ propertyId: string; propertyName: string; dashboardId: string }>,
      { dashboardId: string }
    >({
      query: ({ dashboardId }) => ({
        url: `/properties/dashboard/${dashboardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'PropertyList',
        'Folders',
        'ActivityLog',
        'Overview',
        'InspectionManagement'
      ],
    }),

    getPropertyDashboarIdCheck: builder.query<WithApiStatus<IPropertyDashboardDetails>, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access/check`,
      }),
      providesTags: ['PropertyDashboard'] as const,
    }),

    //property check
    getCheckPropertyAccess: builder.query<ICheckPropertyAccessResponse, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}/access/check`,
      }),
    }),

    shareDashboardWithEmail: builder.mutation<WithApiStatus<void>, IShareDashboardParams>({
      query: ({ dashboardId, ...body }) => ({
        url: `/properties/dashboard/${dashboardId}/access/share`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AccessList'],
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
      providesTags: ['PropertyList'] as const,
    }),

    createProperty: builder.mutation<WithApiStatus<void>, ICreatePropertyPayload>({
      query: (body) => ({
        url: '/properties',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PropertyList'],
    }),
    getPropertyDashboardDetails: builder.query<WithApiStatus<IPropertyDashboardDetails>, string>({
      query: (dashboardId) => ({
        url: `/properties/dashboard/${dashboardId}`,
      }),
      providesTags: ['PropertyDashboard'] as const,
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
      invalidatesTags: ['AccessList', 'PropertyList', 'Overview'],
    }),

    // AccessList
    //==================================================================
    getPropertyDashboardAccessList: builder.query<
      WithPaginationAndStatus<IPropertyDashboardAccessResponse>,
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
  useDeletePropertyDashboardAndAllRelatedDataMutation,
  useGetPropertiesIdQuery,
  useCreatePropertyMutation,
  useGetPropertyDashboardAccessListQuery,
  useRevokeDashboardAccessMutation,
  useAssignUserToPropertyMutation,
  useSetAccessExpirationMutation,

  useGetPropertyDashboardDetailsQuery,

  useCreateDashboardAccessRequestMutation,
  useLazyGetCheckPropertyAccessQuery,

  useShareDashboardWithEmailMutation,
} = propertiesApi
export default propertiesApi
