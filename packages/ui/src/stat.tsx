import * as React from 'react'

import { cn } from './lib/cn'

function Arrow({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d={up ? 'M7 17 17 7M8 7h9v9' : 'M7 7l10 10M17 8v9H8'} />
    </svg>
  )
}

export type StatProps = Omit<React.ComponentProps<'dl'>, 'children'> & {
  /** What the number measures. */
  label: React.ReactNode
  /** The number, already formatted (for example with Intl.NumberFormat). */
  value: React.ReactNode
  /** One line of context under the number. */
  description?: React.ReactNode
  /** An icon beside the label (for example a Lucide icon). */
  icon?: React.ReactNode
  /**
   * A change against a reference. `positive` says whether this change is good
   * news (green) or bad news (red), which is not always the same as going up.
   */
  trend?: {
    direction: 'up' | 'down'
    /** What is shown, for example "+12%". */
    value: React.ReactNode
    positive?: boolean
    /**
     * What screen readers say instead of the arrow and value, in the page's
     * language, for example "up 12% from last year".
     */
    label?: string
  }
}

/**
 * A key number with its label. A definition list (`dl`), so screen readers
 * read "label: value".
 */
export function Stat({
  label,
  value,
  description,
  icon,
  trend,
  className,
  ...props
}: StatProps) {
  const good = trend ? (trend.positive ?? trend.direction === 'up') : false
  return (
    <dl
      data-slot="stat"
      className={cn('text-ink grid gap-1', className)}
      {...props}
    >
      <dt className="text-ink-muted flex items-center gap-2 text-sm font-medium">
        {icon && (
          <span
            aria-hidden="true"
            className="bg-well text-season-accent flex size-8 items-center justify-center rounded-full [&_svg]:size-4"
          >
            {icon}
          </span>
        )}
        {label}
      </dt>
      <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-4xl leading-none font-bold tabular-nums">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-sm font-medium tabular-nums',
              good ? 'text-success' : 'text-danger',
            )}
          >
            <Arrow up={trend.direction === 'up'} />
            {trend.label ? (
              <>
                <span aria-hidden="true">{trend.value}</span>
                <span className="sr-only">{trend.label}</span>
              </>
            ) : (
              trend.value
            )}
          </span>
        )}
      </dd>
      {description && (
        <dd className="text-ink-muted text-sm leading-relaxed">
          {description}
        </dd>
      )}
    </dl>
  )
}
