import { InstalacoesEReformasPageContent } from '@/components/pages/projects/instalacoes-e-reformas/instalacoes-e-reformas-page-content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/projects/instalacoes-e-reformas',
    getCopy: t => ({
      title: t.pages.projects.instalacoesEReformas.title,
      description: t.pages.projects.instalacoesEReformas.description,
    }),
  })
}

export default function Page() {
  return <InstalacoesEReformasPageContent />
}
