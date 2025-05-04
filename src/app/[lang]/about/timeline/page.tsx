import { TimelinePageContent } from '@/components/pages/about/timeline/timeline-page.content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Timeline',
  }
}

export default function Page() {
  return <TimelinePageContent />
}
