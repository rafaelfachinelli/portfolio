'use client'

import * as React from 'react'

import { useFieldControl } from './field'
import { cn } from './lib/cn'

/** Border, focus, invalid and disabled styles shared by every text control. */
export const controlClass = [
  'w-full min-w-0 rounded-[var(--datum-radius-md)] border border-line-strong bg-transparent text-sm text-ink transition-[border-color,box-shadow] duration-150',
  'placeholder:text-ink-subtle selection:bg-season-accent selection:text-season-on-accent',
  'outline-none focus-visible:border-season-accent focus-visible:ring-2 focus-visible:ring-season-accent/30',
  'aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/30',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

/** A single-line text control. Inside a Field, it is wired to the label. */
export function Input({
  className,
  type = 'text',
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        controlClass,
        'h-9 px-3 py-1',
        'file:text-ink file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...useFieldControl(props)}
    />
  )
}
