'use client'

import * as React from 'react'

import { Label } from './label'
import { cn } from './lib/cn'

type FieldContextValue = {
  id: string
  describedBy: string | undefined
  invalid: boolean
  required: boolean
  disabled: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

/**
 * Inside a Field, gives a control its id and ARIA wiring (described by the
 * hint and the error, invalid when there is an error). Props passed directly
 * to the control win. Used by Input, Textarea and SelectTrigger.
 */
export function useFieldControl<
  P extends {
    id?: string
    'aria-describedby'?: string
    'aria-invalid'?: React.AriaAttributes['aria-invalid']
    required?: boolean
    disabled?: boolean
  },
>(props: P): P {
  const field = React.useContext(FieldContext)
  if (!field) return props
  return {
    ...props,
    id: props.id ?? field.id,
    'aria-describedby': props['aria-describedby'] ?? field.describedBy,
    'aria-invalid': props['aria-invalid'] ?? (field.invalid || undefined),
    required: props.required ?? (field.required || undefined),
    disabled: props.disabled ?? (field.disabled || undefined),
  }
}

export type FieldProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  /** The field's name, shown above the control. */
  label: React.ReactNode
  /** One control: Input, Textarea or Select. */
  children: React.ReactNode
  /** Help text under the control. Hidden while there is an error. */
  hint?: React.ReactNode
  /** Error message. Marks the control invalid and is announced. */
  error?: React.ReactNode
  /** Marks the control required and shows an asterisk. */
  required?: boolean
  /** Disables the control and dims the label. */
  disabled?: boolean
  /** Id of the control; generated when omitted. */
  id?: string
}

/** A form field: label, control, hint and error, connected for assistive tech. */
export function Field({
  label,
  children,
  hint,
  error,
  required = false,
  disabled = false,
  id: idProp,
  className,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const hasError = Boolean(error)
  const describedBy = hasError ? errorId : hint ? hintId : undefined

  const value = React.useMemo(
    () => ({ id, describedBy, invalid: hasError, required, disabled }),
    [id, describedBy, hasError, required, disabled],
  )

  return (
    <FieldContext.Provider value={value}>
      <div
        data-slot="field"
        data-invalid={hasError || undefined}
        data-disabled={disabled || undefined}
        className={cn('group grid gap-2', className)}
        {...props}
      >
        <Label htmlFor={id}>
          {label}
          {required && (
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          )}
        </Label>
        {children}
        {hasError ? (
          <p id={errorId} className="text-danger text-xs">
            {error}
          </p>
        ) : (
          hint && (
            <p id={hintId} className="text-ink-muted text-xs">
              {hint}
            </p>
          )
        )}
      </div>
    </FieldContext.Provider>
  )
}
