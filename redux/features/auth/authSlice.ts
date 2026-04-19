import { setAuthCookies } from '@/lib/actions/auth'
import { RootState } from '@/redux/store'
import { AuthCredential, AuthToken, IAuthUserRole } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: AuthToken
  refreshToken: string | null
  role: IAuthUserRole | null
}

const initialState: AuthState = {
  token: false,
  role: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthCredential>) => {
      const { token = null, role = null, refreshToken = null } = action.payload

      setAuthCookies({ token, refreshToken, role })
      state.token = token
      state.refreshToken = refreshToken
      state.role = role
    },
    clearToken: (state) => {
      state.token = null
      state.refreshToken = null
      state.role = null
    },
    invalidToken: (state) => {
      state.token = state.token + 'yyy'
    },
  },
})

export const { setCredentials, clearToken, invalidToken } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectCurrentRole = (state: RootState) => state.auth.role
