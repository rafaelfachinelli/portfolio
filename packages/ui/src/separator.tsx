'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

import { cn } from './lib/cn'

/**
 * A thin line between groups of content. Decorative by default (hidden from
 * screen readers); pass `decorative={false}` when it separates sections.
 */
export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-line-strong shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}
