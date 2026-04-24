import { routes, getHomePageByRole, publicRoutes, roleRoutes, TOKENS } from '@/constant'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { IAuthUserRole } from './types'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKENS.token)?.value
  const role = request.cookies.get(TOKENS.role)?.value as IAuthUserRole | undefined

  // 1. Allow public routes
  if (pathname === '/' || publicRoutes.some((route) => pathname.startsWith(route))) {
    // Already logged in → redirect to their homepage
    if (token && role) {
      const userHomePath = getHomePageByRole(role)

      // Logout the user if invalid role
      if (!userHomePath) {
        const response = NextResponse.redirect(new URL(routes.signin, request.url))
        Object.values(TOKENS).forEach((name) => response.cookies.delete(name))
        return response
      }

      if (pathname !== userHomePath) {
        return NextResponse.redirect(new URL(userHomePath, request.url))
      }
    }
    return NextResponse.next()
  }

  // 2. No token → redirect to signin
  if (!token) {
    const signinUrl = new URL(routes.signin, request.url)
    // signinUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signinUrl)
  }

  // 3. Role based access check
  const matchedRoute = Object.keys(roleRoutes)
    .sort((a, b) => b.length - a.length) // longest route first
    .find((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (matchedRoute === '/settings' && role && role !== 'AUTHORIZED_VIEWER') {
    const userHomePath = getHomePageByRole(role)
    return NextResponse.redirect(new URL(`${userHomePath}/settings`, request.url))
  }

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
