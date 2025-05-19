'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

import { Filters } from './filters'
import { Repository, RepositoryCard } from './repository-card'

export function MorePageContent() {
  const { dictionary } = useLanguage()
  const searchParams = useSearchParams()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [allRepositories, setAllRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchRepositories() {
    try {
      setIsRefreshing(true)
      // Add a small delay to allow exit animations to complete
      await new Promise(resolve => setTimeout(resolve, 300))
      setIsLoading(true)
      // Fetch all repositories initially
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
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

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
      <PageTitle
        title={dictionary.pages.projects.title}
        description={dictionary.pages.projects.description}
      />

      <PageContent className="gap-4">
        <h1 className="text-center text-3xl font-bold">
          {dictionary.pages.projects.repositories.title}
        </h1>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <Filters allRepositories={allRepositories} disabled={isLoading} />
            <Button
              variant="outline"
              size="icon"
              onClick={fetchRepositories}
              disabled={isLoading}
              className="cursor-pointer rounded-full select-none"
            >
              <RefreshCw
                className={`h-4 w-4 transition-all duration-300 ease-in-out ${isLoading ? 'animate-spin text-blue-500' : ''}`}
              />
            </Button>
          </div>
          <p className="text-muted-foreground w-full text-center">
            {!isLoading &&
              dictionary.pages.projects.repositories.description
                .split('{count}')
                .map((part, index, array) => (
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
              {dictionary.commons.error}: {error}
            </p>
          </div>
        )}

        {!isLoading && !error && repositories.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {dictionary.pages.projects.repositories.notFound}
            </p>
          </div>
        )}

        {isLoading ? (
          <motion.div
            className="flex min-h-[400px] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-muted-foreground text-sm">
                {dictionary.commons.loading}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence mode="popLayout">
              {!isRefreshing &&
                repositories.map(repo => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <RepositoryCard repository={repo} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </PageContent>
    </>
  )
}
