import { Markit3DPageContent } from '@/components/pages/projects/markit3d/markit3d-page-content'
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
    path: '/projects/markit3d',
    getCopy: t => ({
      title: t.pages.projects.markit3d.title,
      description: t.pages.projects.markit3d.description,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return <Markit3DPageContent lang={lang} translation={translation} />
}
