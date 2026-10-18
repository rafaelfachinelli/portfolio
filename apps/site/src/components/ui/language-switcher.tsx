'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

// Links use the canonical locales, so crawlers never see /en or /pt duplicates.
const OPTIONS = [
  { key: 'en', locale: 'en-US', flag: 'us' },
  { key: 'pt', locale: 'pt-BR', flag: 'br' },
] as const

/** The same page in another locale: only the first path segment changes. */
function localizedPath(pathname: string, locale: string) {
  const [, , ...rest] = pathname.split('/')
  return ['', locale, ...rest].join('/')
}

/** Language menu on a native <details>: no dropdown library on first load. */
export function LanguageSwitcher({
  className,
}: Readonly<{ className?: string }>) {
  const { lang, translation } = useLanguage()
  const pathname = usePathname()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const close = () => detailsRef.current?.removeAttribute('open')

  // Close on a click outside or Escape, like a regular menu.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <details ref={detailsRef} className={cn('relative', className)}>
      <summary className="hover:bg-accent flex size-9 cursor-pointer list-none items-center justify-center overflow-hidden rounded-full border select-none [&::-webkit-details-marker]:hidden">
        <Image
          src={`https://flagcdn.com/w40/${lang.startsWith('en') ? 'us' : 'br'}.png`}
          alt={lang}
          width={20}
          height={20}
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="sr-only">
          {translation.components.languageSwitcher.label}
        </span>
      </summary>
      <ul className="bg-popover text-popover-foreground absolute top-full right-0 z-50 mt-2 min-w-36 rounded-md border p-1 shadow-md">
        {OPTIONS.map(option => (
          <li key={option.key}>
            <Link
              href={localizedPath(pathname, option.locale)}
              hrefLang={option.locale}
              scroll={false}
              onClick={close}
              className="group hover:bg-accent focus-visible:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none"
            >
              <Image
                src={`https://flagcdn.com/w40/${option.flag}.png`}
                alt=""
                width={16}
                height={16}
                className="mr-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
              {
                translation.components.languageSwitcher.options[option.key]
                  .title
              }
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
