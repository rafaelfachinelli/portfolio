'use client'

import { Building2, Clock, MapPin } from 'lucide-react'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'

interface Role {
  role: string
  duration: string
  responsibilities: string[]
}

interface GroupedTimelineEntry {
  company: string
  location: string
  roles: Role[]
}

export interface TimelineEntry {
  company: string
  location: string
  role: string
  duration: string
  responsibilities: string[]
}

export function TimelinePageContent() {
  const { dictionary } = useLanguage()

  const groupedTimeline: GroupedTimelineEntry[] =
    dictionary.pages.about.timeline.content.reduce(
      (acc: GroupedTimelineEntry[], entry: TimelineEntry) => {
        const existingGroup = acc.find(group => group.company === entry.company)
        if (existingGroup) {
          existingGroup.roles.push({
            role: entry.role,
            duration: entry.duration,
            responsibilities: entry.responsibilities,
          })
        } else {
          acc.push({
            company: entry.company,
            location: entry.location,
            roles: [
              {
                role: entry.role,
                duration: entry.duration,
                responsibilities: entry.responsibilities,
              },
            ],
          })
        }
        return acc
      },
      [],
    )

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.timeline.title}
        description={dictionary.pages.about.timeline.description}
      />

      <PageContent className="gap-4">
        {groupedTimeline.map(group => (
          <div key={group.company} className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Building2 />
              <span>{group.company}</span>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-3 w-3" />
              <span>{group.location}</span>
            </p>
            {group.roles.map(role => (
              <div key={role.role} className="mt-2 ml-6">
                <h4 className="text-md font-semibold">{role.role}</h4>
                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{role.duration}</span>
                </p>
                <ul className="mt-1 list-inside list-disc">
                  {role.responsibilities.map(responsibility => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
