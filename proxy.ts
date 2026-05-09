import { routes, getHomePageByRole, openRoutes, publicRoutes, roleRoutes, TOKENS } from '@/constant'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { IAuthUserRole } from './types'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKENS.token)?.value
  const role = request.cookies.get(TOKENS.role)?.value as IAuthUserRole | undefined

  /**
   * Public route handling.
   *
   * If an unauthenticated user visits a public route, they are allowed through.
   * If an authenticated user (has token + role) visits a public route:
   *  - Unknown/invalid role → cookies are cleared and user is redirected to sign in.
   *  - Known role → redirected to their role-specific homepage unless already there.
   */
  if (
    pathname === '/' ||
    publicRoutes.some((route) => pathname.startsWith(route)) ||
    openRoutes.some((route) => pathname.startsWith(route))
  ) {
    // Open route — accessible by both authenticated and unauthenticated users (no redirect)
    if (openRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Authenticated user on a public route
    if (token && role) {
      const userHomePath = getHomePageByRole(role)

      // Invalid/unknown role → clear cookies, redirect to sign in
      if (!userHomePath) {
        const response = NextResponse.redirect(new URL(routes.signin, request.url))
        Object.values(TOKENS).forEach((name) => response.cookies.delete(name))
        return response
      }

      // Already on the correct homepage → allow through
      if (pathname !== userHomePath) {
        return NextResponse.redirect(new URL(userHomePath, request.url))
      }
    }
    // Unauthenticated or already on correct page → allow
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
