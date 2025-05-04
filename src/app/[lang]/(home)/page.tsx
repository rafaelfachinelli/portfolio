import { HomePageContent } from '@/components/pages/home/home-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Home',
  }
}

export default function Page() {
  return <HomePageContent />
}
