// After login succeeds in baseApi.ts onQueryStarted:
// 1. Dispatch token to Redux
// 2. Call a Server Action to set the httpOnly cookie

'use server'
import { cookieAge, TOKENS } from '@/constant'
import { AuthCredential, IAuthUserRole } from '@/types'
import { cookies } from 'next/headers'

export async function setAuthCookies({ token, refreshToken, role }: AuthCredential) {
  const cookieStore = await cookies()
  const isSecure = process.env.NODE_ENV === 'production'

  // httpOnly — only server & proxy.ts can read
  if (token) {
    cookieStore.set(TOKENS.token, token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: cookieAge.day7,
      path: '/',
    })
  }

  // httpOnly: false — client JS can read (RTK Query needs it for refresh)
  if (refreshToken) {
    cookieStore.set(TOKENS.refreshToken, refreshToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: cookieAge.day30,
      path: '/',
    })
  }

  // httpOnly: false — client JS can read (for role-based UI)
  if (role) {
    cookieStore.set(TOKENS.role, role, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: cookieAge.day7,
      path: '/',
    })
  }
}

export async function getAuthCookies(): Promise<AuthCredential> {
  const cookieStore = await cookies()

  return {
    token: cookieStore.get(TOKENS.token)?.value ?? null,
    refreshToken: cookieStore.get(TOKENS.refreshToken)?.value ?? null,
    role: (cookieStore.get(TOKENS.role)?.value as IAuthUserRole) ?? null,
  }
}

export async function deleteAuthCookies() {
  const cookieStore = await cookies()

  Object.values(TOKENS).forEach((name) => cookieStore.delete(name))
}
