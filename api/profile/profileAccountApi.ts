import { baseApi } from '@/api/baseApi'
import type {
  WithApiStatus,
  IProfileGeneralSettingParams,
  IProfileGeneralSettingResponse,
  IUserProfile,
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
  }),
  overrideExisting: false,
})

export const { useUpdateGeneralSettingMutation, useGetProfileQuery } = profileAccountApi
export default profileAccountApi
