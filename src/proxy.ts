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

function getCanonicalLocale(request: NextRequest) {
  const locale = getLocale(request) || i18n.defaultLocale
  return locale.startsWith('pt') ? 'pt-BR' : 'en-US'
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rafaelfachinelli.com'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Consolidate "www" onto the canonical host with a permanent redirect.
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('www.')) {
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 308)
  }

  const isPublicAsset = /\.[^/]+$/.test(pathname)

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || isPublicAsset) {
    return NextResponse.next()
  }

  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Permanent (308) redirects to the canonical indexed locales, so search
  // engines consolidate "/" and un-prefixed paths onto /pt-BR or /en-US.
  if (!pathnameHasLocale) {
    const locale = getCanonicalLocale(request)
    const target = pathname === '/' ? '' : pathname
    return NextResponse.redirect(new URL(`/${locale}${target}`, request.url), 308)
  }
}

export const config = {
  matcher: ['/((?!api|_next).*)'],
}

