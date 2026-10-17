'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type FeaturedProject = {
  href: string
  title: string
  description: string
  tags: string[]
}

type HomeProjectsSectionProps = {
  eyebrow: string
  title: string
  overview: string
  featuredProjects: FeaturedProject[]
  viewProjectDetailsButton: string
  viewAllProjectsButton: string
  allProjectsHref: string
  variants: Variants
}

export function HomeProjectsSection({
  eyebrow,
  title,
  overview,
  featuredProjects,
  viewProjectDetailsButton,
  viewAllProjectsButton,
  allProjectsHref,
  variants,
}: Readonly<HomeProjectsSectionProps>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-5"
    >
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-[0.3em] text-white/60 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-white/75">{overview}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {featuredProjects.map(project => (
          <Card
            key={project.title}
            className="border-white/10 bg-black/50 p-6 backdrop-blur-md dark:bg-black/25"
          >
            <div className="flex h-full flex-col gap-5">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm leading-6 text-white/75">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-white/15 bg-white/5 text-white/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                asChild
                variant="ghost"
                className="mt-auto w-fit cursor-pointer px-0 text-white hover:bg-transparent hover:text-white/80"
              >
                <Link href={project.href}>
                  {viewProjectDetailsButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button
        asChild
        variant="outline"
        className="cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
      >
        <Link href={allProjectsHref}>{viewAllProjectsButton}</Link>
      </Button>
    </motion.section>
  )
}
