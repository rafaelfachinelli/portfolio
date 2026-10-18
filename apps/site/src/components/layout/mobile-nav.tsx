'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type MobileNavProps = Readonly<{
  openLabel: string
  closeLabel: string
  children: React.ReactNode
}>

/**
 * The phone navigation drawer. Only the open/close state runs in the browser:
 * the links arrive already rendered from the server as `children`.
 */
export function MobileNav({ openLabel, closeLabel, children }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  // Any link inside the drawer closes it (including links to the current page).
  const closeOnLink = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="hover:bg-accent flex size-10 cursor-pointer items-center justify-center rounded-md border md:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">{openLabel}</span>
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-50 bg-black/60 transition-opacity duration-200 motion-reduce:transition-none md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <nav
        id="mobile-nav"
        aria-label={openLabel}
        inert={!open}
        onClickCapture={closeOnLink}
        className={cn(
          'bg-sidebar text-sidebar-foreground border-line-strong fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r transition-transform duration-200 motion-reduce:transition-none md:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="hover:bg-accent absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-md"
        >
          <X className="size-4" />
          <span className="sr-only">{closeLabel}</span>
        </button>
        {children}
      </nav>
    </>
  )
}
