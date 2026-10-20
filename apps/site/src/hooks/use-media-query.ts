'use client'

import { useSyncExternalStore } from 'react'

/**
 * Whether a media query matches. On the server (and the first client render)
 * it returns `undefined`, so callers can wait instead of guessing.
 */
export function useMediaQuery(query: string): boolean | undefined {
  return useSyncExternalStore(
    onChange => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => undefined,
  )
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)') ?? false
}
