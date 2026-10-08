import { Markit3DPageContent } from '@/components/pages/projects/markit3d/markit3d-page-content'
import { buildPageMetadata } from '@/lib/seo'

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

export default function Page() {
  return <Markit3DPageContent />
}
