import { MePageContent } from '@/components/pages/about/me/me-page.content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/about/me',
    getCopy: t => ({
      title: t.pages.about.me.title,
      description: t.pages.about.me.description,
    }),
  })
}

export default function Page() {
  return <MePageContent />
}
