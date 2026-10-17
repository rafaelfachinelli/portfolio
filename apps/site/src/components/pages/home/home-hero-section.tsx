'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type HomeHeroSectionProps = {
  lang: string
  eyebrow: string
  availability: string
  intro: string
  heroTitle: string
  heroSubtitle: string
  heroSupporting: string
  beforePlaceholder: string
  afterPlaceholder: string
  animatedWords: string[]
  viewProjectsButton: string
  contactButton: string
  variants: Variants
}

export function HomeHeroSection({
  lang,
  eyebrow,
  availability,
  intro,
  heroTitle,
  heroSubtitle,
  heroSupporting,
  beforePlaceholder,
  afterPlaceholder,
  animatedWords,
  viewProjectsButton,
  contactButton,
  variants,
}: Readonly<HomeHeroSectionProps>) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Card className="border-white/10 bg-black/55 p-6 backdrop-blur-md dark:bg-black/30 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-white/15 px-3 py-1 text-white hover:bg-white/15">
              {eyebrow}
            </Badge>
            <p className="text-sm text-white/70">{availability}</p>
          </div>

          <div className="text-lg text-white/85 sm:text-2xl">
            {beforePlaceholder}
            <AnimatedTextCycle words={animatedWords} interval={2000} />
            {afterPlaceholder}
          </div>

          <div className="space-y-4">
            <p className="text-white/75">{intro}</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {heroSubtitle}
            </p>
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {heroSupporting}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="cursor-pointer">
              <Link href={`/${lang}/projects/more`}>
                {viewProjectsButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={`/${lang}/contact`}>
                <Mail className="h-4 w-4" />
                {contactButton}
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
