import { ResumePageContent } from '@/components/pages/about/resume/resume-page-content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/about/resume',
    getCopy: t => ({
      title: t.pages.about.resume.title,
      description: t.pages.about.resume.description,
    }),
  })
}

export default function Page() {
  return <ResumePageContent />
}
