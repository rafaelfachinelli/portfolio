'use client'

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@datum/ui'
import { ExternalLink, Github, Loader, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { getLanguageConfig } from '@/config/languages'

import type { RepositoriesText } from './more-page-content'
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
  text: RepositoriesText['card']
}

const BANNER_SIZE = {
  width: 600,
  height: 128,
}
const BANNER_FALLBACK = '/images/fallback-banner.svg'

export function RepositoryCard({ repository, text }: RepositoryCardProps) {
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/${repository.default_branch}/.github/banner.svg`,
  )
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Card className={`flex min-h-[333px] flex-col border py-0 pb-6`}>
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
            <Loader className="text-season-accent h-8 w-8 animate-spin" />
          </div>
        )}
        <RepositoryTopicBadge topics={repository.topics} text={text} />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle
            asChild
            className="flex w-full items-center gap-2 text-xl font-bold lg:max-w-40"
          >
            <h2>
              <span className="truncate">{repository.name}</span>
            </h2>
          </CardTitle>
          {repository.language && (
            <Badge variant="outline" className="flex items-center gap-1">
              {getLanguageConfig(repository.language)?.icon}
              <span>{repository.language}</span>
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2 line-clamp-2 text-justify">
          {repository.description || text.noDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto border-t">
        <div className="mr-2 flex w-full flex-col justify-between gap-2">
          <span className="text-muted-foreground text-xs">
            {text.created.replace(
              '{date}',
              new Date(repository.created_at).toLocaleDateString(),
            )}
          </span>
          <span className="text-muted-foreground text-xs">
            {text.updated.replace(
              '{date}',
              new Date(repository.updated_at).toLocaleDateString(),
            )}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          {repository.homepage ? (
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link
                href={repository.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Radio className="h-4 w-4 animate-pulse text-red-500 motion-reduce:animate-none" />
                {text.livePreview}
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          ) : (
            // No live site: a disabled button, explained by a tooltip on a
            // focusable wrapper (a disabled button gets no focus or hover).
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0} className="w-full cursor-not-allowed">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled
                  >
                    <Radio className="h-4 w-4" />
                    {text.livePreview}
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                {text.livePreviewNotAvailable}
              </TooltipContent>
            </Tooltip>
          )}
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" />
              {text.viewRepository}
              <ExternalLink className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
