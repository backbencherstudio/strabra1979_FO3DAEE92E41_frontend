import { ILoginParams, ILoginPayload, IRefreshTokenPayload } from '@/types'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'
import { RootState } from '@/redux/store'
import { getErrorMessage } from '@/lib/farmatters'
import { logOut, setCredentials } from '@/redux/features/auth/authSlice'
import { baseApiURL } from '@/constant'

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiURL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // Setting header on every API call
    const state = getState() as RootState
    const token = state.auth.token
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`)
    // }
    return headers
  },
})

type RefreshResult = QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>

let refreshPromise: Promise<RefreshResult> | null = null
let isRefreshing = false

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
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
              // {
              //   ...api,
              //   getState: () => ({
              //     ...api.getState(),
              //     auth: {
              //       ...state.auth,
              //       token: newToken, // override token here
              //     },
              //   }),
              // },
              api,
              extraOptions,
            ),
          )

          const refreshResult = await refreshPromise

          if (refreshResult?.data) {
            const newToken = (refreshResult.data as IRefreshTokenPayload)?.authorization
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
  }

  return result
}
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me', 'Auth'] as const,
  endpoints: () => ({}),
})
