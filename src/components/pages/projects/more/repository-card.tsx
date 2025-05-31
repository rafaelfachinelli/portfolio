'use client'

import { ExternalLink, Github, Loader, Radio } from 'lucide-react'
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

import { RepositoryTopicBadge } from './repository-topic-badge'

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

const BANNER_SIZE = {
  width: 600,
  height: 128,
}
const BANNER_FALLBACK = '/images/fallback-banner.svg'

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { translation } = useLanguage()
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/${repository.default_branch}/.github/banner.svg`,
  )
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Card className={`flex min-h-[360px] flex-col border py-0 pb-6`}>
      <div className="relative">
        <Image
          src={imgSrc}
          alt={`${repository.name} banner`}
          width={BANNER_SIZE.width}
          height={BANNER_SIZE.height}
          className="h-20 w-full rounded-t-xl bg-gray-100 object-center p-2 select-none"
          priority={true}
          onLoad={() => setIsLoadingImage(false)}
          onError={() => {
            setImgSrc(BANNER_FALLBACK)
            setIsLoadingImage(false)
          }}
        />
        {isLoadingImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        <RepositoryTopicBadge topics={repository.topics} />
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
        <CardDescription className="mt-2 text-justify">
          {repository.description ||
            translation.pages.projects.repositories.card.noDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto border-t pt-4">
        <div className="mr-2 flex w-full flex-col justify-between gap-2">
          <span className="text-muted-foreground text-xs">
            {translation.pages.projects.repositories.card.created.replace(
              '{date}',
              new Date(repository.created_at).toLocaleDateString(),
            )}
          </span>
          <span className="text-muted-foreground text-xs">
            {translation.pages.projects.repositories.card.updated.replace(
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
                      {translation.pages.projects.repositories.card.livePreview}
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TooltipTrigger>
              {!repository.homepage && (
                <TooltipContent side="top">
                  {
                    translation.pages.projects.repositories.card
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
              {translation.pages.projects.repositories.card.viewRepository}
              <ExternalLink className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
