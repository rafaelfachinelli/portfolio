import { Building2, Clock, FlagTriangleRight, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { Separator } from '@/components/ui/separator'
import { capitalizeFirstLetter } from '@/lib/utils'

import type { Translation } from '../../../../../get-translation'
import { TenureLabel, type TenurePeriod } from './tenure-label'

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

// Company logos in /public/images/companies, matched by a keyword in the
// company name. Companies without a match fall back to a generic icon.
const COMPANY_LOGOS: { keyword: string; src: string }[] = [
  { keyword: 'kruzer', src: '/images/companies/kruzer.webp' },
  { keyword: 'leroy', src: '/images/companies/leroy-merlin.webp' },
  { keyword: 'flex', src: '/images/companies/flex.webp' },
  { keyword: 'daneva', src: '/images/companies/daneva.webp' },
  { keyword: 'easycomp', src: '/images/companies/easycomp.webp' },
]

function CompanyLogo({ company }: Readonly<{ company: string }>) {
  const logo = COMPANY_LOGOS.find(({ keyword }) =>
    company.toLowerCase().includes(keyword),
  )

  if (!logo) return <Building2 />

  return (
    <Image
      src={logo.src}
      alt=""
      width={64}
      height={64}
      className="h-8 w-8 shrink-0 rounded-md bg-white object-contain"
    />
  )
}

const MONTHS: Record<string, number> = {
  janeiro: 0,
  january: 0,
  fevereiro: 1,
  february: 1,
  março: 2,
  marco: 2,
  march: 2,
  abril: 3,
  april: 3,
  maio: 4,
  may: 4,
  junho: 5,
  june: 5,
  julho: 6,
  july: 6,
  agosto: 7,
  august: 7,
  setembro: 8,
  september: 8,
  outubro: 9,
  october: 9,
  novembro: 10,
  november: 10,
  dezembro: 11,
  december: 11,
}

// The 'role.duration' string is expected to be in the format
// '<Month> <year> - <Month> <year>' (or '... - Present'), in any supported
// language (e.g., 'August 2024 - February 2026', 'Agosto 2024 - Presente').
function parseMonthYear(value: string): [number, number] | null {
  const [monthName, year] = value.trim().toLowerCase().split(/\s+/)
  const month = MONTHS[monthName]
  if (month === undefined || !year) return null
  return [Number(year), month]
}

function toPeriods(roles: Role[], presentLabel: string): TenurePeriod[] {
  return roles.flatMap((role): TenurePeriod[] => {
    const [start, end] = role.duration.split(' - ')
    const startMonth = parseMonthYear(start)
    if (!startMonth) return []
    if (end === presentLabel) return [{ start: startMonth, end: null }]
    const endMonth = parseMonthYear(end)
    return endMonth ? [{ start: startMonth, end: endMonth }] : []
  })
}

function groupByCompany(entries: TimelineEntry[]): GroupedTimelineEntry[] {
  // The translation content is ordered from most recent to oldest, so companies
  // and the roles inside each company keep that order (newest first).
  return entries.reduce((acc: GroupedTimelineEntry[], entry) => {
    const role = {
      role: entry.role,
      duration: entry.duration,
      responsibilities: entry.responsibilities,
    }
    const existingGroup = acc.find(group => group.company === entry.company)
    if (existingGroup) {
      existingGroup.roles.push(role)
    } else {
      acc.push({
        company: entry.company,
        location: entry.location,
        roles: [role],
      })
    }
    return acc
  }, [])
}

// Server component: only the tenure labels hydrate (they track the current month).
export function TimelinePageContent({
  translation,
}: Readonly<{ translation: Translation }>) {
  const timeline = translation.pages.about.timeline
  const groupedTimeline = groupByCompany(timeline.content)
  const presentLabel = capitalizeFirstLetter(translation.commons.present)

  return (
    <>
      <PageTitle
        icon={FlagTriangleRight}
        title={timeline.title}
        description={timeline.description}
      />

      <PageContent className="relative gap-4">
        <Card className="mb-4 border-0 bg-white p-6 dark:bg-black/50">
          <div className="relative">
            {groupedTimeline.map(group => (
              <div key={group.company} className="mb-4">
                <div className="flex items-center justify-between gap-2 md:justify-start">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <CompanyLogo company={group.company} />
                    <span>{group.company}</span>
                  </h3>
                  <div className="ml-2 flex items-center gap-1 whitespace-nowrap">
                    <Clock className="text-season-accent h-3 w-3" />
                    <TenureLabel
                      periods={toPeriods(group.roles, presentLabel)}
                      yearsSuffix={timeline.timeFormat.years}
                      monthsSuffix={timeline.timeFormat.months}
                      className="text-season-accent text-sm"
                    />
                  </div>
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-3 w-3 text-red-500" />
                  <span>{group.location}</span>
                </p>
                {group.roles.map(role => (
                  <div key={role.role} className="relative mt-2 ml-6">
                    <Separator
                      orientation="vertical"
                      className="bg-season-accent dark:bg-season-accent absolute top-0 -left-[18px] h-full"
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </PageContent>
    </>
  )
}
