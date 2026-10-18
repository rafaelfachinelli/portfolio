import { InstalacoesEReformasPageContent } from '@/components/pages/projects/instalacoes-e-reformas/instalacoes-e-reformas-page-content'
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
    path: '/projects/instalacoes-e-reformas',
    getCopy: t => ({
      title: t.pages.projects.instalacoesEReformas.title,
      description: t.pages.projects.instalacoesEReformas.description,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return (
    <InstalacoesEReformasPageContent lang={lang} translation={translation} />
  )
}
