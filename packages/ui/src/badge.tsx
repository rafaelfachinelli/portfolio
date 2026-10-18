import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { focusRing } from './button'
import { cn } from './lib/cn'

export const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[var(--datum-radius-sm)] border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors',
    '[&>svg]:pointer-events-none [&>svg]:size-3',
    focusRing,
  ],
  {
    variants: {
      variant: {
        accent: 'border-transparent bg-season-accent text-season-on-accent',
        neutral: 'border-transparent bg-well text-ink',
        outline: 'border-line-strong text-ink-muted',
        success: 'border-success/30 bg-success/10 text-success',
        warning: 'border-warning/30 bg-warning/10 text-warning',
        danger: 'border-danger/30 bg-danger/10 text-danger',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  },
)

export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /** Renders the child element (for example a link) with the badge styles. */
    asChild?: boolean
  }

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
