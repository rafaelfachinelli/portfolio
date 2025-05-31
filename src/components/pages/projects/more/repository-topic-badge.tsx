import { Briefcase, GraduationCap, Trophy } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useLanguage } from '@/contexts/LanguageContext'

interface RepositoryBadgeConfigProps {
  topics: string[]
}

export function RepositoryTopicBadge({ topics }: RepositoryBadgeConfigProps) {
  const { translation } = useLanguage()

  const isStudyProject = topics.includes('study')
  const isEventProject = topics.includes('event')
  const isPortfolioProject = topics.includes('portfolio')

  const hasTopicConfig = isStudyProject || isEventProject || isPortfolioProject

  if (!hasTopicConfig) {
    return null
  }

  return (
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
                ? translation.commons.event
                : isPortfolioProject
                  ? translation.commons.portfolio
                  : translation.commons.study}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {isEventProject
              ? translation.pages.projects.repositories.card
                  .eventProjectBadgeDescription
              : isPortfolioProject
                ? translation.pages.projects.repositories.card
                    .portfolioProjectBadgeDescription
                : translation.pages.projects.repositories.card
                    .studyProjectBadgeDescription}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
