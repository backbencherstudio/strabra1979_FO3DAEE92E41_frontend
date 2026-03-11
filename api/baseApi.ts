import { baseApiURL } from '@/constant'
import { getErrorMessage } from '@/lib/farmatters'
import { logOut, setCredentials } from '@/redux/features/auth/authSlice'
import { RootState } from '@/redux/store'
import { IAuthRefreshTokenPayload } from '@/types'
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiURL,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // Setting header on every API call
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    result = await handleRefreshToken(api, extraOptions, result, args)
  }

  return result
}
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Me',
    'Auth',
    'Profile',
    'UserLevelNotificationSettings',
    'AdminBrandingSetting',

    'UserList',

    'Property',
    'ActivityLog',
  ] as const,
  endpoints: () => ({}),
})

type RefreshResult = QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
let refreshPromise: Promise<RefreshResult> | null = null
let isRefreshing = false

async function handleRefreshToken(
  api: BaseQueryApi,
  extraOptions: object,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
  args: string | FetchArgs,
) {
  const state = api.getState() as RootState

  // Only attempt refresh if user was logged in
  if (state.auth.token) {
    try {
      if (!isRefreshing) {
        isRefreshing = true

        const state = api.getState() as RootState
        const refreshToken = state.auth.refreshToken

        refreshPromise = Promise.resolve(
          baseQuery(
            {
              url: '/auth/refresh-token',
              method: 'POST',
              body: {
                refresh_token: refreshToken,
              },
            },
            api,
            extraOptions,
          ),
        )

        const refreshResult = await refreshPromise

        if (refreshResult?.data) {
          const newToken = (refreshResult.data as IAuthRefreshTokenPayload)?.authorization
            ?.access_token

          api.dispatch(
            setCredentials({
              token: newToken,
              role: state.auth.role,
            }),
          )
        } else {
          throw new Error('Refresh failed')
        }

        isRefreshing = false
      } else {
        await refreshPromise
      }

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions)
    } catch (error) {
      isRefreshing = false
      api.dispatch(logOut())
      toast.error('Session expired — please log in again.', {
        description: getErrorMessage(error),
      })
    }
  }
  return result
}
