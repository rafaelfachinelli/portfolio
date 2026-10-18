import { PersonalManifestoPageContent } from '@/components/pages/about/personal-manifesto/personal-manifesto'
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
    path: '/about/personal-manifesto',
    getCopy: t => ({
      title: t.pages.about.personalManifesto.title,
      description: t.pages.about.personalManifesto.description,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return <PersonalManifestoPageContent translation={translation} />
}
