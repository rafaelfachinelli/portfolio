'use client'

import { ExternalLink, Github, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useLanguage } from '@/contexts/LanguageContext'

export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
  updated_at: string
  default_branch: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  homepage?: string | null
}

interface RepositoryCardProps {
  repository: Repository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { dictionary, lang } = useLanguage()
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/${repository.default_branch}/.github/banner.svg`,
  )

  console.log({ lang })

  return (
    <Card className="flex h-full flex-col justify-between">
      <Image
        src={imgSrc}
        alt={`${repository.name} banner`}
        width={600}
        height={128}
        className="h-32 w-full rounded-t bg-gray-100 object-center p-2"
        priority={true}
        onError={() => setImgSrc(`/images/fallback-banner.svg`)}
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="w-full truncate text-xl font-bold md:max-w-52">
            {repository.name}
          </CardTitle>
          {repository.language && (
            <Badge variant="outline">{repository.language}</Badge>
          )}
        </div>
        <CardDescription className="mt-2">
          {repository.description ||
            dictionary.pages.projects.repositories.card.noDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="font-medium">
              {dictionary.pages.projects.repositories.card.stars}
            </span>
            <span>{repository.stargazers_count}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {dictionary.pages.projects.repositories.card.forks}
            </span>
            <span>{repository.forks_count}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {dictionary.pages.projects.repositories.card.issues}
            </span>
            <span>{repository.open_issues_count}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="text-muted-foreground text-xs">
          {dictionary.pages.projects.repositories.card.updated.replace(
            '{date}',
            new Date(repository.updated_at).toLocaleDateString(),
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-full ${!repository.homepage ? 'cursor-not-allowed' : ''}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!repository.homepage}
                  >
                    <Link
                      href={repository.homepage || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2"
                      onClick={e => !repository.homepage && e.preventDefault()}
                    >
                      <Radio
                        className={`h-4 w-4 ${!repository.homepage ? 'text-muted-foreground' : 'animate-pulse text-red-500'}`}
                      />
                      {dictionary.pages.projects.repositories.card.livePreview}
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TooltipTrigger>
              {!repository.homepage && (
                <TooltipContent side="top">
                  {
                    dictionary.pages.projects.repositories.card
                      .livePreviewNotAvailable
                  }
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" />
              {dictionary.pages.projects.repositories.card.viewRepository}
              <ExternalLink className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
