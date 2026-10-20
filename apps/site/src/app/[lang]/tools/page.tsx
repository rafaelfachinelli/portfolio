import { ToolsPageContent } from '@/components/pages/tools/tools-page-content'
import { toArticleLocale } from '@/content/articles'
import { architectureCopy } from '@/content/tools/architecture'
import { buildPageMetadata, canonicalLocale, resolveLocale } from '@/lib/seo'

import { getTranslation } from '../../../../get-translation'

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/tools',
    getCopy: t => ({
      title: t.pages.tools.title,
      description: t.pages.tools.description,
    }),
  })
}

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))
  const architecture = architectureCopy[toArticleLocale(lang)]

  return (
    <ToolsPageContent
      locale={canonicalLocale(resolveLocale(lang))}
      text={translation.pages.tools}
      tools={[
        {
          href: '/tools/architecture',
          title: architecture.name,
          description: architecture.meta.description,
        },
      ]}
    />
  )
}
