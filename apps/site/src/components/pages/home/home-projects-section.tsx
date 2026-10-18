import { Badge, Button, Card } from '@datum/ui'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
}

export function HomeProjectsSection({
  eyebrow,
  title,
  overview,
  featuredProjects,
  viewProjectDetailsButton,
  viewAllProjectsButton,
  allProjectsHref,
}: Readonly<HomeProjectsSectionProps>) {
  return (
    <section className="space-y-5">
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
            className="border-white/10 bg-black/50 p-6 dark:bg-black/25"
          >
            <div className="flex h-full flex-col gap-5">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">
                  {project.title}
                </h3>
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
        {/* No prefetch: the repository page code (Select, Tooltip) is heavy. */}
        <Link href={allProjectsHref} prefetch={false}>
          {viewAllProjectsButton}
        </Link>
      </Button>
    </section>
  )
}
