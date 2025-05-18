'use client'

import {
  Briefcase,
  Calendar,
  Check,
  ChevronsUpDown,
  GraduationCap,
  Radio,
  Search,
  Shapes,
  Trophy,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getLanguageConfig } from '@/config/languages'
import { useLanguage } from '@/contexts/LanguageContext'

import { Repository } from './repository-card'

interface FiltersProps {
  allRepositories: Repository[]
  disabled?: boolean
}

export function Filters({ allRepositories, disabled }: FiltersProps) {
  const { dictionary } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [openType, setOpenType] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)
  const [openLanguage, setOpenLanguage] = useState(false)
  const [openYear, setOpenYear] = useState(false)

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

  const updateFilter = (name: string, value: string) => {
    if (disabled) return
    router.push(`?${createQueryString(name, value)}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Type Filter */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="type-filter">
          {dictionary.pages.projects.repositories.filters.labels.type}:
        </Label>
        <Popover
          open={openType && !disabled}
          onOpenChange={disabled ? undefined : setOpenType}
        >
          <PopoverTrigger asChild>
            <Button
              id="type-filter"
              variant="outline"
              role="combobox"
              aria-expanded={openType}
              className="w-[200px] justify-between"
              disabled={disabled}
            >
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
                    ] || dictionary.pages.projects.repositories.filters.type.all
                  : dictionary.pages.projects.repositories.filters.type.all}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder={
                  dictionary.pages.projects.repositories.filters.type.search
                }
              />
              <CommandEmpty>
                {dictionary.pages.projects.repositories.filters.type.notFound}
              </CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    updateFilter('type', 'all')
                    setOpenType(false)
                  }}
                  className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      !searchParams.get('type') ||
                      searchParams.get('type') === 'all'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Search className="text-muted-foreground h-3 w-3" />
                  {dictionary.pages.projects.repositories.filters.type.all}
                </CommandItem>
                <CommandItem
                  value="portfolio"
                  onSelect={() => {
                    updateFilter('type', 'portfolio')
                    setOpenType(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('type') === 'portfolio'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Briefcase className="h-3 w-3 text-green-500" />
                  {
                    dictionary.pages.projects.repositories.filters.type
                      .portfolio
                  }
                </CommandItem>
                <CommandItem
                  value="event"
                  onSelect={() => {
                    updateFilter('type', 'event')
                    setOpenType(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('type') === 'event'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Trophy className="h-3 w-3 text-purple-500" />
                  {dictionary.pages.projects.repositories.filters.type.event}
                </CommandItem>
                <CommandItem
                  value="study"
                  onSelect={() => {
                    updateFilter('type', 'study')
                    setOpenType(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('type') === 'study'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <GraduationCap className="h-3 w-3 text-blue-500" />
                  {dictionary.pages.projects.repositories.filters.type.study}
                </CommandItem>
                <CommandItem
                  value="others"
                  onSelect={() => {
                    updateFilter('type', 'others')
                    setOpenType(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('type') === 'others'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Shapes className="h-3 w-3 text-red-500" />
                  {dictionary.pages.projects.repositories.filters.type.others}
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Preview Filter */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="preview-filter">
          {dictionary.pages.projects.repositories.filters.labels.preview}:
        </Label>
        <Popover
          open={openPreview && !disabled}
          onOpenChange={disabled ? undefined : setOpenPreview}
        >
          <PopoverTrigger asChild>
            <Button
              id="preview-filter"
              variant="outline"
              role="combobox"
              aria-expanded={openPreview}
              className="w-[200px] justify-between"
              disabled={disabled}
            >
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
                    dictionary.pages.projects.repositories.filters.preview.all
                  : dictionary.pages.projects.repositories.filters.preview.all}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder={
                  dictionary.pages.projects.repositories.filters.preview.search
                }
              />
              <CommandEmpty>
                {
                  dictionary.pages.projects.repositories.filters.preview
                    .notFound
                }
              </CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    updateFilter('preview', 'all')
                    setOpenPreview(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      !searchParams.get('preview') ||
                      searchParams.get('preview') === 'all'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Search className="text-muted-foreground h-3 w-3" />
                  {dictionary.pages.projects.repositories.filters.preview.all}
                </CommandItem>
                <CommandItem
                  value="yes"
                  onSelect={() => {
                    updateFilter('preview', 'yes')
                    setOpenPreview(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('preview') === 'yes'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Radio className="h-4 w-4 animate-pulse text-red-500" />
                  {dictionary.pages.projects.repositories.filters.preview.yes}
                </CommandItem>
                <CommandItem
                  value="no"
                  onSelect={() => {
                    updateFilter('preview', 'no')
                    setOpenPreview(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      searchParams.get('preview') === 'no'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Radio className="text-muted-foreground h-4 w-4" />
                  {dictionary.pages.projects.repositories.filters.preview.no}
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Language Filter */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="language-filter">
          {dictionary.pages.projects.repositories.filters.labels.language}:
        </Label>
        <Popover
          open={openLanguage && !disabled}
          onOpenChange={disabled ? undefined : setOpenLanguage}
        >
          <PopoverTrigger asChild>
            <Button
              id="language-filter"
              variant="outline"
              role="combobox"
              aria-expanded={openLanguage}
              className="w-[200px] justify-between"
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                {searchParams.get('language') &&
                  getLanguageConfig(searchParams.get('language'))?.icon}
                {searchParams.get('language') ||
                  dictionary.pages.projects.repositories.filters.language.all}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder={
                  dictionary.pages.projects.repositories.filters.language.search
                }
              />
              <CommandEmpty>
                {
                  dictionary.pages.projects.repositories.filters.language
                    .notFound
                }
              </CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    updateFilter('language', 'all')
                    setOpenLanguage(false)
                  }}
                  className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  <Check
                    className={`h-4 w-4 text-green-500 ${
                      !searchParams.get('language') ||
                      searchParams.get('language') === 'all'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Search className="text-muted-foreground h-3 w-3" />
                  {dictionary.pages.projects.repositories.filters.language.all}
                </CommandItem>
                {allLanguages.map(language => {
                  const languageConfig = getLanguageConfig(language)
                  return (
                    <CommandItem
                      key={language}
                      value={language}
                      onSelect={() => {
                        updateFilter('language', language)
                        setOpenLanguage(false)
                      }}
                      className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                    >
                      <Check
                        className={`h-4 w-4 text-green-500 ${
                          searchParams.get('language') === language
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      />
                      {languageConfig?.icon}
                      <span>{language}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Year Filter */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="year-filter">
          {dictionary.pages.projects.repositories.filters.labels.year}:
        </Label>
        <Popover
          open={openYear && !disabled}
          onOpenChange={disabled ? undefined : setOpenYear}
        >
          <PopoverTrigger asChild>
            <Button
              id="year-filter"
              variant="outline"
              role="combobox"
              aria-expanded={openYear}
              className="w-[200px] justify-between"
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                {searchParams.get('year') ||
                  dictionary.pages.projects.repositories.filters.year.all}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder={
                  dictionary.pages.projects.repositories.filters.year.search
                }
              />
              <CommandEmpty>
                {dictionary.pages.projects.repositories.filters.year.notFound}
              </CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    updateFilter('year', 'all')
                    setOpenYear(false)
                  }}
                >
                  <Check
                    className={`h-4 w-4 ${
                      !searchParams.get('year') ||
                      searchParams.get('year') === 'all'
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <Search className="text-muted-foreground h-3 w-3" />
                  {dictionary.pages.projects.repositories.filters.year.all}
                </CommandItem>
                {allYears.map(year => (
                  <CommandItem
                    key={year}
                    value={year.toString()}
                    onSelect={() => {
                      updateFilter('year', year.toString())
                      setOpenYear(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={`h-4 w-4 ${
                          searchParams.get('year') === year.toString()
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      />
                      <Calendar className="text-muted-foreground h-3 w-3" />
                      <span>{year}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
