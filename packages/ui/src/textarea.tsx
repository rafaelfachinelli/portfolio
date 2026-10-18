'use client'

import * as React from 'react'

import { useFieldControl } from './field'
import { controlClass } from './input'
import { cn } from './lib/cn'

/** A multi-line text control that the user can resize vertically. */
export function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        controlClass,
        'min-h-24 resize-y px-3 py-2 leading-relaxed',
        className,
      )}
      {...useFieldControl(props)}
    />
  )
}
