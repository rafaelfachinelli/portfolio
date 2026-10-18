'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button'
import { cn } from './lib/cn'

/** A panel that slides in from an edge of the screen, over the page. */
export function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

export function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

export function SheetClose(
  props: React.ComponentProps<typeof SheetPrimitive.Close>,
) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-4 border-line-strong bg-surface text-ink shadow-xl shadow-edge/60 motion-reduce:animate-none',
  {
    variants: {
      side: {
        right:
          'inset-y-0 right-0 h-full w-3/4 animate-datum-slide-in-right border-l sm:max-w-sm',
        left: 'inset-y-0 left-0 h-full w-3/4 animate-datum-slide-in-left border-r sm:max-w-sm',
        top: 'inset-x-0 top-0 h-auto animate-datum-slide-in-top border-b',
        bottom:
          'inset-x-0 bottom-0 h-auto animate-datum-slide-in-bottom border-t',
      },
    },
    defaultVariants: { side: 'right' },
  },
)

export type SheetContentProps = React.ComponentProps<
  typeof SheetPrimitive.Content
> & {
  /** The edge the panel slides in from. */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** The accessible name of the close button, in the page's language. */
  closeLabel: string
}

/**
 * The panel. Traps the focus while open, closes with Escape or a click on the
 * backdrop, and returns the focus to the trigger. Needs a SheetTitle.
 */
export function SheetContent({
  className,
  children,
  side = 'right',
  closeLabel,
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        data-slot="sheet-overlay"
        className="animate-datum-fade-in bg-edge/70 fixed inset-0 z-50 motion-reduce:animate-none"
      />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            'text-ink-muted hover:bg-well hover:text-ink absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-[var(--datum-radius-md)] transition-colors',
            focusRing,
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4 pr-12', className)}
      {...props}
    />
  )
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('font-display text-lg font-semibold', className)}
      {...props}
    />
  )
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-ink-muted text-sm', className)}
      {...props}
    />
  )
}
