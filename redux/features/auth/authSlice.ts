import { deleteAuthCookies, setAuthCookies } from '@/lib/actions/auth'
import { RootState } from '@/redux/store'
import { AuthCredential, IAuthUserRole } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null | false
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
    invalidToken: (state) => {
      state.token = state.token + 'yyy'
    },
    logOut: (state) => {
      deleteAuthCookies()
      state.token = null
      state.refreshToken = null
      state.role = null
    },
  },
})

export const { setCredentials, logOut, invalidToken } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectCurrentRole = (state: RootState) => state.auth.role
