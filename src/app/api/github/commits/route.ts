import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'rafaelfachinelli'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const repo = searchParams.get('repo')

  if (!repo) {
    return NextResponse.json(
      { error: 'Missing repo parameter' },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=1`,
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
        { error: 'unknown', message: 'Failed to fetch commit count' },
        { status: response.status },
      )
    }

    const linkHeader = response.headers.get('link')
    let commitCount = 0

    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/)
      if (match) {
        commitCount = parseInt(match[1], 10)
      }
    }

    return NextResponse.json({ commitCount })
  } catch (error) {
    console.error('Error fetching commit count:', error)
    return NextResponse.json(
      { error: 'unknown', message: 'Internal server error' },
      { status: 500 },
    )
  }
}
