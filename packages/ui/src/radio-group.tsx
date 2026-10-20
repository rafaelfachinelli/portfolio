'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'

import { focusRing } from './button'
import { cn } from './lib/cn'

/**
 * A set of options where exactly one is chosen. Arrow keys move between the
 * options; Tab enters and leaves the group. Name the group with
 * `aria-labelledby` (a visible heading) or `aria-label`.
 */
export function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-2', className)}
      {...props}
    />
  )
}

/** A classic radio button. Pair it with a Label (`htmlFor` its `id`). */
export function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-line-strong text-season-accent grid size-4 shrink-0 cursor-pointer place-items-center rounded-full border transition-colors duration-150',
        'data-[state=checked]:border-season-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        focusRing,
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-current" />
    </RadioGroupPrimitive.Item>
  )
}

export type RadioCardProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  'children' | 'title'
> & {
  /** The option's name. */
  title: React.ReactNode
  /** One short line under the title. */
  description?: React.ReactNode
  /** An icon on the left (for example a Lucide icon). */
  icon?: React.ReactNode
}

/**
 * An option drawn as a card: the whole card is the radio, so it is easy to hit
 * on a phone. The title and description are its accessible name.
 */
export function RadioCard({
  className,
  title,
  description,
  icon,
  ...props
}: RadioCardProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-card"
      className={cn(
        'group/radio-card border-line-strong text-ink relative flex w-full cursor-pointer items-start gap-3 rounded-[var(--datum-radius-md)] border bg-transparent p-3 pr-9 text-left transition-[border-color,background-color] duration-150',
        'hover:bg-well',
        'data-[state=checked]:border-season-accent data-[state=checked]:bg-season-accent/10',
        'disabled:cursor-not-allowed disabled:opacity-50',
        "[&_svg:not([class*='size-'])]:size-5",
        focusRing,
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="text-ink-muted group-data-[state=checked]/radio-card:text-season-accent mt-0.5 shrink-0"
        >
          {icon}
        </span>
      )}
      <span className="grid gap-0.5">
        <span className="text-sm leading-snug font-medium">{title}</span>
        {description && (
          <span className="text-ink-muted text-xs leading-snug">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className="border-line-strong group-data-[state=checked]/radio-card:border-season-accent absolute top-3 right-3 grid size-4 place-items-center rounded-full border"
      >
        <RadioGroupPrimitive.Indicator className="bg-season-accent size-2 rounded-full" />
      </span>
    </RadioGroupPrimitive.Item>
  )
}
