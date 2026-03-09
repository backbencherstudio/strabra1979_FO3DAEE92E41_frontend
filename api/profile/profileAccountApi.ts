import { baseApi } from '@/api/baseApi'
import type {
  WithApiStatus,
  IProfileGeneralSettingParams,
  IProfileGeneralSettingResponse,
  IUserProfile,
  UpdateTimezonePayload,
  UpdateTimezoneResponse,
  INotificationConfigPayload,
  INotificationConfigResponse,
  IUserLevelNotificationSettings,
  IUserLevelNotificationSettingsResponse,
  IBrandingSettingsResponse,
  IUpdateBrandingPayload,
} from '@/types'

const profileAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUserProfile, void>({
      query: () => `/profile`,
      providesTags: ['Profile'] as const,
      transformResponse: (res: WithApiStatus<IUserProfile>) => res.data,
    }),
    updateGeneralSetting: builder.mutation<
      WithApiStatus<IProfileGeneralSettingResponse>,
      Partial<IProfileGeneralSettingParams>
    >({
      query: (body) => {
        return {
          url: '/profile/general',
          method: 'PATCH',
          body: body,
        }
      },
      invalidatesTags: ['Me'],
    }),
    updateTimezone: builder.mutation<WithApiStatus<UpdateTimezoneResponse>, UpdateTimezonePayload>({
      query: (body) => ({
        url: '/profile/timezone',
        method: 'PATCH',
        body,
      }),
    }),
    updateNotificationConfig: builder.mutation<
      WithApiStatus<INotificationConfigResponse>,
      Partial<INotificationConfigPayload>
    >({
      query: (body) => ({
        url: '/profile/notifications',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    getUserLevelNotificationSettings: builder.query<IUserLevelNotificationSettingsResponse, void>({
      query: () => ({
        url: '/admin/settings/notifications/user-level',
        method: 'GET',
      }),
      transformResponse: (res: WithApiStatus<IUserLevelNotificationSettingsResponse>) => res.data,
      providesTags: ['UserLevelNotificationSettings'],
    }),
    updateUserLevelNotificationSettings: builder.mutation<
      WithApiStatus<IUserLevelNotificationSettingsResponse>,
      Partial<IUserLevelNotificationSettings>
    >({
      query: (body) => ({
        url: '/admin/settings/notifications/user-level',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['UserLevelNotificationSettings'],
    }),
    getAdminBrandingSettings: builder.query<IBrandingSettingsResponse, void>({
      query: () => ({
        url: '/admin/settings/branding',
        method: 'GET',
      }),
      transformResponse: (res: WithApiStatus<IBrandingSettingsResponse>) => res.data,
      providesTags: ['AdminBrandingSetting'],
    }),
    updateBranding: builder.mutation({
      query: (brandingData: IUpdateBrandingPayload) => ({
        url: '/admin/settings/branding',
        method: 'PATCH',
        body: brandingData,
      }),
      invalidatesTags: ['AdminBrandingSetting'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetProfileQuery,
  useUpdateGeneralSettingMutation,
  useUpdateTimezoneMutation,
  useUpdateNotificationConfigMutation,
  useGetUserLevelNotificationSettingsQuery,
  useUpdateUserLevelNotificationSettingsMutation,
  useGetAdminBrandingSettingsQuery,
  useUpdateBrandingMutation,
} = profileAccountApi
export default profileAccountApi
