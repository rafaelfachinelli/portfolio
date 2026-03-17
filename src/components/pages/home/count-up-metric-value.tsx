'use client'

import { useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

type CountUpMetricValueProps = {
  endValue: number
  lang: string
  decimals?: number
  suffix?: string
}

export function CountUpMetricValue({
  endValue,
  lang,
  decimals = 1,
  suffix = '',
}: Readonly<CountUpMetricValueProps>) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frameId = 0
    const duration = 1400
    const start = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const easedProgress = easeOutCubic(progress)

      setDisplayValue(endValue * easedProgress)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [endValue, isInView])

  const formattedValue = useMemo(
    () =>
      new Intl.NumberFormat(lang, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(displayValue),
    [decimals, displayValue, lang],
  )

  return (
    <span ref={ref}>
      {formattedValue}
      {suffix}
    </span>
  )
}
