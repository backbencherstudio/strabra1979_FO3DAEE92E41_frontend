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
  }),
  overrideExisting: false,
})

export const {
  useGetProfileQuery,
  useUpdateGeneralSettingMutation,
  useUpdateTimezoneMutation,
  useUpdateNotificationConfigMutation,
} = profileAccountApi
export default profileAccountApi
