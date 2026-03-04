// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/unauthorized']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value
  const role = request.cookies.get('role')?.value
  console.log('token from proxy ------------------ ', token)

  // if (publicRoutes.includes(pathname)) return NextResponse.next();
  //
  // // No token at all → kick to login
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}

// ## Full Flow
// ```
// User logs in
//   → baseApi saves token + role in Redux ✅
//   → LoginPage useEffect redirects to role-specific route
//
// User visits /admin/dashboard
//   → proxy.ts checks cookie exists → passes through
//   → (admin)/layout.tsx checks Redux role → renders or redirects
//
// Token expires
//   → baseQueryWithReauth refreshes it automatically ✅
//   → role stays in Redux, layouts keep working
