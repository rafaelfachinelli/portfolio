'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type HomeCtaCard = {
  eyebrow: string
  title: string
  description: string
  buttonLabel: string
  href: string
  buttonVariant?: 'default' | 'outline'
}

type HomeCtaSectionProps = {
  cards: HomeCtaCard[]
  variants: Variants
}

export function HomeCtaSection({
  cards,
  variants,
}: Readonly<HomeCtaSectionProps>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="grid gap-4 lg:grid-cols-2"
    >
      {cards.map(card => (
        <Card
          key={card.title}
          className="border-white/10 bg-black/55 p-6 backdrop-blur-md dark:bg-black/30"
        >
          <div className="flex h-full flex-col gap-4">
            <p className="text-sm font-medium tracking-[0.3em] text-white/60 uppercase">
              {card.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-white">{card.title}</h2>
            <p className="text-white/75">{card.description}</p>
            <Button
              asChild
              variant={card.buttonVariant ?? 'default'}
              className={
                card.buttonVariant === 'outline'
                  ? 'mt-auto w-fit cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white'
                  : 'mt-auto w-fit cursor-pointer'
              }
            >
              <Link href={card.href}>{card.buttonLabel}</Link>
            </Button>
          </div>
        </Card>
      ))}
    </motion.section>
  )
}
