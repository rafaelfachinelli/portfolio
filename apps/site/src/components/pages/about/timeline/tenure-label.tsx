'use client'

import { useEffect, useState } from 'react'

export type TenurePeriod = {
  /** First month, as [year, monthIndex 0-11]. */
  start: [number, number]
  /** Last month, or null for "Present" (the visitor's current month). */
  end: [number, number] | null
}

type TenureLabelProps = Readonly<{
  periods: TenurePeriod[]
  yearsSuffix: string
  monthsSuffix: string
  className?: string
}>

/** Months from the earliest start to the latest end, both inclusive (like LinkedIn). */
function formatTenure(
  periods: TenurePeriod[],
  now: Date,
  yearsSuffix: string,
  monthsSuffix: string,
) {
  if (periods.length === 0) return ''
  const toIndex = ([year, month]: [number, number]) => year * 12 + month
  const current: [number, number] = [now.getFullYear(), now.getMonth()]
  const first = Math.min(...periods.map(p => toIndex(p.start)))
  const last = Math.max(...periods.map(p => toIndex(p.end ?? current)))
  const total = last - first + 1
  const years = Math.floor(total / 12)
  const months = total % 12
  return [
    years > 0 ? `${years}${yearsSuffix}` : '',
    months > 0 ? `${months}${monthsSuffix}` : '',
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * Total time at a company. The page is static and cached, so the server value
 * (from the build date) is corrected in the browser for roles that are ongoing.
 */
export function TenureLabel({
  periods,
  yearsSuffix,
  monthsSuffix,
  className,
}: TenureLabelProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    if (periods.some(period => period.end === null)) setNow(new Date())
  }, [periods])

  return (
    <span className={className} suppressHydrationWarning>
      {formatTenure(periods, now ?? new Date(), yearsSuffix, monthsSuffix)}
    </span>
  )
}
