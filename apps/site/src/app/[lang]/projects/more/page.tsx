import { Suspense } from 'react'

import { MorePageContent } from '@/components/pages/projects/more/more-page-content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/projects/more',
    getCopy: t => ({
      title: t.pages.projects.title,
      description: t.pages.projects.description,
    }),
  })
}

export default function Page() {
  return (
    <Suspense>
      <MorePageContent />
    </Suspense>
  )
}
