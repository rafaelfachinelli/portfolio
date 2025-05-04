import { ContactPageContent } from '@/components/pages/contact/contact-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Contact',
  }
}

export default function Page() {
  return <ContactPageContent />
}
