import { TimelinePageContent } from '@/components/pages/about/timeline/timeline-page.content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/about/timeline',
    getCopy: t => ({
      title: t.pages.about.timeline.title,
      description: t.pages.about.timeline.description,
    }),
  })
}

export default function Page() {
  return <TimelinePageContent />
}
