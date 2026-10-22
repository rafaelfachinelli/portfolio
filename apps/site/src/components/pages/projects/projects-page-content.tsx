import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@datum/ui'
import { ArrowRight, Github, Presentation } from 'lucide-react'
import Link from 'next/link'

import { PageContent } from '../../ui/page-content'
import { PageTitle } from '../../ui/page-title'

export type ProjectCard = {
  href: string
  title: string
  description: string
  tags: string[]
  /** A tool opens in place; a project opens its case study. */
  kind: 'project' | 'tool'
}

type ProjectsPageContentProps = Readonly<{
  locale: string
  title: string
  description: string
  text: {
    openProject: string
    openTool: string
    repositoriesTitle: string
    repositoriesDescription: string
    repositoriesButton: string
  }
  projects: ProjectCard[]
}>

export function ProjectsPageContent({
  locale,
  title,
  description,
  text,
  projects,
}: ProjectsPageContentProps) {
  return (
    <PageContent className="gap-10 pb-16">
      <PageTitle title={title} description={description} icon={Presentation} />

      <ul className="grid gap-6 md:grid-cols-2">
        {/* The first project (Datum) spans the row; the rest go two by two. */}
        {projects.map((project, index) => (
          <li key={project.href} className={index === 0 ? 'md:col-span-2' : ''}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle asChild>
                  <h2 className="text-2xl">{project.title}</h2>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild variant="outline">
                  <Link prefetch={false} href={`/${locale}${project.href}`}>
                    {project.kind === 'tool' ? text.openTool : text.openProject}
                    <ArrowRight />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>

      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>{text.repositoriesTitle}</h2>
          </CardTitle>
          <CardDescription>{text.repositoriesDescription}</CardDescription>
        </CardHeader>
        <CardFooter>
          {/* No prefetch: the repository page code (Select, Tooltip) is heavy. */}
          <Button asChild variant="ghost">
            <Link prefetch={false} href={`/${locale}/projects/more`}>
              <Github />
              {text.repositoriesButton}
              <ArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </PageContent>
  )
}
