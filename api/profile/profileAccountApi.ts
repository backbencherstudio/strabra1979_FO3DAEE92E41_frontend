import { baseApi } from '@/api/baseApi'
import type { IAuthRegisterResponse, IAuthUpdateUserParams } from '@/types'
import { IUserProfile } from '@/types/profile'

const profileAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUserProfile, void>({
      query: () => `/profile`,
      providesTags: ['Profile'] as const,
    }),
    updateGenerelSetting: builder.mutation<IAuthRegisterResponse, Partial<IAuthUpdateUserParams>>({
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

export const { useUpdateGenerelSettingMutation, useGetProfileQuery } = profileAccountApi
export default profileAccountApi
