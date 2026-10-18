import { ContactPageContent } from '@/components/pages/contact/contact-page-content'
import { buildPageMetadata, resolveLocale } from '@/lib/seo'

import { getTranslation } from '../../../../get-translation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/contact',
    getCopy: t => ({
      title: t.pages.contact.title,
      description: t.pages.contact.description,
    }),
  })
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  const translation = await getTranslation(resolveLocale(lang))

  return <ContactPageContent text={translation.pages.contact} />
}
