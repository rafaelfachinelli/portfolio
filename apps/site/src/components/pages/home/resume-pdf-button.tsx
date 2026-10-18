'use client'

import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { generateResumePdf } from '@/lib/generate-resume-pdf'

/** The only interactive bit of the resume card; jsPDF loads on click. */
export function ResumePdfButton({ label }: Readonly<{ label: string }>) {
  const { lang } = useLanguage()

  return (
    <Button
      onClick={() => generateResumePdf(lang)}
      className="flex w-full cursor-pointer items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  )
}
