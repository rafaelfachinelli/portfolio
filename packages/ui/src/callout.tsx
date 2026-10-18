import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from './lib/cn'

export const calloutVariants = cva(
  'grid items-start gap-x-3 gap-y-1 rounded-[var(--datum-radius-md)] border-l-4 px-4 py-3 text-sm text-ink',
  {
    variants: {
      tone: {
        accent: 'border-season-accent bg-season-accent/10',
        neutral: 'border-line-strong bg-well',
        success: 'border-success bg-success/10',
        warning: 'border-warning bg-warning/10',
        danger: 'border-danger bg-danger/10',
      },
    },
    defaultVariants: { tone: 'accent' },
  },
)

const iconTone = {
  accent: 'text-season-accent',
  neutral: 'text-ink-muted',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
} as const

export type CalloutProps = React.ComponentProps<'div'> &
  VariantProps<typeof calloutVariants> & {
    /** An icon shown beside the content (for example a Lucide icon). */
    icon?: React.ReactNode
  }

/**
 * A highlighted box set apart from the surrounding content: a summary, a tip,
 * a warning. Compose with CalloutTitle and CalloutContent.
 */
export function Callout({
  className,
  tone,
  icon,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      data-slot="callout"
      className={cn(
        calloutVariants({ tone }),
        icon ? 'grid-cols-[auto_1fr]' : 'grid-cols-1',
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          data-slot="callout-icon"
          aria-hidden="true"
          className={cn(
            'row-span-2 mt-0.5 [&_svg]:size-5',
            iconTone[tone ?? 'accent'],
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </div>
  )
}

/** The title, a `p` by default; with `asChild`, style your own heading (`h2`, `h3`). */
export function CalloutTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'p'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'p'
  return (
    <Comp
      data-slot="callout-title"
      className={cn(
        'font-display text-base leading-snug font-semibold',
        className,
      )}
      {...props}
    />
  )
}

/** The body: text, lists and links, styled for reading inside the box. */
export function CalloutContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="callout-content"
      className={cn(
        'text-ink-muted leading-relaxed',
        '[&_a]:text-season-accent [&_a]:underline [&_a]:underline-offset-4',
        '[&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5',
        className,
      )}
      {...props}
    />
  )
}
