import { NextRequest, NextResponse } from 'next/server'

const GITHUB_USERNAME = 'rafaelfachinelli'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const preview = searchParams.get('preview')
    const language = searchParams.get('language')
    const year = searchParams.get('year')

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=created&direction=asc`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    )

    if (response.status === 403) {
      return NextResponse.json(
        { error: 'rate_limit', message: 'GitHub API rate limit exceeded' },
        { status: 403 },
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'unknown', message: 'Failed to fetch repositories' },
        { status: response.status },
      )
    }

    let data = await response.json()

    // Filter out repositories with "no-exposed-to-site" topic
    data = data.filter(
      (repo: { topics: string[] }) =>
        !repo.topics?.includes('not-exposed-on-website'),
    )

    // Apply type filter
    if (type && type !== 'all') {
      if (type === 'others') {
        data = data.filter(
          (repo: { topics: string[] }) =>
            !repo.topics?.includes('portfolio') &&
            !repo.topics?.includes('event') &&
            !repo.topics?.includes('study'),
        )
      } else {
        data = data.filter((repo: { topics: string[] }) =>
          repo.topics?.includes(type),
        )
      }
    }

    // Apply preview filter
    if (preview && preview !== 'all') {
      data = data.filter(
        (repo: { homepage: string | null }) =>
          (preview === 'yes' && repo.homepage) ||
          (preview === 'no' && !repo.homepage),
      )
    }

    // Apply language filter
    if (language && language !== 'all') {
      data = data.filter(
        (repo: { language: string | null }) => repo.language === language,
      )
    }

    // Apply year filter
    if (year && year !== 'all') {
      const yearNum = parseInt(year)
      data = data.filter(
        (repo: { created_at: string }) =>
          new Date(repo.created_at).getFullYear() === yearNum,
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json(
      { error: 'unknown', message: 'Internal server error' },
      { status: 500 },
    )
  }
}
