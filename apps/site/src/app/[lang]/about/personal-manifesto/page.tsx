import { PersonalManifestoPageContent } from '@/components/pages/about/personal-manifesto/personal-manifesto'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/about/personal-manifesto',
    getCopy: t => ({
      title: t.pages.about.personalManifesto.title,
      description: t.pages.about.personalManifesto.description,
    }),
  })
}

export default function Page() {
  return <PersonalManifestoPageContent />
}
