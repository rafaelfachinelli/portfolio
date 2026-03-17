import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from '../i18n-config'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-expect-error Locales are readonly
  const locales: string[] = i18n.locales

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicAsset = /\.[^/]+$/.test(pathname)

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || isPublicAsset) {
    return NextResponse.next()
  }

  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathname === '/') {
    const locale = getLocale(request) || i18n.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  if (!pathnameHasLocale) {
    const locale = getLocale(request) || i18n.defaultLocale
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    )
  }
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next).*)'],
}

