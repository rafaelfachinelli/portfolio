import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'rafaelfachinelli'

export async function GET() {
  try {
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

    const data = await response.json()
    // Filter out repositories with "no-exposed-to-site" topic
    const filteredData = data.filter(
      (repo: { topics: string[] }) =>
        !repo.topics?.includes('not-exposed-on-website'),
    )
    return NextResponse.json(filteredData)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json(
      { error: 'unknown', message: 'Internal server error' },
      { status: 500 },
    )
  }
}
