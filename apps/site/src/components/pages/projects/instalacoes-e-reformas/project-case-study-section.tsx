import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ProjectCaseStudySectionProps = {
  title: string
  icon?: LucideIcon
  iconClassName?: string
  intro?: string
  paragraphs: string[]
  items?: string[]
  badgesLabel?: string
  badges?: string[]
  imageSrc?: string
  imageAlt?: string
  imageCaption?: string
}

export function ProjectCaseStudySection({
  title,
  icon: Icon,
  iconClassName,
  intro,
  paragraphs,
  items,
  badgesLabel,
  badges,
  imageSrc,
  imageAlt,
  imageCaption,
}: ProjectCaseStudySectionProps) {
  const hasImage = Boolean(imageSrc && imageAlt && imageCaption)

  return (
    <Card className="overflow-hidden py-0">
      <div
        className={cn(
          'grid gap-0',
          hasImage && 'lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]',
        )}
      >
        <div>
          <CardHeader className="pt-6">
            <div className="flex items-center gap-3">
              {Icon ? (
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    iconClassName ?? 'bg-primary/10 text-primary',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              ) : null}
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
            {intro ? (
              <CardDescription className="border-l-2 my-5 border-blue-500 pl-4 text-base leading-7">
                {intro}
              </CardDescription>
            ) : null}
          </CardHeader>

          <CardContent className="space-y-4 pb-6">
            {paragraphs.map(paragraph => (
              <p
                key={paragraph}
                className="text-muted-foreground leading-7 text-pretty"
              >
                {paragraph}
              </p>
            ))}

            {items?.length ? (
              <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-7">
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {badges?.length ? (
              <div className="space-y-3 pt-2">
                {badgesLabel ? (
                  <p className="text-sm font-medium tracking-wide uppercase">
                    {badgesLabel}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {badges.map(badge => (
                    <Badge key={badge} variant="outline" className="rounded-full">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </div>

        {hasImage ? (
          <div className="bg-muted/20 border-t p-6 lg:border-t-0 lg:border-l">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-background">
              <Image
                src={imageSrc!}
                alt={imageAlt!}
                fill
                className="object-cover object-top"
              />
            </div>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {imageCaption}
            </p>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
