import { FlexSewingMachinePageContent } from '@/components/pages/projects/flex-sewing-machine/flex-sewing-machine-page-content'

export async function generateMetadata() {
  return {
    title: 'Rafael Fachinelli | Projects | Flex Sewing Machine',
  }
}

export default function Page() {
  return <FlexSewingMachinePageContent />
}
