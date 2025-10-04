// @path: src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = new Set(['fr', 'en'])
const DEFAULT_LOCALE = 'fr'
const KNOWN_ROUTES = new Set(['explore', 'timeline', 'experience'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (!first) {
    url.pathname = `/${DEFAULT_LOCALE}`
    return NextResponse.redirect(url)
  }

  if (LOCALES.has(first)) {
    return NextResponse.next()
  }

  if (KNOWN_ROUTES.has(first)) {
    url.pathname = `/${DEFAULT_LOCALE}/${segments.join('/')}`
    return NextResponse.redirect(url)
  }

  const rest = segments.slice(1).join('/')
  url.pathname = `/${DEFAULT_LOCALE}${rest ? `/${rest}` : ''}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
