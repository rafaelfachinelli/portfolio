'use client'

import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import React from 'react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

import { Repository, RepositoryCard } from './repository-card'

export function MorePageContent() {
  const { dictionary } = useLanguage()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/github/repositories')

        if (!response.ok) {
          const data = await response.json()
          if (data.error === 'rate_limit') {
            throw new Error(
              'GitHub API rate limit exceeded. Please try again later.',
            )
          }
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()
        setRepositories(data)
        setError(null)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  return (
    <>
      <PageTitle
        title={dictionary.pages.projects.title}
        description={dictionary.pages.projects.description}
      />

      <PageContent className="gap-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">
            {dictionary.pages.projects.repositories.title}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-muted-foreground flex items-center gap-1">
              {dictionary.pages.projects.repositories.description
                .split('{count}')
                .map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 &&
                      (isLoading ? (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                      ) : (
                        repositories.length.toString()
                      ))}
                  </React.Fragment>
                ))}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 text-destructive mb-6 rounded-lg p-4">
            <p>
              {dictionary.commons.error}: {error}
            </p>
          </div>
        )}

        {!isLoading && !error && repositories.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {dictionary.pages.projects.repositories.card.noDescription}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map(repo => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>

        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
