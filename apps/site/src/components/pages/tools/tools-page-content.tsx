import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@datum/ui'
import { ArrowRight, Workflow, Wrench } from 'lucide-react'
import Link from 'next/link'

import { PageContent } from '../../ui/page-content'
import { PageTitle } from '../../ui/page-title'

type Tool = { href: string; title: string; description: string }

export function ToolsPageContent({
  locale,
  text,
  tools,
}: Readonly<{
  locale: string
  text: { title: string; lead: string; open: string }
  tools: Tool[]
}>) {
  return (
    <PageContent className="gap-10 pb-16">
      <PageTitle title={text.title} description={text.lead} icon={Wrench} />
      <ul className="grid gap-6 md:grid-cols-2">
        {tools.map(tool => (
          <li key={tool.href}>
            <Card className="h-full">
              <CardHeader>
                <Workflow
                  className="text-season-accent mb-2 size-8"
                  aria-hidden="true"
                />
                <CardTitle asChild>
                  <h2>{tool.title}</h2>
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent />
              <CardFooter>
                <Button asChild>
                  <Link prefetch={false} href={`/${locale}${tool.href}`}>
                    {text.open}
                    <ArrowRight />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </PageContent>
  )
}
