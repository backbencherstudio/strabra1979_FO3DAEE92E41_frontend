import { baseApi } from '@/api/baseApi'
import type {
  WithApiStatus,
  IProfileGeneralSettingParams,
  IProfileGeneralSettingResponse,
  IUserProfile,
  UpdateTimezonePayload,
  UpdateTimezoneResponse,
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
  }),
  overrideExisting: false,
})

export const { useGetProfileQuery, useUpdateGeneralSettingMutation, useUpdateTimezoneMutation } =
  profileAccountApi
export default profileAccountApi
