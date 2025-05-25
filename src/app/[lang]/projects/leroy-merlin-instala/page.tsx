import { LeroyMerlinInstalaPageContent } from '@/components/pages/projects/leroy-merlin-instala/leroy-merlin-instala-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Projects | Leroy Merlin Instala',
  }
}

export default function Page() {
  return <LeroyMerlinInstalaPageContent />
}
