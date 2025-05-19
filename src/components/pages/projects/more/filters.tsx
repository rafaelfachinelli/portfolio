'use client'

import {
  Briefcase,
  Calendar,
  Filter,
  GraduationCap,
  Radio,
  Search,
  Shapes,
  Trash,
  Trophy,
  X,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getLanguageConfig } from '@/config/languages'
import { useLanguage } from '@/contexts/LanguageContext'

import { Repository } from './repository-card'

export interface FiltersProps {
  allRepositories: Repository[]
  disabled?: boolean
}

export function Filters({ allRepositories, disabled }: FiltersProps) {
  const { dictionary } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [openSheet, setOpenSheet] = useState(false)

  // Get all unique languages from all repositories
  const allLanguages = Array.from(
    new Set(
      allRepositories
        .map(repo => repo.language)
        .filter((lang): lang is string => lang !== null),
    ),
  ).sort()

  // Get all unique years from all repositories
  const allYears = Array.from(
    new Set(
      allRepositories.map(repo => new Date(repo.created_at).getFullYear()),
    ),
  ).sort((a, b) => b - a)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams],
  )

  const hasFilterSelected = () => {
    const params = new URLSearchParams(searchParams.toString())
    let count = 0
    for (const [, value] of params.entries()) {
      if (value !== 'all') {
        count++
      }
    }

    return count > 0
  }

  const updateFilter = (name: string, value: string) => {
    if (disabled) return
    router.push(`?${createQueryString(name, value)}`)
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant="outline" className="cursor-pointer select-none">
          <Filter className="h-4 w-4" />
          {dictionary.pages.projects.repositories.filters.title}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {dictionary.pages.projects.repositories.filters.title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          {/* Type Filter */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="type-filter">
              {dictionary.pages.projects.repositories.filters.labels.type}:
            </Label>
            <Select
              value={searchParams.get('type') || 'all'}
              onValueChange={value => updateFilter('type', value)}
              disabled={disabled}
            >
              <SelectTrigger id="type-filter" className="w-full cursor-pointer">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {searchParams.get('type') === 'portfolio' && (
                      <Briefcase className="h-3 w-3 text-green-500" />
                    )}
                    {searchParams.get('type') === 'event' && (
                      <Trophy className="h-3 w-3 text-purple-500" />
                    )}
                    {searchParams.get('type') === 'study' && (
                      <GraduationCap className="h-3 w-3 text-blue-500" />
                    )}
                    {searchParams.get('type') === 'others' && (
                      <Shapes className="h-3 w-3 text-red-500" />
                    )}
                    {!searchParams.get('type') ||
                      (searchParams.get('type') === 'all' && (
                        <Search className="text-muted-foreground h-3 w-3" />
                      ))}
                    {searchParams.get('type')
                      ? dictionary.pages.projects.repositories.filters.type[
                          searchParams.get('type') as
                            | 'portfolio'
                            | 'event'
                            | 'study'
                            | 'others'
                        ] ||
                        dictionary.pages.projects.repositories.filters.type.all
                      : dictionary.pages.projects.repositories.filters.type.all}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground h-3 w-3" />
                    {dictionary.pages.projects.repositories.filters.type.all}
                  </div>
                </SelectItem>
                <SelectItem
                  value="portfolio"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-green-500" />
                    {
                      dictionary.pages.projects.repositories.filters.type
                        .portfolio
                    }
                  </div>
                </SelectItem>
                <SelectItem
                  value="event"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3 w-3 text-purple-500" />
                    {dictionary.pages.projects.repositories.filters.type.event}
                  </div>
                </SelectItem>
                <SelectItem
                  value="study"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3 w-3 text-blue-500" />
                    {dictionary.pages.projects.repositories.filters.type.study}
                  </div>
                </SelectItem>
                <SelectItem
                  value="others"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Shapes className="h-3 w-3 text-red-500" />
                    {dictionary.pages.projects.repositories.filters.type.others}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview Filter */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="preview-filter">
              {dictionary.pages.projects.repositories.filters.labels.preview}:
            </Label>
            <Select
              value={searchParams.get('preview') || 'all'}
              onValueChange={value => updateFilter('preview', value)}
              disabled={disabled}
            >
              <SelectTrigger
                id="preview-filter"
                className="w-full cursor-pointer"
              >
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {searchParams.get('preview') === 'yes' && (
                      <Radio className="h-4 w-4 animate-pulse text-red-500" />
                    )}
                    {searchParams.get('preview') === 'no' && (
                      <Radio className="text-muted-foreground h-4 w-4" />
                    )}
                    {!searchParams.get('preview') ||
                      (searchParams.get('preview') === 'all' && (
                        <Search className="text-muted-foreground h-3 w-3" />
                      ))}
                    {searchParams.get('preview')
                      ? dictionary.pages.projects.repositories.filters.preview[
                          searchParams.get('preview') as 'yes' | 'no'
                        ] ||
                        dictionary.pages.projects.repositories.filters.preview
                          .all
                      : dictionary.pages.projects.repositories.filters.preview
                          .all}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground h-3 w-3" />
                    {dictionary.pages.projects.repositories.filters.preview.all}
                  </div>
                </SelectItem>
                <SelectItem
                  value="yes"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 animate-pulse text-red-500" />
                    {dictionary.pages.projects.repositories.filters.preview.yes}
                  </div>
                </SelectItem>
                <SelectItem
                  value="no"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Radio className="text-muted-foreground h-4 w-4" />
                    {dictionary.pages.projects.repositories.filters.preview.no}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Filter */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="language-filter">
              {dictionary.pages.projects.repositories.filters.labels.language}:
            </Label>
            <Select
              value={searchParams.get('language') || 'all'}
              onValueChange={value => updateFilter('language', value)}
              disabled={disabled}
            >
              <SelectTrigger
                id="language-filter"
                className="w-full cursor-pointer"
              >
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {searchParams.get('language') &&
                      getLanguageConfig(searchParams.get('language'))?.icon}
                    {searchParams.get('language') ||
                      dictionary.pages.projects.repositories.filters.language
                        .all}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground h-3 w-3" />
                    {
                      dictionary.pages.projects.repositories.filters.language
                        .all
                    }
                  </div>
                </SelectItem>
                {allLanguages.map(language => {
                  const languageConfig = getLanguageConfig(language)
                  return (
                    <SelectItem
                      key={language}
                      value={language}
                      className="hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {languageConfig?.icon}
                        <span>{language}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="year-filter">
              {dictionary.pages.projects.repositories.filters.labels.year}:
            </Label>
            <Select
              value={searchParams.get('year') || 'all'}
              onValueChange={value => updateFilter('year', value)}
              disabled={disabled}
            >
              <SelectTrigger id="year-filter" className="w-full cursor-pointer">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {searchParams.get('year') ||
                      dictionary.pages.projects.repositories.filters.year.all}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className="hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground h-3 w-3" />
                    {dictionary.pages.projects.repositories.filters.year.all}
                  </div>
                </SelectItem>
                {allYears.map(year => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className="hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="text-muted-foreground h-3 w-3" />
                      <span>{year}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              className="w-full cursor-pointer select-none"
              onClick={() => {
                if (disabled) return
                router.push('?')
              }}
              disabled={disabled || !hasFilterSelected()}
            >
              <Trash className="h-4 w-4 text-blue-500" />
              {dictionary.pages.projects.repositories.filters.buttons.clear}
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full cursor-pointer select-none"
              >
                <X className="h-4 w-4 text-red-500" />
                {dictionary.pages.projects.repositories.filters.buttons.close}
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
