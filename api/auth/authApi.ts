import { baseApi } from '@/api/baseApi'
import { getErrorMessage } from '@/lib/farmatters'
import { setCredentials } from '@/redux/features/auth/authSlice'
import type {
  IAuthChangePasswordParams,
  IAuthRegisterParams,
  IAuthRegisterResponse,
  IAuthResetPasswordParams,
  IAuthUser,
  IAuthUserRole,
  ILoginParams,
  ILoginPayload,
  WithApiStatus,
} from '@/types'
import { toast } from 'sonner'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<WithApiStatus<ILoginPayload>, ILoginParams>({
      query: (credentialParams) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentialParams,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled

          const token = data?.access_token
          const refreshToken = data?.refresh_token
          const role = data?.role as IAuthUserRole | null

          dispatch(setCredentials({ token, role, refreshToken }))
        } catch (error) {
          toast.error(getErrorMessage(error, 'Login failed. Please try again.'))
        }
      },
    }),
    registerUser: builder.mutation<WithApiStatus<IAuthRegisterResponse>, IAuthRegisterParams>({
      query: (body) => ({
        url: '/auth/register-user',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<IAuthUser, void>({
      query: () => `/auth/me`,
      providesTags: ['Me'] as const,
      transformResponse: (response: WithApiStatus<IAuthUser>) => response.data,
    }),
    changePassword: builder.mutation<WithApiStatus<void>, Partial<IAuthChangePasswordParams>>({
      query: (body) => {
        return {
          url: '/profile/change-password',
          method: 'PATCH',
          body: body,
        }
      },
    }),

    // Forget Password API
    forgotPassword: builder.mutation<WithApiStatus<void>, { email: string }>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyEmailWithOTP: builder.mutation<
      WithApiStatus<{ reset_token?: string }>,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<WithApiStatus<void>, IAuthResetPasswordParams>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useRegisterUserMutation,
  useChangePasswordMutation,

  useForgotPasswordMutation,
  useVerifyEmailWithOTPMutation,
  useResetPasswordMutation,
} = authApi
export default authApi
