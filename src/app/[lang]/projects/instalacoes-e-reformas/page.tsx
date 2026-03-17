import { InstalacoesEReformasPageContent } from '@/components/pages/projects/instalacoes-e-reformas/instalacoes-e-reformas-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Projects | Instalações e Reformas',
  }
}

export default function Page() {
  return <InstalacoesEReformasPageContent />
}
