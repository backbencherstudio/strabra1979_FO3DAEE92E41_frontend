import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicRoutes, roleHomePage, roleRoutes, TOKENS } from './constant'
import { IAuthUserRole } from './types'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKENS.token)?.value
  const role = request.cookies.get(TOKENS.role)?.value as IAuthUserRole | undefined

  // 1. Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // Already logged in → redirect to their home page
    if (token && role) {
      return NextResponse.redirect(new URL(roleHomePage[role], request.url))
    }
    return NextResponse.next()
  }

  // 2. No token → redirect to signin
  if (!token) {
    const signinUrl = new URL('/signin', request.url)
    signinUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signinUrl)
  }

  // 3. Role based access check
  const matchedRoute = Object.keys(roleRoutes).find(
    (route) =>
      route === '/'
        ? pathname === '/' // exact match for root
        : pathname.startsWith(route), // prefix match for all others
  )

  if (matchedRoute && role) {
    const allowedRoles = roleRoutes[matchedRoute]

    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
