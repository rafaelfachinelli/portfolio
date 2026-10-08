import { HomePageContent } from '@/components/pages/home/home-page-content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '',
    isHome: true,
    getCopy: t => ({
      title: `Rafael Fachinelli | ${t.pages.home.eyebrow}`,
      description: t.pages.home.description,
    }),
  })
}

export default function Page() {
  return <HomePageContent />
}
