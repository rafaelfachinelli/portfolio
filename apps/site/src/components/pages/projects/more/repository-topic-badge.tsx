import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@datum/ui'
import { Briefcase, GraduationCap, type LucideIcon, Trophy } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

import type { RepositoriesText } from './more-page-content'

interface RepositoryBadgeConfigProps {
  topics: string[]
  text: RepositoriesText['card']
}

type TopicKind = 'event' | 'portfolio' | 'study'

const TOPIC_ICONS: Record<TopicKind, LucideIcon> = {
  event: Trophy,
  portfolio: Briefcase,
  study: GraduationCap,
}

// First matching topic wins, in this order.
const TOPIC_ORDER: TopicKind[] = ['event', 'portfolio', 'study']

/**
 * The repository kind, over the banner. A solid neutral badge, so it reads on
 * any banner; the icon tells the kinds apart and the tooltip explains it.
 */
export function RepositoryTopicBadge({
  topics,
  text,
}: RepositoryBadgeConfigProps) {
  const { translation } = useLanguage()
  const kind = TOPIC_ORDER.find(topic => topics.includes(topic))

  if (!kind) return null

  const Icon = TOPIC_ICONS[kind]
  const descriptions: Record<TopicKind, string> = {
    event: text.eventProjectBadgeDescription,
    portfolio: text.portfolioProjectBadgeDescription,
    study: text.studyProjectBadgeDescription,
  }

  return (
    <div className="absolute top-2 right-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="neutral"
            tabIndex={0}
            className="cursor-help select-none"
          >
            <Icon />
            {translation.commons[kind]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{descriptions[kind]}</TooltipContent>
      </Tooltip>
    </div>
  )
}
