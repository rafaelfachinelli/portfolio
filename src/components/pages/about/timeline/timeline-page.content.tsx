'use client'

import { differenceInMonths } from 'date-fns'
import { motion } from 'framer-motion'
import { Building2, Clock, FlagTriangleRight, MapPin } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { Separator } from '@/components/ui/separator'
import { UnderConstructionPageAlert } from '@/components/under-construction-page-alert'
import { useLanguage } from '@/contexts/LanguageContext'
import { capitalizeFirstLetter } from '@/lib/utils'

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
  const { translation } = useLanguage()

  const groupedTimeline: GroupedTimelineEntry[] =
    translation.pages.about.timeline.content
      .reduce((acc: GroupedTimelineEntry[], entry: TimelineEntry) => {
        const existingGroup = acc.find(group => group.company === entry.company)
        if (existingGroup) {
          existingGroup.roles.unshift({
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
      }, [])
      .reverse()

  // The 'role.duration' string is expected to be in the format 'start - end',
  // where 'start' and 'end' are date strings (e.g., '2020-01 - 2022-06').
  const calculateTotalTime = (roles: Role[]) => {
    const totalMonths = roles.reduce((sum, role) => {
      const [start, end] = role.duration.split(' - ')
      const startDate = new Date(start)
      const endDate =
        end === capitalizeFirstLetter(translation.commons.present)
          ? new Date()
          : new Date(end)
      return sum + differenceInMonths(endDate, startDate)
    }, 0)

    const years = Math.floor(totalMonths / 12)
    const months = totalMonths % 12
    return `${years > 0 ? `${years}${translation.pages.about.timeline.timeFormat.years} ` : ''}${months > 0 ? `${months}${translation.pages.about.timeline.timeFormat.months}` : ''}`
  }

  const motionAnimationProps = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  return (
    <>
      <PageTitle
        icon={FlagTriangleRight}
        title={translation.pages.about.timeline.title}
        description={translation.pages.about.timeline.description}
      />

      <PageContent className="relative gap-4">
        <Card className="mb-4 border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
          <div className="relative">
            {groupedTimeline.map(group => (
              <motion.div
                key={group.company}
                className="mb-4"
                {...motionAnimationProps}
              >
                <div className="flex items-center justify-between gap-2 md:justify-start">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Building2 />
                    <span>{group.company}</span>
                  </h3>
                  <div className="ml-2 flex items-center gap-1 whitespace-nowrap">
                    <motion.div
                      whileInView={{ rotate: 360 }}
                      initial={{ rotate: 0 }}
                      className="flex items-center justify-center"
                      transition={{ duration: 1 }}
                    >
                      <Clock className="h-3 w-3 text-sky-700 dark:text-sky-500" />
                    </motion.div>
                    <span className="text-sm text-sky-700 dark:text-sky-500">
                      {calculateTotalTime(group.roles)}
                    </span>
                  </div>
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-3 w-3 text-red-500" />
                  <span>{group.location}</span>
                </p>
                {group.roles.map(role => (
                  <motion.div
                    key={role.role}
                    className="relative mt-2 ml-6"
                    {...motionAnimationProps}
                    transition={{
                      ...motionAnimationProps.transition,
                      delay: 0.2,
                    }}
                  >
                    <Separator
                      orientation="vertical"
                      className="absolute top-0 -left-[18px] h-full bg-sky-700 dark:bg-sky-500"
                    />
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
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </Card>
        <UnderConstructionPageAlert />
      </PageContent>
    </>
  )
}
