import { FlexSewingMachinePageContent } from '@/components/pages/projects/flex-sewing-machine/flex-sewing-machine-page-content'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/projects/flex-sewing-machine',
    getCopy: t => ({
      title: t.pages.projects.flexSewingMachine.title,
      description: t.pages.projects.flexSewingMachine.description,
    }),
  })
}

export default function Page() {
  return <FlexSewingMachinePageContent />
}
