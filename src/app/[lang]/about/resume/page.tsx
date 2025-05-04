import { ResumePageContent } from '@/components/pages/about/resume/resume-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Resume',
  }
}

export default function Page() {
  return <ResumePageContent />
}
