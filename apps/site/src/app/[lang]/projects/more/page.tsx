import { Suspense } from 'react'

import { MorePageContent } from '@/components/pages/projects/more/more-page-content'
import { buildPageMetadata, resolveLocale } from '@/lib/seo'

import { getTranslation } from '../../../../../get-translation'

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
      title: t.pages.projects.repositories.title,
      description: t.pages.projects.repositories.pageDescription,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return (
    <Suspense>
      <MorePageContent
        title={translation.pages.projects.repositories.title}
        description={translation.pages.projects.repositories.pageDescription}
        text={translation.pages.projects.repositories}
      />
    </Suspense>
  )
}
