'use client'

import {
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  Radio,
  Trophy,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
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
import { getLanguageConfig } from '@/config/languages'
import { useLanguage } from '@/contexts/LanguageContext'

export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
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
  created_at: string
  topics: string[]
}

interface RepositoryCardProps {
  repository: Repository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { dictionary } = useLanguage()
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/${repository.default_branch}/.github/banner.svg`,
  )

  const isStudyProject = repository.topics?.includes('study')
  const isEventProject = repository.topics?.includes('event')
  const isPortfolioProject = repository.topics?.includes('portfolio')

  return (
    <Card className={`flex h-full flex-col justify-between border`}>
      <div className="relative">
        <Image
          src={imgSrc}
          alt={`${repository.name} banner`}
          width={600}
          height={128}
          className="h-32 w-full rounded-t bg-gray-100 object-center p-2"
          priority={true}
          onError={() => setImgSrc('/images/fallback-banner.svg')}
        />
        {(isStudyProject || isEventProject || isPortfolioProject) && (
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className={`hover:bg-opacity-90 flex cursor-help items-center gap-1 text-white select-none ${
                      isEventProject
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : isPortfolioProject
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {isEventProject ? (
                      <Trophy className="h-3 w-3" />
                    ) : isPortfolioProject ? (
                      <Briefcase className="h-3 w-3" />
                    ) : (
                      <GraduationCap className="h-3 w-3" />
                    )}
                    {isEventProject
                      ? dictionary.commons.event
                      : isPortfolioProject
                        ? dictionary.commons.portfolio
                        : dictionary.commons.study}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {isEventProject
                    ? dictionary.pages.projects.repositories.card
                        .eventProjectBadgeDescription
                    : isPortfolioProject
                      ? dictionary.pages.projects.repositories.card
                          .portfolioProjectBadgeDescription
                      : dictionary.pages.projects.repositories.card
                          .studyProjectBadgeDescription}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex w-full items-center gap-2 text-xl font-bold lg:max-w-48">
            <span className="truncate">{repository.name}</span>
          </CardTitle>
          {repository.language && (
            <Badge variant="outline" className="flex items-center gap-1">
              {getLanguageConfig(repository.language)?.icon}
              <span>{repository.language}</span>
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2">
          {repository.description ||
            dictionary.pages.projects.repositories.card.noDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="mr-2 flex flex-col items-start gap-2">
          <span className="text-muted-foreground text-xs">
            {dictionary.pages.projects.repositories.card.created.replace(
              '{date}',
              new Date(repository.created_at).toLocaleDateString(),
            )}
          </span>
          <span className="text-muted-foreground text-xs">
            {dictionary.pages.projects.repositories.card.updated.replace(
              '{date}',
              new Date(repository.updated_at).toLocaleDateString(),
            )}
          </span>
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
