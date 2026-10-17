import { cn } from '@/lib/utils'

/** The RF mark, painted with the current season's gradient (see `.datum-logo`). */
export function Logo({
  size = 40,
  className,
}: Readonly<{ size?: number; className?: string }>) {
  return (
    <span
      role="img"
      aria-label="Rafael Fachinelli"
      className={cn('datum-logo shrink-0', className)}
      style={{ width: size, height: size }}
    />
  )
}
