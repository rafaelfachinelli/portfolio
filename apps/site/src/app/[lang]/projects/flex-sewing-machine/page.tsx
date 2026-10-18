import { FlexSewingMachinePageContent } from '@/components/pages/projects/flex-sewing-machine/flex-sewing-machine-page-content'
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
    path: '/projects/flex-sewing-machine',
    getCopy: t => ({
      title: t.pages.projects.flexSewingMachine.title,
      description: t.pages.projects.flexSewingMachine.description,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return <FlexSewingMachinePageContent lang={lang} translation={translation} />
}
