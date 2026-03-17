'use client'

import { motion, type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'

type MetricItem = {
  icon: LucideIcon
  value: ReactNode
  label: string
  description: string
}

type HomeMetricsSectionProps = {
  metrics: MetricItem[]
  variants: Variants
}

export function HomeMetricsSection({
  metrics,
  variants,
}: Readonly<HomeMetricsSectionProps>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map(metric => {
        const Icon = metric.icon

        return (
          <Card
            key={metric.label}
            className="border-white/10 bg-white/10 p-6 backdrop-blur-md dark:bg-black/25"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2 text-white">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-white/75">{metric.label}</p>
            </div>
            <p className="mt-3 text-4xl font-bold text-white">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              {metric.description}
            </p>
          </Card>
        )
      })}
    </motion.section>
  )
}
