type CountUpMetricValueProps = {
  endValue: number
  lang: string
  decimals?: number
  suffix?: string
}

/**
 * A metric number, rendered on the server. The former count-up animation was
 * dropped: it ran JavaScript on every visit for little value, and the final
 * number must be readable without JavaScript (crawlers, AI assistants).
 */
export function CountUpMetricValue({
  endValue,
  lang,
  decimals = 1,
  suffix = '',
}: Readonly<CountUpMetricValueProps>) {
  const formatted = new Intl.NumberFormat(lang, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(endValue)

  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  )
}
