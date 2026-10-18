import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './lib/cn'

export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-season-accent focus-visible:ring-offset-2 focus-visible:ring-offset-board'

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[var(--datum-radius-md)] font-medium whitespace-nowrap transition-[color,background-color,border-color,filter] duration-150',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary: 'bg-season-accent text-season-on-accent hover:brightness-110',
        secondary: 'bg-well text-ink hover:bg-edge',
        outline:
          'border border-line-strong bg-transparent text-ink hover:bg-well',
        ghost: 'bg-transparent text-ink hover:bg-well',
        link: 'h-auto px-0 text-season-accent underline-offset-4 hover:underline',
        danger: 'bg-danger text-edge hover:brightness-110',
      },
      size: {
        sm: 'h-8 px-3 text-sm has-[>svg]:px-2.5',
        md: 'h-9 px-4 text-sm has-[>svg]:px-3',
        lg: 'h-11 px-6 text-base has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="animate-spin motion-reduce:animate-none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Renders the child element (for example a link) with the button styles. */
    asChild?: boolean
    /** Shows a spinner, blocks clicks and announces the busy state. */
    loading?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (asChild) {
    return (
      <Slot data-slot="button" className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button
      data-slot="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
