import { MePageContent } from '@/components/pages/about/me/me-page.content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | About Me',
  }
}

export default function Page() {
  return <MePageContent />
}
