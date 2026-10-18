import { Card, CardContent, Stat } from '@datum/ui'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type MetricItem = {
  icon: LucideIcon
  value: ReactNode
  label: string
  description: string
}

type HomeMetricsSectionProps = {
  metrics: MetricItem[]
}

/** The home metrics: Datum Stats inside Cards. */
export function HomeMetricsSection({
  metrics,
}: Readonly<HomeMetricsSectionProps>) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ icon: Icon, value, label, description }) => (
        <Card key={label}>
          <CardContent>
            <Stat
              icon={<Icon />}
              label={label}
              value={value}
              description={description}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
