'use client'

import { Button } from '@datum/ui'
import { Loader, Presentation, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import React from 'react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

import type { Translation } from '../../../../../get-translation'
import { Filters } from './filters'
import { Repository, RepositoryCard } from './repository-card'

export type RepositoriesText = Translation['pages']['projects']['repositories']

type MorePageContentProps = Readonly<{
  title: string
  description: string
  text: RepositoriesText
}>

export function MorePageContent({
  title,
  description,
  text,
}: MorePageContentProps) {
  const { translation } = useLanguage()
  const searchParams = useSearchParams()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [allRepositories, setAllRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRepositories = useCallback(async () => {
    try {
      setIsRefreshing(true)
      if (allRepositories.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      setIsLoading(true)
      const response = await fetch(`/api/github/repositories`)

      if (!response.ok) {
        const data = await response.json()
        if (data.error === 'rate_limit') {
          throw new Error(
            'GitHub API rate limit exceeded. Please try again later.',
          )
        }
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data: Repository[] = await response.json()
      setAllRepositories(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [allRepositories.length])

  useEffect(() => {
    fetchRepositories()
  }, [fetchRepositories])

  useEffect(() => {
    if (allRepositories.length === 0) return

    let filteredRepositories = [...allRepositories]

    const type = searchParams.get('type')
    const preview = searchParams.get('preview')
    const language = searchParams.get('language')
    const year = searchParams.get('year')

    if (type && type !== 'all') {
      if (type === 'others') {
        filteredRepositories = filteredRepositories.filter(
          repo =>
            !repo.topics?.includes('portfolio') &&
            !repo.topics?.includes('event') &&
            !repo.topics?.includes('study'),
        )
      } else {
        filteredRepositories = filteredRepositories.filter(repo =>
          repo.topics?.includes(type),
        )
      }
    }

    if (preview && preview !== 'all') {
      filteredRepositories = filteredRepositories.filter(
        repo =>
          (preview === 'yes' && repo.homepage) ||
          (preview === 'no' && !repo.homepage),
      )
    }

    if (language && language !== 'all') {
      filteredRepositories = filteredRepositories.filter(
        repo => repo.language === language,
      )
    }

    if (year && year !== 'all') {
      const yearNum = parseInt(year)
      filteredRepositories = filteredRepositories.filter(
        repo => new Date(repo.created_at).getFullYear() === yearNum,
      )
    }

    setRepositories(filteredRepositories)
  }, [allRepositories, searchParams])

  return (
    <>
      <PageTitle icon={Presentation} title={title} description={description} />

      <PageContent className="gap-4">
        <h1 className="text-center text-3xl font-bold">{text.title}</h1>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <Filters
              allRepositories={allRepositories}
              disabled={isLoading}
              text={text.filters}
            />
            <Button
              variant="outline"
              size="icon"
              aria-label={text.refresh}
              onClick={fetchRepositories}
              disabled={isLoading}
              className="cursor-pointer rounded-full select-none"
            >
              <RefreshCw
                className={`h-4 w-4 transition-all duration-300 ease-in-out ${isLoading ? 'text-season-accent animate-spin' : ''}`}
              />
            </Button>
          </div>
          <p className="text-muted-foreground w-full text-center">
            {!isLoading &&
              text.description.split('{count}').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="text-primary font-bold">
                      {repositories.length.toString()}
                    </span>
                  )}
                </React.Fragment>
              ))}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive mb-6 rounded-lg p-4">
            <p>
              {translation.commons.error}: {error}
            </p>
          </div>
        )}

        {!isLoading && !error && repositories.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">{text.notFound}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader className="text-season-accent h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">
                {translation.commons.loading}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!isRefreshing &&
              repositories.map(repo => (
                <div
                  key={repo.id}
                  className="animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none"
                >
                  <RepositoryCard repository={repo} text={text.card} />
                </div>
              ))}
          </div>
        )}
      </PageContent>
    </>
  )
}
