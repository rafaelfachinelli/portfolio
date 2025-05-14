import { MorePageContent } from '@/components/pages/projects/more/more-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Projects | More projects...',
  }
}

export default function Page() {
  return <MorePageContent />
}
