import { Markit3DPageContent } from '@/components/pages/projects/markit3d/markit3d-page-content.tsx'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Projects | Markit3D',
  }
}

export default function Page() {
  return <Markit3DPageContent />
}
