import { ContactPageContent } from '@/components/pages/contact/contact-page-content'
import { buildPageMetadata } from '@/lib/seo'

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

export default function Page() {
  return <ContactPageContent />
}
